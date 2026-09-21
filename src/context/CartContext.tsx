import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { findProduct } from '../data/catalog';

/**
 * Persistent shopping cart (localStorage-backed).
 * Lines are stored as { productId, quantity } pairs and resolved against the
 * catalog for prices — prices are re-validated server-side at checkout.
 */
export interface CartLine {
  productId: string;
  quantity: number;
}

export interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  add: (productId: string, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const STORAGE_KEY = 'masonry-architecture-cart-v1';
const MAX_QTY = 9;

function sanitizeLines(raw: unknown): CartLine[] {
  if (!Array.isArray(raw)) return [];
  const lines: CartLine[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== 'object') continue;
    const productId = (entry as CartLine).productId;
    const quantity = (entry as CartLine).quantity;
    if (typeof productId !== 'string' || typeof quantity !== 'number' || !findProduct(productId)) continue;
    lines.push({ productId, quantity: Math.max(1, Math.min(MAX_QTY, Math.round(quantity))) });
  }
  return lines;
}

function readStoredLines(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? sanitizeLines(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // Hydrate once on mount (avoids SSR/parse issues during initial paint).
  useEffect(() => {
    const stored = readStoredLines();
    if (stored.length > 0) setLines(stored);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable — cart stays in memory */
    }
  }, [lines, ready]);

  const add: CartContextValue['add'] = (productId, quantity = 1) => {
    if (!findProduct(productId)) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId);
      if (existing) {
        return prev.map((l) =>
          l.productId === productId ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + quantity) } : l,
        );
      }
      return [...prev, { productId, quantity: Math.max(1, Math.min(MAX_QTY, Math.round(quantity))) }];
    });
  };

  const remove: CartContextValue['remove'] = (productId) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  };

  const setQuantity: CartContextValue['setQuantity'] = (productId, quantity) => {
    setLines((prev) =>
      prev.map((l) => (l.productId === productId ? { ...l, quantity: Math.max(1, Math.min(MAX_QTY, Math.round(quantity))) } : l)),
    );
  };

  const clear: CartContextValue['clear'] = () => setLines([]);

  const count = useMemo(() => lines.reduce((n, l) => n + l.quantity, 0), [lines]);
  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + (findProduct(l.productId)?.priceGBP ?? 0) * l.quantity, 0),
    [lines],
  );

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    isOpen,
    add,
    remove,
    setQuantity,
    clear,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}