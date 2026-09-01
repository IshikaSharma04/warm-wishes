"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function SplashScreen() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Check if splash has already been shown in current browser session
    const hasSeenSplash = sessionStorage.getItem("warm_wishes_splash_seen");

    // Fade out after 1.4s on first visit, 0.4s on subsequent
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("warm_wishes_splash_seen", "true");
      }, 500); // 500ms fade transition
    }, hasSeenSplash ? 400 : 1400);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#141210] flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center justify-center text-center px-6">
        {/* Animated Emblem Logo */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 mb-6 rounded-full overflow-hidden border-2 border-[#C8A66A]/40 shadow-2xl shadow-black/80 animate-pulse">
          <Image
            src="/images/logo.png"
            alt="Warm Wishes Logo"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Brand Name */}
        <h1 className="font-playfair text-3xl sm:text-4xl font-semibold text-[#E8E0D8] tracking-widest uppercase mb-2">
          Warm Wishes
        </h1>
        <p className="font-poppins text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C8A66A] mb-8 font-light">
          Luxury Handcrafted Gifts
        </p>

        {/* Golden Progress Bar */}
        <div className="w-44 sm:w-56 h-1 bg-[#1C1916] rounded-full overflow-hidden border border-[#C8A66A]/20">
          <div className="h-full bg-gradient-to-r from-[#C8A66A]/40 via-[#C8A66A] to-[#E8E0D8] rounded-full animate-splash-progress" />
        </div>
      </div>
    </div>
  );
}
