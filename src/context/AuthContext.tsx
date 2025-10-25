"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
  user: string | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("miguelflixUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser).email);
      }
    }
  }, []);

  const login = (email: string) => {
    localStorage.setItem("miguelflixUser", JSON.stringify({ email }));
    setUser(email);
  };

  const logout = () => {
    localStorage.removeItem("miguelflixUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
