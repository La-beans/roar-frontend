"use client";

import React, { JSX } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BookOpen, Headphones, Settings, User, Mail, Menu, X, House } from "lucide-react";
import { useAuth } from "../app/context/AuthContext";

type NavLink = {
  name: string;
  path: string;
  icon?: React.ReactNode;
  adminOnly?: boolean;
};

export default function Navbar(): JSX.Element {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Access logged-in user and logout from context
  const { user, logout } = useAuth();

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
  const navbarBg = pathname === "/" ? "bg-blue-900" : "bg-white";

  // Filter links: students don’t see adminOnly links
  const visibleLinks = links.filter((link) => 
    !link.adminOnly ||
   // fallback for legacy user.role
    (user?.role && (
      user.role === "admin"
    ))
  );

  console.log("Navbar user object:", user);
  return (
    <nav className={`${navbarBg} shadow-md sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
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
                  ? "text-yellow-300 font-semibold"
                  : pathname === "/"
                  ? "text-white hover:text-yellow-300"
                  : "text-gray-700 hover:text-yellow-600"
              }`}
            >
              {link.icon && link.icon}
              <span>{link.name}</span>
              {/* Active underline */}
              {pathname === link.path && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 rounded transition-all duration-300"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Login/Logout Button */}
        <div className="ml-4">
          {user ? (
            <button
              onClick={logout}
              className="text-sm px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="text-sm px-3 py-2 rounded bg-yellow-500 text-black hover:bg-yellow-600"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded hover:bg-gray-100"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          className={`md:hidden ${pathname === "/" ? "bg-blue-900" : "bg-white"} border-t shadow-md`}
        >
          <div className="flex flex-col space-y-2 p-4">
            {visibleLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)} // close after click
                className={`relative flex items-center space-x-2 px-3 py-2 rounded-md transition ${
                  pathname === link.path
                    ? "text-yellow-300 font-semibold"
                    : pathname === "/"
                    ? "text-white hover:text-yellow-300"
                    : "text-gray-700 hover:text-yellow-600"
                }`}
              >
                {link.icon && link.icon}
                <span>{link.name}</span>
                {pathname === link.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 rounded transition-all duration-300"></span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
