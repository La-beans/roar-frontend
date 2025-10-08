"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Headphones, Settings, User, Mail, Menu, X, House } from "lucide-react";
import { useAuth } from "../app/context/AuthContext";

type NavLink = {
  name: string;
  path: string;
  icon?: React.ReactNode;
  adminOnly?: boolean;
};

export default function Navbar(): React.ReactElement {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [menuHeight, setMenuHeight] = useState<number>(0);

  // Access logged-in user and logout from context
  const { user, logout } = useAuth();
  
  useEffect(() => {
    function handleOutside(e: MouseEvent | TouchEvent) {
      if (!isOpen) return;
      const target = e.target as Node | null;
      if (target && menuRef.current && !menuRef.current.contains(target) && buttonRef.current && !buttonRef.current.contains(target)) {
        setIsOpen(false);
      }
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  const links: NavLink[] = [
    { name: "Home", path: "/", icon: <House size={18} /> },
    { name: "Magazine", path: "/magazine", icon: <BookOpen size={18} /> },
    { name: "Podcast", path: "/podcast", icon: <Headphones size={18} /> },
    { name: "Issues", path: "/issues" },
    { name: "About", path: "/about", icon: <User size={18} /> },
    { name: "Contact", path: "/contact", icon: <Mail size={18} /> },
    { name: "Editor Studio", path: "/editor", icon: <Settings size={18} />, adminOnly: true },
  ];

  // Set navbar background based on route
  const navbarBg = pathname === "/" ? "bg-[#A6192E]" : "bg-[#A6192E]";

  // Filter links: students don’t see adminOnly links
  const visibleLinks = links.filter((link) => 
    !link.adminOnly ||
   // fallback for legacy user.role
    (user?.role && (
      user.role === "admin"
    ))
  );

  // measure dropdown content so we can animate max-height
  useEffect(() => {
    function measure() {
      if (!menuRef.current) return;
      // scrollHeight gives the full content height regardless of max-height
      setMenuHeight(menuRef.current.scrollHeight);
    }
    // measure once and on resize
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [visibleLinks.length]);

  //console.log("Navbar user object:", user);
  return (
    <nav className={`${navbarBg} shadow-md sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="../covers/logo.png" alt="Logo" className="h-8 w-8" />
          <span className="font-serif font-bold text-xl text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text animate-pulse">
            ROAR
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          {visibleLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`relative flex items-center space-x-1 px-3 py-2 transition ${
                pathname === link.path
                  ? "text-white font-semibold"
                  : pathname === "/"
                  ? "text-white hover:text-pink-300"
                  : "text-white hover:text-pink-300"
              }`}
            >
              {link.icon && link.icon}
              <span>{link.name}</span>
              {/* Active underline */}
              {pathname === link.path && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded transition-all duration-300"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Login/Logout Button */}
        <div className="ml-4">
          {user ? (
            <button
              onClick={logout}
              className="text-sm px-3 py-2 rounded bg-[#A6192E] text-white hover:bg-[#B5141B]"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="text-sm px-3 py-2 rounded bg-gray-900 text-white hover:bg-gray-400"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded hover:bg-gray-100"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown - always mounted so we can animate open/close */}
      <div
        ref={menuRef}
        aria-hidden={!isOpen}
        className={`md:hidden bg-[#A6192E] border-t shadow-md overflow-hidden`}
        style={{
          maxHeight: isOpen ? `${menuHeight}px` : "0px",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0)" : "translateY(-8px)",
          transition: "max-height 350ms ease, opacity 300ms ease, transform 300ms ease",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <div className="flex flex-col space-y-2 p-4">
          {visibleLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsOpen(false)} // close after click
              className={`relative flex items-center space-x-2 px-3 py-2 rounded-md transition ${
                pathname === link.path
                  ? "text-white font-semibold"
                  : pathname === "/"
                  ? "text-white hover:text-pink-300"
                  : "text-white hover:text-pink-300"
              }`}
            >
              {link.icon && link.icon}
              <span>{link.name}</span>
              {pathname === link.path && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded transition-all duration-300"></span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
