"use client";

import { useState, useEffect } from "react";
import { Download, Smartphone } from "lucide-react";

interface DownloadAppButtonProps {
  variant?: "navbar" | "mobile" | "footer" | "banner";
}

export function DownloadAppButton({ variant = "navbar" }: DownloadAppButtonProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // 1. Detect standalone PWA mode
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (standalone) {
      setIsStandalone(true);
      setIsInstalled(true);
      try {
        localStorage.setItem("warm_wishes_app_installed", "true");
      } catch (e) {}
    } else {
      try {
        if (localStorage.getItem("warm_wishes_app_installed") === "true") {
          setIsInstalled(true);
        }
      } catch (e) {}
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      setIsInstalled(true);
      try {
        localStorage.setItem("warm_wishes_app_installed", "true");
      } catch (e) {}
      setDeferredPrompt(null);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isInstalled) {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isAndroid = /android/.test(userAgent);

      if (isAndroid) {
        // Android Intent forces opening the installed PWA app window
        window.location.href =
          "intent://the-warm-wishes-company.vercel.app/#Intent;scheme=https;package=com.android.chrome;end";
        setTimeout(() => {
          window.location.href = "https://the-warm-wishes-company.vercel.app/?mode=app";
        }, 600);
        return;
      }

      try {
        window.open("web+warmwishes://open", "_self");
      } catch (e) {}

      window.location.href = "https://the-warm-wishes-company.vercel.app/?mode=app";
      return;
    }

    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
          setIsInstalled(true);
          try {
            localStorage.setItem("warm_wishes_app_installed", "true");
          } catch (e) {}
        }
      } catch (e) {
        console.error(e);
      }
      setDeferredPrompt(null);
    } else {
      // Directly open/redirect to production app domain with zero popup
      try {
        localStorage.setItem("warm_wishes_app_installed", "true");
        setIsInstalled(true);
      } catch (e) {}
      window.location.href = "https://the-warm-wishes-company.vercel.app/";
    }
  };

  // If user is inside the standalone PWA app, hide all download prompts
  if (isStandalone) return null;

  // Banner variant
  if (variant === "banner") {
    if (isInstalled) return null;

    return (
      <div className="bg-[#1C1916] border-b border-[#C8A66A]/20 px-3 py-2 flex items-center justify-between text-xs text-[#E8E0D8]">
        <div className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Logo" className="w-5 h-5 rounded-full object-cover border border-[#C8A66A]/40 shrink-0" />
          <span className="font-poppins font-medium text-[11px] text-[#E8E0D8]">Install Warm Wishes App for a better experience</span>
        </div>
        <button
          onClick={handleInstallClick}
          className="bg-[#C8A66A] hover:bg-[#b8935a] text-[#141210] font-poppins font-semibold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full transition-colors flex items-center gap-1 shrink-0 ml-2 shadow-sm"
        >
          <Download size={11} />
          <span>Install</span>
        </button>
      </div>
    );
  }

  // Navbar variant
  if (variant === "navbar") {
    return (
      <button
        onClick={handleInstallClick}
        className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#C8A66A]/15 hover:bg-[#C8A66A]/25 border border-[#C8A66A]/40 text-[#C8A66A] text-[10px] sm:text-[11px] font-poppins font-medium uppercase tracking-wider px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-all duration-300 shadow-sm shrink-0"
        title={isInstalled ? "Open Warm Wishes App" : "Download Warm Wishes App"}
      >
        {isInstalled ? (
          <>
            <Smartphone size={12} className="text-[#C8A66A]" />
            <span>Open App</span>
          </>
        ) : (
          <>
            <Download size={12} className="animate-bounce" />
            <span>Get App</span>
          </>
        )}
      </button>
    );
  }

  // Mobile Drawer variant
  if (variant === "mobile") {
    return (
      <button
        onClick={handleInstallClick}
        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#C8A66A] to-[#B59255] text-[#141210] font-poppins font-semibold text-sm uppercase tracking-widest py-3.5 rounded-lg shadow-lg shadow-[#C8A66A]/20 transition-all mt-4"
      >
        {isInstalled ? (
          <>
            <Smartphone size={18} />
            <span>Open App</span>
          </>
        ) : (
          <>
            <Download size={18} />
            <span>Download App</span>
          </>
        )}
      </button>
    );
  }

  // Footer variant
  if (variant === "footer") {
    return (
      <button
        onClick={handleInstallClick}
        className="inline-flex items-center gap-2.5 text-xs font-poppins text-[#C8A66A] hover:text-[#E8E0D8] transition-colors group"
      >
        <Smartphone size={16} className="group-hover:scale-110 transition-transform" />
        <span className="underline underline-offset-4 decoration-[#C8A66A]/40 group-hover:decoration-[#E8E0D8]">
          {isInstalled ? "Open App" : "Download App"}
        </span>
      </button>
    );
  }

  return null;
}
