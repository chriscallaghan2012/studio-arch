import type { IncomingMessage, ServerResponse } from 'node:http';
import { methodNotAllowed, readBody, sendJson } from '../lib/http.js';
import { createPayPalOrder, isPayPalConfigured } from '../lib/paypal.js';
import {
  createOrderRecord,
  linkPayPalOrder,
  makeOrderReference,
  resolveOrderItems,
  type CheckoutLineItem,
} from '../lib/orders.js';

interface OrdersBody {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postcode?: string;
  items?: CheckoutLineItem[];
}

/**
 * POST /api/paypal/orders
 * Creates a PayPal order server-side for the current cart. Returns the PayPal
 * order id that the JS SDK wires into its "Pay with PayPal" flow.
 */
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    methodNotAllowed(res, 'POST /api/paypal/orders');
    return;
  }

  try {
    const body = (await JSON.parse(await readBody(req))) as OrdersBody;
    const fullName = body.fullName?.trim() || '';
    const email = body.email?.trim() || '';
    const phone = body.phone?.trim() || '';
    const address = body.address?.trim() || '';
    const city = body.city?.trim() || '';
    const postcode = body.postcode?.trim() || '';

    if (!fullName || !email.includes('@') || phone.length < 6 || !address || !city || postcode.length < 2) {
      sendJson(res, 400, { message: 'Please complete your contact and site details.' });
      return;
    }

    if (!isPayPalConfigured()) {
      sendJson(res, 503, {
        message: 'PayPal is not configured on this store yet. Please try again later.',
      });
      return;
    }

    // Re-resolve totals on the server from the catalogue — never trust the client.
    const resolved = resolveOrderItems(body.items ?? []);

    // Create the local order (pending) first so we can reconcile with PayPal.
    const orderRef = makeOrderReference();
    createOrderRecord(
      orderRef,
      {
        fullName,
        email,
        phone,
        shippingAddress: `${address}, ${city}, ${postcode}`,
      },
      resolved,
    );

    const paypalOrder = await createPayPalOrder({
      customId: orderRef,
      amount: resolved.total,
      itemTotal: resolved.subtotal,
      shipping: resolved.shipping,
      discount: resolved.discount,
      items: resolved.orderItems.map((item) => ({
        name: item.name,
        sku: item.sku,
        unitAmount: item.price,
        quantity: item.quantity,
      })),
      shippingDetails: {
        fullName,
        addressLine1: address,
        city,
        postalCode: postcode,
      },
    });

    linkPayPalOrder(orderRef, paypalOrder.id);

    sendJson(res, 201, {
      success: true,
      paypalOrderId: paypalOrder.id,
      orderId: orderRef,
      total: resolved.total,
      currency: 'GBP',
    });
  } catch (error) {
    console.error('PayPal order creation failed:', error);
    const message =
      error instanceof Error && error.message ? error.message : 'Could not start checkout. Please try again.';
    sendJson(res, 500, { message });
  }
}