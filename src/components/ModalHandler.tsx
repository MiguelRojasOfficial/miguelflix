"use client";

import { useModal } from "@/context/ModalContext";
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";
import { useAuth } from "@/context/AuthContext";

export default function ModalHandler() {
  const {
    showRegister,
    closeRegister,
    showLogin,
    closeLogin,
    openLogin,
  } = useModal();

  const { login } = useAuth();

  return (
    <>
      {showRegister && (
        <RegisterModal
          onClose={closeRegister}
          onRegisterSuccess={(email) => {
            closeRegister();
            openLogin();
          }}
        />
      )}

      {showLogin && (
        <LoginModal
          onClose={closeLogin}
          onLoginSuccess={(email) => {
            login(email);
            closeLogin();
          }}
        />
      )}
    </>
  );
}