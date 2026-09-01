"use client";

import { useState, useEffect } from "react";
import { Download, Smartphone, X, CheckCircle2, Share, ExternalLink } from "lucide-react";

interface DownloadAppButtonProps {
  variant?: "navbar" | "mobile" | "footer" | "banner";
}

export function DownloadAppButton({ variant = "navbar" }: DownloadAppButtonProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // 1. Detect if running inside installed PWA app (standalone mode)
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

    // 2. Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setIsIOS(true);
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
    if (isInstalled && !deferredPrompt) {
      // Open App / Homepage
      window.location.href = "/?mode=pwa";
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
        try {
          localStorage.setItem("warm_wishes_app_installed", "true");
        } catch (e) {}
      }
      setDeferredPrompt(null);
    } else {
      setShowModal(true);
    }
  };

  // If user is already running INSIDE the standalone PWA app, hide all download prompts
  if (isStandalone) return null;

  // Banner variant: Hide banner if already installed
  if (variant === "banner") {
    if (isInstalled) return null;

    return (
      <>
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

        {showModal && <InstallModal isIOS={isIOS} onClose={() => setShowModal(false)} />}
      </>
    );
  }

  // Navbar variant: Switch to "Open App" if already installed
  if (variant === "navbar") {
    return (
      <>
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

        {showModal && <InstallModal isIOS={isIOS} onClose={() => setShowModal(false)} />}
      </>
    );
  }

  // Mobile Drawer variant: Switch to "Open App" if installed
  if (variant === "mobile") {
    return (
      <>
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

        {showModal && <InstallModal isIOS={isIOS} onClose={() => setShowModal(false)} />}
      </>
    );
  }

  // Footer variant: Switch to "Open App" if installed
  if (variant === "footer") {
    return (
      <>
        <button
          onClick={handleInstallClick}
          className="inline-flex items-center gap-2.5 text-xs font-poppins text-[#C8A66A] hover:text-[#E8E0D8] transition-colors group"
        >
          <Smartphone size={16} className="group-hover:scale-110 transition-transform" />
          <span className="underline underline-offset-4 decoration-[#C8A66A]/40 group-hover:decoration-[#E8E0D8]">
            {isInstalled ? "Open App" : "Download App"}
          </span>
        </button>

        {showModal && <InstallModal isIOS={isIOS} onClose={() => setShowModal(false)} />}
      </>
    );
  }

  return null;
}

function InstallModal({ isIOS, onClose }: { isIOS: boolean; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1C1916] border border-[#C8A66A]/30 rounded-2xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#E8E0D8]/60 hover:text-[#E8E0D8] transition-colors p-1"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-[#141210] border border-[#C8A66A]/40 flex items-center justify-center p-2 shadow-inner">
            <img src="/images/logo.png" alt="Warm Wishes" className="w-full h-full object-cover rounded-xl" />
          </div>
          <div>
            <h3 className="font-playfair text-xl font-semibold text-[#E8E0D8]">Warm Wishes App</h3>
            <p className="font-poppins text-xs text-[#C8A66A]">Luxury Handcrafted Gifts</p>
          </div>
        </div>

        <p className="font-poppins text-xs text-[#E8E0D8]/80 leading-relaxed mb-6">
          Install the Warm Wishes app on your mobile device for quick access, exclusive offers, and instant order tracking!
        </p>

        {isIOS ? (
          <div className="bg-[#141210] p-4 rounded-xl border border-[#C8A66A]/20 space-y-3 font-poppins text-xs text-[#E8E0D8]/90">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#C8A66A]/20 text-[#C8A66A] flex items-center justify-center font-bold text-xs">1</span>
              <p className="flex items-center gap-1.5">
                Tap the <Share size={14} className="text-[#C8A66A]" /> <strong>Share</strong> icon in Safari.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#C8A66A]/20 text-[#C8A66A] flex items-center justify-center font-bold text-xs">2</span>
              <p>Scroll down and select <strong>"Add to Home Screen"</strong>.</p>
            </div>
          </div>
        ) : (
          <div className="bg-[#141210] p-4 rounded-xl border border-[#C8A66A]/20 space-y-3 font-poppins text-xs text-[#E8E0D8]/90">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#C8A66A]/20 text-[#C8A66A] flex items-center justify-center font-bold text-xs">1</span>
              <p>Tap your browser's menu (<strong>⋮</strong> three dots).</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#C8A66A]/20 text-[#C8A66A] flex items-center justify-center font-bold text-xs">2</span>
              <p>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</p>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full mt-6 bg-[#C8A66A] hover:bg-[#b59255] text-[#141210] font-poppins font-semibold text-xs uppercase tracking-widest py-3 rounded-lg transition-colors"
        >
          Got It
        </button>
      </div>
    </div>
  );
}
