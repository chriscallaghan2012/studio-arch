import type { IncomingMessage, ServerResponse } from 'node:http';
import { methodNotAllowed, readBody, sendJson } from '../lib/http.js';
import { capturePayPalOrder, isPayPalConfigured } from '../lib/paypal.js';
import { findByPaypalOrderId, markOrderPaid } from '../lib/orders.js';

interface CaptureBody {
  paypalOrderId?: string;
}

/**
 * POST /api/paypal/capture
 * Captures an approved PayPal order. Idempotent — a capture for an already
 * "paid" local order returns success without charging twice.
 */
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    methodNotAllowed(res, 'POST /api/paypal/capture');
    return;
  }

  try {
    const body = (await JSON.parse(await readBody(req))) as CaptureBody;
    const { paypalOrderId } = body;

    if (!paypalOrderId) {
      sendJson(res, 400, { message: 'Missing PayPal order id.' });
      return;
    }

    if (!isPayPalConfigured()) {
      sendJson(res, 503, { message: 'PayPal is not configured on this store yet. Please try again later.' });
      return;
    }

    const order = findByPaypalOrderId(paypalOrderId);

    // Idempotent confirmation for an order we already marked paid in this instance.
    if (order && order.paymentStatus === 'paid') {
      sendJson(res, 200, { success: true, orderId: order.orderId, total: order.total });
      return;
    }

    // Capture the PayPal order. The amount was locked in at order creation, so
    // this only moves the exact amount we requested regardless of store state.
    const paypalOrder = await capturePayPalOrder(paypalOrderId);

    if (paypalOrder.status !== 'COMPLETED') {
      sendJson(res, 402, { message: 'Payment was not completed. Please try again.' });
      return;
    }

    if (order) {
      // Verify the captured amount matches what we quoted, to guard against tampering.
      const capturedAmount = paypalOrder.purchaseUnits?.[0]?.payments?.captures?.[0]?.amount?.value;
      if (capturedAmount && Number(capturedAmount) !== order.total) {
        sendJson(res, 409, { message: 'Payment total did not match the order total.' });
        return;
      }
      markOrderPaid(order.orderId);
      sendJson(res, 200, { success: true, orderId: order.orderId, total: order.total });
      return;
    }

    // Cold instance after a restart: the local record is gone but PayPal still
    // captured the correct amount. Return the PayPal global id so the client
    // can confirm without blocking a completed payment.
    const capturedAmount = paypalOrder.purchaseUnits?.[0]?.payments?.captures?.[0]?.amount?.value;
    sendJson(res, 200, {
      success: true,
      orderId: paypalOrder.id,
      total: capturedAmount ? Number(capturedAmount) : 0,
    });
  } catch (error) {
    console.error('PayPal capture failed:', error);
    const message =
      error instanceof Error && error.message
        ? error.message
        : 'Payment could not be processed. Please try again.';
    sendJson(res, 500, { message });
  }
}