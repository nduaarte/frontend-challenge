import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

export const Header: React.FC = () => {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Evita renderizar até o client estar pronto (corrige hydration)
    return null;
  }

  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-slate-800">
          Checkout Mock
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:underline">
            Catálogo
          </Link>

          <Link href="/orders" className="hover:underline">
            Pedidos
          </Link>
          <Link href="/checkout" className="hover:underline">
            Checkout
          </Link>
          <Link href="/cart" className="hover:underline">
            Carrinho ({items.length})
          </Link>
          {user ? (
            <>
              <span className="px-3 py-1 bg-slate-100 rounded-md text-sm">
                {user.name}
              </span>
              <button
                onClick={logout}
                className="text-sm text-slate-600 underline"
              >
                Sair
              </button>
            </>
          ) : (
            <Link href="/auth" className="hover:underline">
              Entrar
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
