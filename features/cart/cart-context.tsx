"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { MenuProduct } from "@/lib/menu-data";

export type CartLine = {
  key: string;
  productId: string;
  name: string;
  variantName: string;
  unitPrice: number;
  quantity: number;
  imageUrl?: string;
};

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  total: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (product: MenuProduct, variantName: string) => void;
  increment: (key: string) => void;
  decrement: (key: string) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "salchivolcanica-cart-v1";
const CartContext = createContext<CartContextValue | null>(null);

function safeStoredCart(): CartLine[] {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(value)) return [];
    return value.filter((line) => line && typeof line.key === "string" && Number.isInteger(line.quantity) && line.quantity > 0 && Number.isFinite(line.unitPrice));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLines(safeStoredCart());
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [hydrated, lines]);

  const value = useMemo<CartContextValue>(() => ({
    lines,
    itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
    total: lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0),
    isOpen,
    setIsOpen,
    addItem(product, variantName) {
      const variant = product.variants.find((item) => item.name === variantName) ?? product.variants[0];
      const key = `${product.id}:${variant.name}`;
      setLines((current) => {
        const found = current.find((line) => line.key === key);
        if (found) return current.map((line) => line.key === key ? { ...line, quantity: line.quantity + 1 } : line);
        return [...current, { key, productId: product.id, name: product.name, variantName: variant.name, unitPrice: variant.priceCOP, quantity: 1, imageUrl: product.imageUrl }];
      });
    },
    increment(key) { setLines((current) => current.map((line) => line.key === key ? { ...line, quantity: line.quantity + 1 } : line)); },
    decrement(key) { setLines((current) => current.flatMap((line) => line.key !== key ? [line] : line.quantity > 1 ? [{ ...line, quantity: line.quantity - 1 }] : [])); },
    remove(key) { setLines((current) => current.filter((line) => line.key !== key)); },
    clear() { setLines([]); },
  }), [isOpen, lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
