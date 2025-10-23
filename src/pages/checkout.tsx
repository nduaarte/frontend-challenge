import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { Header } from "../components/Header";
import { fmt } from "../utils/currency";
import { PaymentMethod, PaymentStatus } from "../types";
import { createPaymentSimulator } from "../lib/paymentSimulator";
import { useRouter } from "next/router";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { items, total, clear } = useCart();
  const router = useRouter();

  const [buyerData, setBuyerData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [method, setMethod] = useState<PaymentMethod>("pix");
  const [status, setStatus] = useState<PaymentStatus>("initial");
  const [processing, setProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!user) router.push("/auth");
    else
      setBuyerData({
        name: user.name,
        email: user.email,
        address: user.address ?? "",
      });
  }, [user, router]);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100">
        <Header />
        <main className="max-w-3xl mx-auto p-6">
          <div className="card text-center py-10">
            <p className="text-slate-600 text-lg mb-4">
              Seu carrinho está vazio.
            </p>
            <a
              href="/"
              className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Voltar ao Catálogo
            </a>
          </div>
        </main>
      </div>
    );
  }

  const onConfirm = () => {
    setProcessing(true);
    setStatus("processing");
    const sim = createPaymentSimulator(method);
    sim.on((s) => {
      setStatus(s);
      if (s === "paid") {
        clear();
        const orders = JSON.parse(localStorage.getItem("orders") || "[]");
        orders.push({
          id: `#${Math.floor(Math.random() * 999999)}`,
          date: new Date().toISOString(),
          total,
          items,
          method,
          status: "pago",
        });
        localStorage.setItem("orders", JSON.stringify(orders));
        router.push("/orders");
      }
      if (["failed", "expired", "paid"].includes(s)) setProcessing(false);
    });
    sim.start();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100 flex flex-col">
      <Header />

      <main className="max-w-6xl mx-auto w-full p-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center sm:text-left">
          💳 Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 🧾 Coluna esquerda */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-8">
            {/* Dados do comprador */}
            <section>
              <h2 className="text-lg font-semibold text-slate-800 mb-3">
                1. Dados do comprador
              </h2>
              <div className="grid gap-3">
                <input
                  placeholder="Nome completo"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  value={buyerData.name}
                  onChange={(e) =>
                    setBuyerData({ ...buyerData, name: e.target.value })
                  }
                />
                <input
                  placeholder="Email"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  value={buyerData.email}
                  onChange={(e) =>
                    setBuyerData({ ...buyerData, email: e.target.value })
                  }
                />
                <input
                  placeholder="Endereço de entrega"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  value={buyerData.address}
                  onChange={(e) =>
                    setBuyerData({ ...buyerData, address: e.target.value })
                  }
                />
              </div>
            </section>

            {/* Método de pagamento */}
            <section>
              <h2 className="text-lg font-semibold text-slate-800 mb-3">
                2. Método de pagamento
              </h2>
              <div className="flex flex-wrap gap-3">
                {(["pix", "card", "boleto"] as PaymentMethod[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                      method === m
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "border-slate-300 hover:border-indigo-400"
                    }`}
                  >
                    {m === "pix" && "Pix"}
                    {m === "card" && "Cartão de Crédito"}
                    {m === "boleto" && "Boleto"}
                  </button>
                ))}
              </div>

              {/* Campos específicos */}
              <div className="mt-5 bg-slate-50 rounded-xl p-4 border border-slate-200">
                {method === "pix" && (
                  <p className="text-slate-700">
                    Gere seu QR Code Pix ao confirmar o pagamento. <br />
                    <span className="text-sm text-slate-500">
                      Simulação instantânea com alta taxa de sucesso.
                    </span>
                  </p>
                )}
                {method === "card" && (
                  <div className="grid gap-3">
                    <input
                      placeholder="Número do cartão"
                      className="p-3 border rounded-lg border-slate-300"
                    />
                    <div className="flex gap-3">
                      <input
                        placeholder="MM/AA"
                        className="p-3 border rounded-lg border-slate-300 w-1/2"
                      />
                      <input
                        placeholder="CVV"
                        className="p-3 border rounded-lg border-slate-300 w-1/2"
                      />
                    </div>
                  </div>
                )}
                {method === "boleto" && (
                  <p className="text-slate-700">
                    Um código de boleto será gerado ao confirmar. <br />
                    <span className="text-sm text-slate-500">
                      Pagamentos podem expirar após alguns minutos.
                    </span>
                  </p>
                )}
              </div>
            </section>

            {/* Revisão */}
            <section>
              <h2 className="text-lg font-semibold text-slate-800 mb-3">
                3. Revisão do pedido
              </h2>
              <div className="space-y-3">
                {items.map((i) => (
                  <div
                    key={i.product.id}
                    className="flex justify-between text-slate-700"
                  >
                    <span>
                      {i.product.title} × {i.qty}
                    </span>
                    <span>{fmt(i.product.price * i.qty)}</span>
                  </div>
                ))}
                <div className="pt-3 mt-3 border-t border-slate-200 flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{fmt(total)}</span>
                </div>
              </div>
            </section>

            {/* Botões */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => router.push("/cart")}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
              >
                Voltar
              </button>
              <button
                onClick={onConfirm}
                disabled={processing}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-sm disabled:bg-indigo-300 transition"
              >
                {processing ? "Processando..." : "Confirmar pagamento"}
              </button>
            </div>
          </div>

          {/* 📊 Coluna direita: status */}
          <aside className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 h-fit sticky top-6 space-y-4">
            <h3 className="text-lg font-semibold text-slate-800">
              Acompanhamento
            </h3>
            <div className="text-sm text-slate-700">
              Status: <strong className="capitalize">{status}</strong>
            </div>
            {status === "processing" && (
              <div className="text-slate-600">
                Pagamento em processamento...
              </div>
            )}
            {status === "paid" && (
              <div className="text-green-600 font-medium">
                ✅ Pagamento confirmado! Obrigado pela compra.
              </div>
            )}
            {status === "failed" && (
              <div className="text-red-600">
                ❌ Falha no pagamento. Tente outro método.
              </div>
            )}
            {status === "expired" && (
              <div className="text-yellow-700">
                ⚠️ Pagamento expirado. Gere uma nova tentativa.
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
