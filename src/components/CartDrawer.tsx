import React from 'react';
import { useCart } from '../context/CartContext';
import { findProduct } from '../data/catalog';
import { formatGBP } from '../lib/format';
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight, ShieldCheck, Lock } from 'lucide-react';

interface CartDrawerProps {
  onCheckout: () => void;
}

/**
 * Slide-over cart panel. Opened via the navbar cart button, lists the current
 * lines with quantity controls and routes to the PayPal checkout page.
 */
export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout }) => {
  const { lines, count, subtotal, isOpen, closeCart, setQuantity, remove } = useCart();

  if (!isOpen) return null;

  const handleCheckout = () => {
    closeCart();
    onCheckout();
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping cart">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm animate-in fade-in duration-150 cursor-pointer"
        onClick={closeCart}
      ></div>

      {/* Drawer panel */}
      <aside className="absolute inset-y-0 right-0 w-full max-w-md bg-ivory border-l border-hairline shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-ink-soft text-white px-5 py-3 border-b border-white/10 flex items-center justify-between font-sans text-xs">
          <div className="flex items-center space-x-3">
            <span className="bg-brass text-black px-2.5 py-1 font-bold">CART</span>
            <span className="text-white/80 font-bold tracking-wider">YOUR PACKAGE SELECTION</span>
            <span className="text-brass-light bg-brass/10 border border-brass/40 px-1.5 py-0.5 text-[10px]">
              {count} {count === 1 ? 'ITEM' : 'ITEMS'}
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="text-white/70 hover:text-white p-1.5 border border-white/10 rounded-sm transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
{lines.length === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center space-y-4">
            <div className="w-16 h-16 bg-ink-soft text-brass-light border border-white/10 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-ink font-display">Your cart is empty</h3>
            <p className="text-xs text-stone font-sans max-w-xs leading-relaxed">
              Add a fixed-fee architectural package from the Services page and it will appear here ready for secure PayPal checkout.
            </p>
            <button
              onClick={closeCart}
              className="px-5 py-2.5 bg-ink hover:bg-ink-soft text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Continue Browsing
            </button>
          </div>
        ) : (
        <>
            {/* Line items */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {lines.map((line) => {
                const product = findProduct(line.productId);
                if (!product) return null;
                return (
                  <div key={line.productId} className="bg-white border border-hairline p-3.5 font-sans text-xs space-y-2">
                    <div className="flex items-start justify-between space-x-2">
                      <div className="min-w-0">
                        <span className="block text-[9px] text-brass uppercase tracking-widest">{product.sku}</span>
                        <h4 className="font-bold text-ink text-sm leading-snug">{product.name}</h4>
                        <span className="text-stone text-[10px]">{product.leadTime}</span>
                      </div>
                      <button
                        onClick={() => remove(product.id)}
                        aria-label={`Remove ${product.name}`}
                        className="text-stone hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between border-t border-hairline/70 pt-1.5">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[10px] text-stone">QTY</span>
                        <button
                          onClick={() => setQuantity(product.id, line.quantity - 1)}
                          disabled={line.quantity <= 1}
                          aria-label="Decrease quantity"
                          className="w-6 h-6 bg-ink-soft text-white/80 border border-white/10 flex items-center justify-center disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-bold border border-hairline py-0.5">{line.quantity}</span>
                        <button
                          onClick={() => setQuantity(product.id, line.quantity + 1)}
                          disabled={line.quantity >= 9}
                          aria-label="Increase quantity"
                          className="w-6 h-6 bg-ink-soft text-white/80 border border-white/10 flex items-center justify-center disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] text-stone">{formatGBP(product.priceGBP)} each</span>
                        <span className="font-bold text-ink text-sm">{formatGBP(product.priceGBP * line.quantity)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="border-t border-hairline bg-ink-soft text-white px-5 py-4 space-y-3">
              <div className="flex justify-between text-sm font-sans">
                <span className="text-white/70 uppercase tracking-wider text-[11px]">Package Subtotal</span>
                <span className="font-bold text-brass-light">{formatGBP(subtotal)}</span>
              </div>
              <div className="flex items-start space-x-2 text-[10px] text-white/60">
                <ShieldCheck className="w-3.5 h-3.5 text-brass-light shrink-0 mt-0.5" />
                <span>
                  Fees settled securely via PayPal. No additional booking fees. UK architectural services — exact scope confirmed at consultation.
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-brass hover:bg-brass text-black font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={closeCart}
                className="w-full py-2 border border-white/15 text-white/70 hover:text-white font-sans text-[11px] transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};