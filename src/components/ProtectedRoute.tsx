"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/context/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  // Helper to check access
  const hasAccess =
    user &&
    (
      (Array.isArray(user.tags) &&
        (user.tags.includes("admin") ||
         user.tags.includes("editor") ||
         user.tags.includes("podcast")))
      ||
      (user.role === "admin" ||
       user.role === "editor" ||
       user.role === "podcast")
    );

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else if (!hasAccess) {
      router.replace("/");
    }
  }, [user, hasAccess, router]);

  if (!user || !hasAccess) {
    return null;
  }

  return <>{children}</>;
}
