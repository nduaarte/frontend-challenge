import React from "react";
import { PRODUCTS } from "../lib/mockProducts";
import { useCart } from "../contexts/CartContext";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { Product } from "@/types";

export default function Home() {
  const { add } = useCart();

  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Catálogo</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} onAdd={(prod: Product) => add(prod)} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
