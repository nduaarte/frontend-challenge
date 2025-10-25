import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../contexts/CartContext";
import { Header } from "../components/Header";
import { fmt } from "../utils/currency";

export default function CartPage() {
  const { items, update, remove, total } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto p-6 w-full">
        <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center sm:text-left">
          🛒 Meu Carrinho
        </h1>

        {items.length === 0 ? (
          <div className="card text-center py-10">
            <p className="text-slate-600 text-lg mb-4">
              Seu carrinho está vazio.
            </p>
            <Link
              href="/"
              className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Voltar ao Catálogo
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <div className="divide-y divide-slate-200">
              {items.map((i) => (
                <div
                  key={i.product.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-slate-800">
                      {i.product.title}
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      {fmt(i.product.price)} cada
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      value={i.qty}
                      onChange={(e) =>
                        update(i.product.id, Number(e.target.value) || 1)
                      }
                      className="w-20 p-2 border border-slate-300 rounded-lg text-center focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                    <button
                      onClick={() => remove(i.product.id)}
                      className="text-sm text-red-600 hover:text-red-700 underline"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumo */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-slate-600 text-sm">
                Itens no carrinho: <strong>{items.length}</strong>
              </div>

              <div className="text-right mt-4 sm:mt-0">
                <div className="text-lg text-slate-700">
                  Total: <strong>{fmt(total)}</strong>
                </div>
                <Link
                  href="/checkout"
                  className="inline-block mt-3 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Finalizar Compra
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
