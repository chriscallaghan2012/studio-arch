/**
 * Server-side order resolution & temporary order registry.
 *
 * The product price table below is the canonical server-side copy and MUST be
 * kept in lock-step with src/data/catalog.ts (the frontend display copy).
 * Client-supplied prices are never trusted — lines are re-resolved here and
 * the PayPal purchase amount is computed from this table.
 *
 * NOTE: the order store is an in-memory Map per serverless instance. For full
 * production hardening, swap this for a persistent store (Vercel KV /
 * Postgres) exactly as the Dapper Man storefront does with Prisma.
 */
export const PRODUCTS: Record<string, { sku: string; name: string; priceGBP: number }> = {
  'architectural-drawings': { sku: 'MA-DWG-01', name: 'Architectural Drawings Package', priceGBP: 1490 },
  'planning-permissions': { sku: 'MA-PLN-01', name: 'Planning Application Package', priceGBP: 450 },
  'building-regulations': { sku: 'MA-BR-01', name: 'Building Regulations Package', priceGBP: 820 },
  'structural-engineering': { sku: 'MA-STR-01', name: 'Structural Engineering Package', priceGBP: 820 },
};

export const SHIPPING_GBP = 0;
export const MAX_QTY = 9;

export interface CheckoutLineItem {
  productId?: string;
  quantity?: number;
}

export interface ResolvedOrderLine {
  productId: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface ResolvedOrder {
  orderItems: ResolvedOrderLine[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
}

/** Validate the cart lines and compute amounts from the server catalog. */
export function resolveOrderItems(items: CheckoutLineItem[], discountCode?: string): ResolvedOrder {
  const orderItems: ResolvedOrderLine[] = [];
  let subtotal = 0;

  for (const raw of items) {
    const product = raw.productId ? PRODUCTS[raw.productId] : undefined;
    if (!product) continue; // ignore unknown/tampered lines
    const quantity = Math.max(1, Math.min(MAX_QTY, Math.round(raw.quantity ?? 1)));
    const price = product.priceGBP;
    subtotal += price * quantity;
    orderItems.push({
      productId: raw.productId!,
      sku: product.sku,
      name: product.name,
      price,
      quantity,
      total: price * quantity,
    });
  }

  if (orderItems.length === 0) {
    throw new Error('Your cart is empty — add a package before checking out.');
  }

  // No automatic discounts in this catalogue yet — the hook is here for later.
  const discount = 0;

  return {
    orderItems,
    subtotal,
    shipping: SHIPPING_GBP,
    discount,
    total: subtotal + SHIPPING_GBP - discount,
  };
}

export function makeOrderReference(): string {
  return 'MA-' + Math.floor(100000 + Math.random() * 900000);
}

export interface StoredOrder {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  items: { sku: string; name: string; price: number; quantity: number }[];
  paypalOrderId: string | null;
  status: 'pending' | 'confirmed';
  paymentStatus: 'pending' | 'paid';
  createdAt: number;
}

const orderStore = new Map<string, StoredOrder>();
const paypalIndex = new Map<string, string>(); // paypalOrderId -> orderId

export function createOrderRecord(
  orderId: string,
  customer: { fullName: string; email: string; phone: string; shippingAddress: string },
  resolved: ResolvedOrder,
): StoredOrder {
  const record: StoredOrder = {
    orderId,
    customerName: customer.fullName,
    customerEmail: customer.email,
    customerPhone: customer.phone,
    shippingAddress: customer.shippingAddress,
    subtotal: resolved.subtotal,
    shipping: resolved.shipping,
    discount: resolved.discount,
    total: resolved.total,
    items: resolved.orderItems.map((l) => ({ sku: l.sku, name: l.name, price: l.price, quantity: l.quantity })),
    paypalOrderId: null,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: Date.now(),
  };
  orderStore.set(orderId, record);
  return record;
}

export function linkPayPalOrder(orderId: string, paypalOrderId: string) {
  const record = orderStore.get(orderId);
  if (record) {
    record.paypalOrderId = paypalOrderId;
    paypalIndex.set(paypalOrderId, orderId);
  }
}

export function findByPaypalOrderId(paypalOrderId: string): StoredOrder | undefined {
  const orderId = paypalIndex.get(paypalOrderId);
  return orderId ? orderStore.get(orderId) : undefined;
}

export function markOrderPaid(orderId: string) {
  const record = orderStore.get(orderId);
  if (record) {
    record.status = 'confirmed';
    record.paymentStatus = 'paid';
  }
}