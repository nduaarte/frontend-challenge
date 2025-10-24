import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { Menu } from "lucide-react";

export const Header: React.FC = () => {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Título */}
        <Link
          href="/"
          className="font-bold text-xs sm:text-sm md:text-base lg:text-lg text-slate-800 tracking-wide"
        >
          Checkout Mock
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden sm:flex items-center gap-3 md:gap-5 text-[11px] sm:text-sm md:text-base text-slate-700">
          <Link href="/" className="hover:underline">
            Catálogo
          </Link>
          <Link href="/cart" className="hover:underline">
            Carrinho ({items.length})
          </Link>
          <Link href="/checkout" className="hover:underline">
            Checkout
          </Link>
          <Link href="/orders" className="hover:underline">
            Pedidos
          </Link>

          {user ? (
            <>
              <span className="px-2 py-1 bg-slate-100 rounded text-[11px] sm:text-xs md:text-sm">
                {user.name}
              </span>
              <button
                onClick={logout}
                className="text-[11px] sm:text-xs md:text-sm text-slate-600 underline"
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

        {/* Menu Mobile */}
        <div className="flex sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>

      {/* Dropdown Mobile */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col items-center gap-2 py-3 border-t border-slate-200 bg-white text-[12px]">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Catálogo
          </Link>
          <Link href="/cart" onClick={() => setMenuOpen(false)}>
            Carrinho ({items.length})
          </Link>
          <Link href="/checkout" onClick={() => setMenuOpen(false)}>
            Checkout
          </Link>
          <Link href="/orders" onClick={() => setMenuOpen(false)}>
            Pedidos
          </Link>
          {user ? (
            <button onClick={logout} className="text-red-600 mt-2 text-xs">
              Sair
            </button>
          ) : (
            <Link href="/auth" onClick={() => setMenuOpen(false)}>
              Entrar
            </Link>
          )}
        </div>
      )}
    </header>
  );
};
