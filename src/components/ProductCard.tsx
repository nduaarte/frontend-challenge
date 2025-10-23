import React from "react";
import { Product } from "../types";
import { fmt } from "../utils/currency";
import { useCart } from "../contexts/CartContext";

interface ProductCardProps {
  product: Product;
  onAdd?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { items, add, remove } = useCart();
  const isInCart = items.some((i) => i.product.id === product.id);

  return (
    <article className="flex flex-col justify-between border border-slate-200 hover:border-indigo-400 transition-all shadow-sm hover:shadow-md rounded-2xl p-5 bg-white hover:bg-slate-50">
      <div>
        <h3 className="text-lg font-semibold text-slate-800">
          {product.title}
        </h3>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          {product.description}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <strong className="text-xl text-slate-900">{fmt(product.price)}</strong>
        {isInCart ? (
          <button
            onClick={() => remove(product.id)}
            className="px-3 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            Remover
          </button>
        ) : (
          <button
            onClick={() => add(product)}
            className="px-3 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            Adicionar
          </button>
        )}
      </div>
    </article>
  );
};
