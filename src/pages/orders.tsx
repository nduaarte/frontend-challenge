import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { fmt } from "../utils/currency";
import Link from "next/link";

interface Order {
  id: string;
  date: string;
  total: number;
  method: string;
  status: string;
  items: any[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(saved.reverse()); // mostra os mais recentes primeiro
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100 flex flex-col">
      <Header />
      <main className="max-w-5xl mx-auto w-full p-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center sm:text-left">
          📦 Pedidos Realizados
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-slate-600 text-lg mb-4">
              Nenhum pedido foi feito ainda.
            </p>
            <Link
              href="/"
              className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Ir para o Catálogo
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
            {orders.map((o) => (
              <div
                key={o.id}
                className="border border-slate-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between transition"
              >
                <div>
                  <div className="text-slate-800 font-medium">
                    Pedido <span className="font-semibold">{o.id}</span>
                  </div>
                  <div className="text-sm text-slate-500">
                    {new Date(o.date).toLocaleString("pt-BR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </div>
                  <div className="text-sm text-slate-600 mt-1 capitalize">
                    Método: <strong>{o.method}</strong>
                  </div>
                </div>

                <div className="text-right mt-3 sm:mt-0">
                  <div className="text-lg font-semibold text-slate-800">
                    {fmt(o.total)}
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      o.status === "pago"
                        ? "text-green-600"
                        : o.status === "falhou"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {o.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
