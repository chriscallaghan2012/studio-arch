import {
  Client,
  Environment,
  OrdersController,
  ItemCategory,
  FulfillmentType,
  CheckoutPaymentIntent,
  type Order,
  type OrderRequest,
  type PurchaseUnitRequest,
} from '@paypal/paypal-server-sdk';

/**
 * Server-side PayPal Orders v2 helpers (mirrors the pattern used by the
 * Dapper Man storefront). Credentials are read from PAYPAL_CLIENT_ID /
 * PAYPAL_CLIENT_SECRET, and PAYPAL_ENV ("sandbox" | "live") selects the
 * environment. Configure these in Vercel -> Project -> Environment Variables.
 */

export const PAYPAL_CURRENCY = 'GBP';
const PAYPAL_COUNTRY_CODE = 'GB';

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
const isLive = process.env.PAYPAL_ENV === 'live';

/** Treat placeholder/empty values as un-configured. */
function isRealSecret(value: string | undefined) {
  if (!value) return false;
  if (value.startsWith('YOUR_')) return false;
  if (value.startsWith('YOUR ')) return false;
  return value.length > 8;
}

export function isPayPalConfigured() {
  return isRealSecret(clientId) && isRealSecret(clientSecret);
}

let client: Client | null = null;

function getClient(): Client {
  if (!isPayPalConfigured()) {
    throw new Error('PayPal is not configured. Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET.');
  }
  if (!client) {
    client = new Client({
      clientCredentialsAuthCredentials: {
        oAuthClientId: clientId as string,
        oAuthClientSecret: clientSecret as string,
      },
      environment: isLive ? Environment.Production : Environment.Sandbox,
    });
  }
  return client;
}

export interface PayPalLineItem {
  name: string;
  sku?: string;
  description?: string;
  unitAmount: number;
  quantity: number;
}

export interface PayPalShippingDetails {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region?: string;
  postalCode: string;
}

export interface CreateOrderOptions {
  customId: string;
  amount: number;
  itemTotal: number;
  shipping: number;
  discount: number;
  items: PayPalLineItem[];
  shippingDetails?: PayPalShippingDetails;
}

export async function createPayPalOrder(options: CreateOrderOptions): Promise<Order> {
  const purchaseUnits: PurchaseUnitRequest[] = [
    {
      referenceId: 'default',
      customId: options.customId,
      amount: {
        currencyCode: PAYPAL_CURRENCY,
        value: options.amount.toFixed(2),
        breakdown: {
          itemTotal: { currencyCode: PAYPAL_CURRENCY, value: options.itemTotal.toFixed(2) },
          shipping: { currencyCode: PAYPAL_CURRENCY, value: options.shipping.toFixed(2) },
          discount: { currencyCode: PAYPAL_CURRENCY, value: options.discount.toFixed(2) },
        },
      },
      items: options.items.map((item) => ({
        name: item.name.slice(0, 127),
        ...(item.sku ? { sku: item.sku.slice(0, 127) } : {}),
        unitAmount: { currencyCode: PAYPAL_CURRENCY, value: item.unitAmount.toFixed(2) },
        quantity: String(item.quantity),
        category: ItemCategory.DigitalGoods,
        ...(item.description ? { description: item.description.slice(0, 2048) } : {}),
      })),
      ...(options.shippingDetails
        ? {
            shipping: {
              type: FulfillmentType.Shipping,
              name: { fullName: options.shippingDetails.fullName },
              address: {
                addressLine1: options.shippingDetails.addressLine1,
                addressLine2: options.shippingDetails.addressLine2,
                adminArea2: options.shippingDetails.city,
                adminArea1: options.shippingDetails.region,
                postalCode: options.shippingDetails.postalCode,
                countryCode: PAYPAL_COUNTRY_CODE,
              },
            },
          }
        : {}),
    },
  ];

  const body: OrderRequest = {
    intent: CheckoutPaymentIntent.Capture,
    purchaseUnits,
  };

  const ordersController = new OrdersController(getClient());
  const response = await ordersController.createOrder({
    body,
    prefer: 'return=representation',
  });

  if (!response.result?.id) {
    throw new Error('PayPal did not return an order id.');
  }
  return response.result;
}

export async function capturePayPalOrder(orderId: string): Promise<Order> {
  const ordersController = new OrdersController(getClient());
  const response = await ordersController.captureOrder({
    id: orderId,
    body: {},
    prefer: 'return=representation',
  });
  return response.result;
}