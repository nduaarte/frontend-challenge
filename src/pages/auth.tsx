import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import { Header } from "../components/Header";

export default function AuthPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login(email, name);
      router.push("/");
    } catch {
      setErr("Erro ao entrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100 flex flex-col">
      <Header />

      {/* 🧱 Card mais próximo do topo */}
      <main className="flex justify-center p-6 mt-10 sm:mt-16">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg border border-slate-200 p-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-3">
            Bem-vindo de volta 👋
          </h1>
          <p className="text-slate-500 mb-8 text-sm">
            Entre ou crie sua conta para continuar
          </p>

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="text-sm text-slate-600 block mb-1">
                E-mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
                placeholder="exemplo@email.com"
              />
            </div>

            <div>
              <label className="text-sm text-slate-600 block mb-1">
                Nome (opcional)
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
                placeholder="Seu nome"
              />
            </div>

            {err && (
              <div className="text-red-600 text-sm bg-red-50 p-2 rounded-md border border-red-200">
                {err}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white rounded-lg font-medium transition-colors shadow-sm"
            >
              {loading ? "Entrando..." : "Entrar / Criar conta"}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-slate-400">
            🎯 Desafio Frontend — Fluxo de Checkout (100% mockado)
          </div>
        </div>
      </main>
    </div>
  );
}
