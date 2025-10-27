"use client";

import { useState } from "react";
import { findUserByEmail } from "@/utils/userStorage";

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

export default function LoginModal({ onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, completa todos los campos");
      return;
    }

    const user = findUserByEmail(email);
    if (!user || user.password !== password) {
      setError("Correo o contraseña incorrectos");
      return;
    }

    localStorage.setItem("miguelflixUser", JSON.stringify({ email }));
    onLoginSuccess(email);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-lg max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-white text-xl font-bold" aria-label="Cerrar">×</button>
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Iniciar Sesión</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-gray-300">Correo electrónico</label>
          <input
            type="email"
            className="w-full p-3 rounded bg-gray-700 text-white mb-6 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="block mb-2 text-gray-300">Contraseña</label>
          <input
            type="password"
            className="w-full p-3 rounded bg-gray-700 text-white mb-6 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-3 rounded">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
