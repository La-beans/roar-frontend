"use client";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);

  async function login(email: string, password: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      // If response is not JSON, throw a generic error
      throw new Error("Server error. Please try again later.");
    }

    if (!res.ok) {
      throw new Error(data?.error || "Login failed");
    }

    setUser(data.user);
    localStorage.setItem("token", data.token);
    return true;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}