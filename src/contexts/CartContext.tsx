import React, { createContext, useContext, useMemo, useState } from "react";
import { CartItem, Product } from "../types";

type CartCtx = {
  items: CartItem[];
  add: (p: Product, qty?: number) => void;
  update: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  total: number;
};

const CartContext = createContext<CartCtx | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = (product: Product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.product.id === product.id);
      if (found)
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      return [...prev, { product, qty }];
    });
  };

  const update = (productId: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.product.id === productId ? { ...i, qty } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const remove = (productId: string) =>
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  const clear = () => setItems([]);
  const total = useMemo(
    () => items.reduce((s, i) => s + i.product.price * i.qty, 0),
    [items]
  );

  return (
    <CartContext.Provider value={{ items, add, update, remove, clear, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
