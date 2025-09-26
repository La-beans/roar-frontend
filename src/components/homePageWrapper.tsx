import "@/styles/globals.css";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <html lang="en">
      <body className={isHome ? "homepage" : ""}>
        {children}
      </body>
    </html>
  );
}