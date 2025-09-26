"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: number;
  name?: string;
  email?: string;
  role: string; // Only one role
}

const UserContext = createContext<User | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export function useUser() {
  return useContext(UserContext);
}