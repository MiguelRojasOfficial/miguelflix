"use client";

import { useModal } from "@/context/ModalContext";

export default function CallToAction() {
  const { openRegister } = useModal();

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Disfruta del mejor entretenimiento</h2>
        <p className="text-lg md:text-xl mb-8">Películas y series para todos los gustos. Disponible en cualquier dispositivo.</p>
        <button
          onClick={openRegister}
          className="inline-block bg-black text-white px-8 py-4 rounded text-lg font-semibold hover:bg-gray-900 transition"
        >
          Suscribirme
        </button>
      </div>
    </section>
  );
}