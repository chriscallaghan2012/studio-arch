import React, { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useCart } from '../context/CartContext';
import { findProduct, SHIPPING_GBP } from '../data/catalog';
import { formatGBP } from '../lib/format';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Lock,
  ShoppingBag,
} from 'lucide-react';

interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
}

interface CreateOrderResponse {
  success?: boolean;
  paypalOrderId?: string;
  orderId?: string;
  total?: number;
  message?: string;
}

const EMPTY_FORM: CheckoutForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postcode: '',
};

/*
 * PayPal JS SDK client id — the same PayPal app id is safe to expose; the
 * secret stays server-side (PAYPAL_CLIENT_SECRET) in the Vercel environment.
 */
const PAYPAL_CLIENT_ID: string | undefined = import.meta.env.VITE_PAYPAL_CLIENT_ID;

function isFormValid(form: CheckoutForm, hasLines: boolean): boolean {
  return hasLines &&
    form.fullName.trim().length > 1 &&
    form.email.includes('@') &&
    form.phone.trim().length > 6 &&
    form.address.trim().length > 3 &&
    form.city.trim().length > 1 &&
    form.postcode.trim().length > 2;
}

interface CheckoutPageProps {
  onContinueShopping: () => void;
}

/**
 * Secure PayPal checkout. On "Pay with PayPal" the browser flow is:
 *   1. POST /api/paypal/orders   -> returns a PayPal order id (server creates it)
 *   2. PayPal wallet approval    -> buyer signs in & approves
 *   3. POST /api/paypal/capture  -> server captures the payment and confirms
 */
export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onContinueShopping }) => {
  const { lines, subtotal, clear } = useCart();

  const [form, setForm] = useState<CheckoutForm>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placedOrder, setPlacedOrder] = useState<{ orderId: string; total: number } | null>(null);

  const update = (field: keyof CheckoutForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value });
    setError(null);
  };

  const handleCreateOrder = async (): Promise<string> => {
    if (!isFormValid(form, lines.length > 0)) {
      setError('Please complete all fields above before paying.');
      throw new Error('INCOMPLETE_DETAILS');
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/paypal/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          postcode: form.postcode.trim(),
          items: lines.map((l) => ({ productId: l.productId, quantity: l.quantity })),
        }),
      });
      const data: CreateOrderResponse = await res.json();
      if (!res.ok || !data.paypalOrderId) {
        setError(data.message || 'Could not start checkout. Please try again.');
        throw new Error(data.message || 'CREATE_ORDER_FAILED');
      }
      return data.paypalOrderId;
    } catch (err) {
      setIsSubmitting(false);
      throw err;
    }
  };

  const handleApprove = async (data: { orderID: string }): Promise<void> => {
    setError(null);
    try {
      const res = await fetch('/api/paypal/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paypalOrderId: data.orderID }),
      });
      const json: CreateOrderResponse = await res.json();
      if (!res.ok || !json.success) {
        setError(json.message || 'Payment could not be confirmed. Please try again.');
        throw new Error(json.message || 'CAPTURE_FAILED');
      }
      const total = json.total ?? subtotal;
      setPlacedOrder({ orderId: json.orderId || data.orderID, total });
      clear();
      setForm(EMPTY_FORM);
    } catch (err) {
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title block header */}
      <div className="border-b border-hairline pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-sans text-brass uppercase tracking-widest font-bold mb-1">
              SECURE CHECKOUT
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-ink font-display">
              Checkout &amp; Payment
            </h1>
            <p className="text-sm text-stone font-sans mt-2 max-w-2xl">
              Confirm your package selection and settle your fixed fee securely via PayPal. Your
              drawings pipeline will be scheduled the same working day.
            </p>
          </div>
        </div>
      </div>

{placedOrder ? (
        /* ---------- SUCCESS ---------- */
        <div className="bg-white border border-hairline shadow-md p-8 sm:p-12 text-center space-y-6">
          <div className="w-16 h-16 bg-sage/15 text-sage border border-sage rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <span className="text-xs font-sans text-stone uppercase tracking-widest">PAYMENT RECEIVED</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink font-display">Thank You</h2>
            <p className="text-sm text-stone font-sans">
              Your package order has been placed and your fee settled via PayPal. A member of the
              studio will contact you within 4 working hours to begin.
            </p>
          </div>
          <div className="p-4 bg-hairline/60 border border-hairline font-sans text-xs max-w-sm mx-auto text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-stone uppercase tracking-wider">Order Reference</span>
              <span className="font-bold text-ink">{placedOrder.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone uppercase tracking-wider">Amount Paid</span>
              <span className="font-bold text-ink">{formatGBP(placedOrder.total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone uppercase tracking-wider">Provider</span>
              <span className="font-bold text-ink">PayPal · Secure</span>
            </div>
          </div>
          <button
            onClick={onContinueShopping}
            className="px-6 py-3 bg-ink hover:bg-ink-soft text-white font-sans text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <span>Return to the Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : lines.length === 0 ? (
        /* ---------- EMPTY CART ---------- */
        <div className="bg-white border border-hairline shadow-md p-8 sm:p-12 text-center space-y-6">
          <div className="w-16 h-16 bg-ink-soft text-brass-light border border-white/10 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink font-display">Nothing to Checkout Yet</h2>
          <p className="text-sm text-stone font-sans max-w-md mx-auto">
            Your cart is empty. Choose a fixed-fee architectural package on the Services page and
            return here to pay securely with PayPal.
          </p>
          <button
            onClick={onContinueShopping}
            className="px-6 py-3 bg-ink hover:bg-ink-soft text-white font-sans text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <span>Browse Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <>
{/* ---------- CHECKOUT FORM + SUMMARY ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Customer details */}
          <div className="lg:col-span-7 bg-white border border-hairline shadow-md p-6 sm:p-8 space-y-5">
            <div className="bg-ink-soft text-white px-4 py-2.5 border-b border-white/10 text-xs font-sans flex items-center justify-between">
              <span className="font-bold text-brass-light uppercase tracking-widest">Project &amp; Contact Details</span>
              <span className="text-white/60 text-[10px]">STEP 1 OF 2</span>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-stone uppercase tracking-wider mb-1">Full Name *</label>
                  <input
                    required
                    value={form.fullName}
                    onChange={update('fullName')}
                    placeholder="e.g. Alexander Vance"
                    className="w-full bg-white border border-hairline text-ink p-3 text-xs font-sans focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone uppercase tracking-wider mb-1">Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="you@example.com"
                    className="w-full bg-white border border-hairline text-ink p-3 text-xs font-sans focus:outline-none focus:border-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone uppercase tracking-wider mb-1">Phone *</label>
                <input
                  required
                  value={form.phone}
                  onChange={update('phone')}
                  placeholder="+44 (0) 7700 900123"
                  className="w-full bg-white border border-hairline text-ink p-3 text-xs font-sans focus:outline-none focus:border-ink"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone uppercase tracking-wider mb-1">Site Address *</label>
                <input
                  required
                  value={form.address}
                  onChange={update('address')}
                  placeholder="House number, street name"
                  className="w-full bg-white border border-hairline text-ink p-3 text-xs font-sans focus:outline-none focus:border-ink"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-stone uppercase tracking-wider mb-1">City / Town *</label>
                  <input
                    required
                    value={form.city}
                    onChange={update('city')}
                    placeholder="e.g. London"
                    className="w-full bg-white border border-hairline text-ink p-3 text-xs font-sans focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone uppercase tracking-wider mb-1">Postcode *</label>
                  <input
                    required
                    value={form.postcode}
                    onChange={update('postcode')}
                    placeholder="e.g. W1J 6BD"
                    className="w-full bg-white border border-hairline text-ink p-3 text-xs font-sans focus:outline-none focus:border-ink"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-2 text-[11px] font-sans text-stone border-t border-hairline pt-3">
              <ShieldCheck className="w-4 h-4 text-sage shrink-0 mt-0.5" />
              <span>Your details are held in strict confidence and used only for this order's correspondence.</span>
            </div>

            {error && (
              <div className="p-3 bg-red-50/10 border border-red-600/40 text-red-700 text-xs font-sans flex items-start space-x-2">
                <span className="shrink-0 font-bold">!</span>
                <span>{error}</span>
              </div>
            )}
          </div>
{/* Right: Order summary */}
          <div className="lg:col-span-5 bg-ink-soft text-white border border-white/10 shadow-md p-6 sm:p-8 space-y-4">
            <span className="text-brass-light font-bold uppercase tracking-widest block text-[10px] border-b border-white/10 pb-2">
              ORDER SUMMARY
            </span>

            <div className="space-y-2 text-xs font-sans">
              {lines.map((line) => {
                const product = findProduct(line.productId);
                if (!product) return null;
                return (
                  <div key={line.productId} className="flex items-start justify-between text-white/70 space-x-2">
                    <div className="min-w-0">
                      <span className="block text-[9px] text-brass-light/70 uppercase">{product.sku}</span>
                      <span className="font-bold text-white text-[11px] leading-snug">
                        {product.name} <span className="text-white/50">× {line.quantity}</span>
                      </span>
                    </div>
                    <span className="text-white font-bold">{formatGBP(product.priceGBP * line.quantity)}</span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-white/10 pt-3 flex justify-between text-xs font-sans text-white/70">
              <span>Subtotal</span>
              <span className="font-bold text-white">{formatGBP(subtotal)}</span>
            </div>
            <div className="flex justify-between text-xs font-sans text-white/70">
              <span>Booking / Admin Fees</span>
              <span>{formatGBP(0)}</span>
            </div>
            <div className="flex justify-between text-xs font-sans text-white/70">
              <span>Shipping</span>
              <span>{SHIPPING_GBP === 0 ? 'Digital Delivery' : formatGBP(SHIPPING_GBP)}</span>
            </div>
            <div className="flex justify-between text-sm font-sans border-t border-white/10 pt-2">
              <span className="text-brass-light uppercase tracking-wider text-[11px]">Total Payable</span>
              <span className="font-bold text-brass-light text-base">{formatGBP(subtotal)}</span>
            </div>

            {isSubmitting && (
              <div className="flex items-center justify-center space-x-2 text-[11px] text-white/70 font-sans py-2">
                <span className="w-3.5 h-3.5 border border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Contacting PayPal securely…</span>
              </div>
            )}

            <div className="border-t border-white/10 pt-3">
              {PAYPAL_CLIENT_ID ? (
                <PayPalScriptProvider
                  options={{ clientId: PAYPAL_CLIENT_ID, currency: 'GBP', intent: 'capture' }}
                >
                  <PayPalButtons
                    style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' }}
                    disabled={!isFormValid(form, lines.length > 0) || isSubmitting}
                    fundingSource="paypal"
                    createOrder={handleCreateOrder}
                    onApprove={async (data: { orderID: string }) => {
                      await handleApprove(data);
                    }}
                    onCancel={() => {
                      setIsSubmitting(false);
                      setError('Checkout was cancelled in PayPal. Your cart is intact — you may try again anytime.');
                    }}
                    onError={() => {
                      setIsSubmitting(false);
                      setError('PayPal reported a problem. Please check your details and try again.');
                    }}
                  />
                </PayPalScriptProvider>
              ) : (
                <div className="p-3 bg-red-50/10 border border-red-600/40 text-red-200 text-[11px] font-sans">
                  PayPal is not configured for this deployment yet (VITE_PAYPAL_CLIENT_ID is unset).
                  The shopkeeper should add it to the Vercel environment and redeploy.
                </div>
              )}
            </div>

            <div className="flex items-start space-x-2 text-[10px] text-white/60 font-sans">
              <Lock className="w-3.5 h-3.5 text-brass-light shrink-0 mt-0.5" />
              <span>
                Payments are processed by PayPal and covered by PayPal Buyer Protection.
                VAT is not chargeable — fees are for professional architectural services.
              </span>
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  );
};