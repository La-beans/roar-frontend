import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import Navbar from "../components/NavbarWrapper";
import AnimatedLayout from "../components/AnimatedLayout";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext"; // adjust import as needed

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ROAR Magazine",
  description: "School Magazine Website",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-gray-900`} suppressHydrationWarning>
        
        <AuthProvider>
          <UserProvider>
            <Navbar />
            <AnimatedLayout>
              {children}
            </AnimatedLayout>
          </UserProvider>
        </AuthProvider>
        
      </body>
    </html>
  );
}
  
