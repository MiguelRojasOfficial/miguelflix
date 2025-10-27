"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import { Search } from "lucide-react";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { openLogin, openRegister } = useModal();
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <nav className="w-full bg-black text-white px-6 py-3 flex items-center justify-between shadow-md fixed top-0 z-50 gap-3">
      <div
        onClick={handleLogoClick}
        className="text-3xl font-bold cursor-pointer hover:scale-105 transition-transform duration-300"
      >
        <span className="text-red-600">MiguelFlix</span>
      </div>

      <div className="hidden md:flex space-x-6 ml-8">
        <Link href="/" className="hover:text-red-500">
          Inicio
        </Link>
        <Link href="/catalog" className="hover:text-red-500">
          Explorar
        </Link>
        {user && ( 
          <Link href="/my-list" className="hover:text-red-500">
            Mi Lista
          </Link>
        )}
        <Link href="/portfolio" className="hover:text-red-500 font-bold">
          Portafolio
        </Link>
      </div>

      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(`/search?q=${encodeURIComponent(search)}`);
            }
          }}
          className="w-full px-4 py-2 rounded-lg border border-gray-500 bg-black text-white focus:outline-none focus:border-red-600"
        />
        <button
          onClick={() => {
            router.push(`/search?q=${encodeURIComponent(search)}`);
          }}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
        >
          <Search size={20} />
        </button>
      </div>

      <div className="hidden md:flex space-x-4 items-center">
        {user ? (
          <>
            <span className="text-red-600 font-semibold">{user?.split("@")[0]}</span>
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="px-4 py-2 border border-gray-500 rounded-lg hover:bg-gray-800"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <button
              onClick={openLogin}
              className="px-4 py-2 border border-gray-500 rounded-lg hover:bg-gray-800"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={openRegister}
              className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
            >
              Suscribirse
            </button>
          </>
        )}
      </div>

      <button
        className="md:hidden px-2 py-1 border border-gray-500 rounded"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black flex flex-col items-center py-4 space-y-3 md:hidden">
          <Link
            href="/"
            className="hover:text-red-500"
            onClick={() => setMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            href="/catalog"
            className="hover:text-red-500"
            onClick={() => setMenuOpen(false)}
          >
            Explorar
          </Link>
          
          {user && (
            <Link
              href="/my-list"
              className="hover:text-red-500"
              onClick={() => setMenuOpen(false)}
            >
              Mi Lista
            </Link>
          )}
          
          <Link
            href="/portfolio"
            className="hover:text-red-500 font-bold"
            onClick={() => setMenuOpen(false)}
          >
            Portafolio
          </Link>

          {user ? (
            <>
              <span className="text-red-600 font-semibold">{user?.split("@")[0]}</span>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                  router.push("/");
                }}
                className="px-4 py-2 border border-gray-500 rounded-lg hover:bg-gray-800 w-full text-center"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  openLogin();
                  setMenuOpen(false);
                }}
                className="px-4 py-2 border border-gray-500 rounded-lg hover:bg-gray-800 w-full text-center"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => {
                  openRegister();
                  setMenuOpen(false);
                }}
                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 w-full text-center"
              >
                Suscribirse
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
