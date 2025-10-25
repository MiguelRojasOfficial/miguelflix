"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  showRegister: boolean;
  showLogin: boolean;
  openRegister: () => void;
  closeRegister: () => void;
  openLogin: () => void;
  closeLogin: () => void;
  setOnRegisterSuccessCallback: (cb: () => void) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [onRegisterSuccessCallback, setOnRegisterSuccessCallback] = useState<(() => void) | null>(null);

  const openRegister = () => setShowRegister(true);
  const closeRegister = () => setShowRegister(false);

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);

  return (
    <ModalContext.Provider
      value={{
        showRegister,
        showLogin,
        openRegister,
        closeRegister,
        openLogin,
        closeLogin,
        setOnRegisterSuccessCallback,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal debe usarse dentro de ModalProvider");
  return context;
};