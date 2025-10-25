"use client";

import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("miguelflixUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser).email);
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

  return { user, login, logout };
}
