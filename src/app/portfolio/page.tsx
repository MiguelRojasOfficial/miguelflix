"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Linkedin, Send, Github } from "lucide-react";
import { SiVercel } from "react-icons/si";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface State {
  success: boolean;
  errors: Record<string, string[]>;
  loading: boolean;
}

export default function PortfolioPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [state, setState] = useState<State>({
    success: false,
    errors: {},
    loading: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ success: false, errors: {}, loading: true });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setState({ success: true, errors: {}, loading: false });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setState({ success: false, errors: result.errors || {}, loading: false });
      }
    } catch {
      setState({ success: false, errors: { general: ["Error de red"] }, loading: false });
    }
  };

  const socialLinks = [
    { id: 1, name: "GitHub", icon: <Github className="w-6 h-6" />, url: "https://github.com/MiguelRojasOfficial", text: "@MiguelRojasOfficial" },
    { id: 2, name: "LinkedIn", icon: <Linkedin className="w-6 h-6" />, url: "https://linkedin.com/in/miguelrojasoficial", text: "@miguelrojasoficial" },
    { id: 3, name: "Render", icon: (     
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
        fill="currentColor"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path d="M26.827.01c-4.596-.216-8.461 3.107-9.12 7.487-.027.203-.066.4-.099.596-1.025 5.454-5.797 9.584-11.53 9.584a11.67 11.67 0 0 1-5.634-1.442.298.298 0 0 0-.444.262v18.854h17.602V22.097c0-2.439 1.971-4.419 4.4-4.419h4.4c4.982 0 8.99-4.15 8.795-9.197C35.02 3.937 31.35.226 26.827.01Z"/>
      </svg>
    ), 
    url: "https://miguelrojasoficial.onrender.com", text: "@miguelrojasofficial" },
    { id: 4, name: "Correo", icon: <Mail className="w-6 h-6" />, url: "https://mail.google.com/mail/?view=cm&fs=1&to=miguelrojasy3@gmail.com", text: "miguelrojasy3@gmail.com" },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <section className="py-16 px-6 bg-gray-900 text-white">
        <h2 className="text-3xl font-bold mb-8 text-center">Mi Portafolio</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
            <img
              src="/images/migueltify.png"
              alt="Proyecto"
              className="w-full h-auto object-contain bg-gray-800"
            />
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Migueltify</h3>
                <p className="text-sm text-gray-300 mb-4">Next + React + Typescript + Tailwind + CSS + API de Deezer + Multilenguaje</p>
                <a
                  href="https://migueltify.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:underline"
                >
                  Ver proyecto →
                </a>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
            <img
              src="/images/migueltv.png"
              alt="Proyecto"
              className="w-full h-auto object-contain bg-gray-800"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Miguel TV</h3>
              <p className="text-sm text-gray-300 mb-4">Next + React + Typescript + Tailwind + CSS + API de TMDb</p>
              <a
                href="https://migueltv.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:underline"
              >
                Ver proyecto →
              </a>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
            <img
              src="/images/miguelstore.png"
              alt="Proyecto 4"
              className="w-full h-auto object-contain bg-gray-800"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">MiguelStore</h3>
              <p className="text-sm text-gray-300 mb-4">Next + React + Typescript + Tailwind + CSS</p>
              <a
                href="https://miguelstore.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:underline"
              >
                Ver proyecto →
              </a>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
            <img
              src="/images/miguelcrm.png"
              alt="Proyecto 4"
              className="w-full h-auto object-contain bg-gray-800"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Miguel CRM</h3>
              <p className="text-sm text-gray-300 mb-4">Next + React + Typescript + Tailwind + CSS</p>
              <a
                href="https://miguelcrm.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:underline"
              >
                Ver proyecto →
              </a>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
            <img
              src="/images/airplane.png"
              alt="Proyecto"
              className="w-full h-auto object-contain bg-gray-800"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Airplane</h3>
              <p className="text-sm text-gray-300 mb-4">React + Three.js + @react-three/fiber + CSS</p>
              <a
                href="https://miguelrojasoficial.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:underline"
              >
                Ver proyecto →
              </a>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg shadow-md flex flex-col justify-center items-center p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Conecta conmigo</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
              {socialLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  {...(item.name !== "Correo" && { target: "_blank", rel: "noopener noreferrer" })}
                  className="flex items-center gap-4 px-6 py-4 rounded-xl border border-gray-700 hover:bg-gray-700 transition-colors duration-300 group text-left"
                >
                  <span className="text-3xl text-red-500 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    {item.icon}
                  </span>
                  <div className="overflow-hidden">
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-sm text-gray-400 break-words whitespace-normal">{item.text}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto space-y-8"
      >
        <div className="text-center mt-10">
          <h1 className="text-4xl font-bold">Contáctame</h1>
          <p className="mt-2 text-gray-400">Abierto a nuevas oportunidades y proyectos.</p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gray-900 p-8 rounded-lg shadow-lg space-y-6"
        >
          {state.success && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-center font-semibold">
              ✅ ¡Tu mensaje fue enviado con éxito!
            </motion.p>
          )}

          {state.errors.general && (
            <p className="text-red-500 text-center">{state.errors.general[0]}</p>
          )}

          <div>
            <label className="block mb-1">Nombre</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 text-white rounded"
            />
            {state.errors.name && <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>}
          </div>

          <div>
            <label className="block mb-1">Correo</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 text-white rounded"
            />
            {state.errors.email && <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>}
          </div>

          <div>
            <label className="block mb-1">Mensaje</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
              className="w-full px-4 py-2 bg-gray-800 text-white rounded"
            />
            {state.errors.message && <p className="text-red-500 text-sm mt-1">{state.errors.message[0]}</p>}
          </div>

          <button
            type="submit"
            disabled={state.loading}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition px-6 py-2 rounded text-white font-semibold"
          >
            <Send size={18} />
            {state.loading ? "Enviando..." : "Enviar mensaje"}
          </button>
        </motion.form>
      </motion.div>
    </main>
  );
}
