import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";
import ClientSplash from "@/components/ClientSplash";
import { ModalProvider } from "@/context/ModalContext";
import { AuthProvider } from "@/context/AuthContext";
import ModalHandler from "@/components/ModalHandler";
import { MyListProvider } from "@/context/MyListContext";

export const metadata = {
  title: "MiguelFlix",
  description: "Tu cine en un solo lugar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-900 text-white">
        <ClientSplash>
          <AuthProvider>
            <ModalProvider>
              <MyListProvider>
                <Navbar />
                <main>{children}</main>
                <Footer />
                <ModalHandler />
              </MyListProvider>
            </ModalProvider>           
          </AuthProvider>
        </ClientSplash>
      </body>
    </html>
  );
}