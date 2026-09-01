"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Search, User, ShoppingBag, Heart, X, Menu } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { DownloadAppButton } from "@/components/pwa/DownloadAppButton";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useCartStore((s) => s.count());

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/collections" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Reviews", href: "/reviews" },
  ];

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-[#141210]/95 backdrop-blur-md shadow-lg shadow-black/30"
            : "bg-[#141210]"
        } border-b border-[#C8A66A]/12`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <Image
              src="/images/logo.png"
              alt="Warm Wishes Logo"
              width={56}
              height={56}
              priority
              className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover border border-[#C8A66A]/40 shadow-md shrink-0 group-hover:scale-105 transition-transform duration-300"
            />
            <span className="font-playfair text-lg sm:text-2xl font-semibold text-[#E8E0D8] tracking-wide group-hover:text-[#C8A66A] transition-colors duration-300">
              Warm Wishes
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-poppins text-[11px] uppercase tracking-[0.15em] text-[#E8E0D8]/70 hover:text-[#C8A66A] transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C8A66A] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Icons & Download App */}
          <div className="flex items-center gap-2.5 sm:gap-4 text-[#E8E0D8]/70">
            <DownloadAppButton variant="navbar" />
            <button aria-label="Search" className="hover:text-[#C8A66A] transition-colors hidden md:block">
              <Search size={18} />
            </button>
            <Link href="/wishlist" aria-label="Wishlist" className="hover:text-[#C8A66A] transition-colors hidden md:block">
              <Heart size={18} />
            </Link>
            <Link href="/cart" aria-label="Cart" className="hover:text-[#C8A66A] transition-colors relative p-1">
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C8A66A] text-[#141210] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-poppins font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden hover:text-[#C8A66A] transition-colors p-1"
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-[#141210] flex flex-col p-8 justify-between">
          <div>
            <div className="flex justify-between items-center mb-10">
              <Link href="/" className="font-playfair text-2xl font-semibold text-[#E8E0D8]" onClick={() => setMobileOpen(false)}>
                Warm Wishes
              </Link>
              <button onClick={() => setMobileOpen(false)}>
                <X size={24} className="text-[#E8E0D8]/70 hover:text-[#C8A66A] transition-colors" />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-playfair text-2xl font-medium text-[#E8E0D8] hover:text-[#C8A66A] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-[#C8A66A]/20">
            <DownloadAppButton variant="mobile" />
          </div>
        </div>
      )}
    </>
  );
}
