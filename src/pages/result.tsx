import React from "react";
import { Header } from "../components/Header";
import Link from "next/link";

export default function Result() {
  return (
    <div>
      <Header />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold">Resultado do pagamento</h1>
        <p className="mt-4">
          Aqui aparecerá o resumo do pagamento (pago / falhado / expirado) e
          ações possíveis.
        </p>

        <div className="mt-6 space-x-3">
          <Link href="/" className="text-indigo-600 underline">
            Voltar ao catálogo
          </Link>
        </div>
      </main>
    </div>
  );
}
