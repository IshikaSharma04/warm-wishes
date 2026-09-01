"use client";

import Link from "next/link";
import Image from "next/image";
import { DownloadAppButton } from "@/components/pwa/DownloadAppButton";

export function Footer() {
  return (
    <footer className="bg-[#0D0B09] text-[#E8E0D8] pt-20 pb-8 border-t border-[#C8A66A]/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 border-b border-[#C8A66A]/10">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/images/logo.png"
                alt="Warm Wishes Logo"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover border border-[#C8A66A]/40 shadow-sm shrink-0"
              />
              <span className="font-playfair text-2xl font-semibold text-[#E8E0D8] tracking-wide group-hover:text-[#C8A66A] transition-colors">
                Warm Wishes
              </span>
            </Link>
            <p className="font-poppins text-sm text-[#E8E0D8]/50 leading-relaxed max-w-xs">
              Handcrafted gifts made with love for every occasion.
            </p>
            <div className="flex gap-4 pt-2">
              {/* Social Icons */}
              <a href="https://instagram.com/warm__wishes" target="_blank" rel="noreferrer" className="w-9 h-9 border border-[#C8A66A]/20 rounded-full flex items-center justify-center text-[#E8E0D8]/60 hover:bg-[#C8A66A] hover:border-[#C8A66A] hover:text-white transition-colors" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://wa.me/919073620812" target="_blank" rel="noreferrer" className="w-9 h-9 border border-[#C8A66A]/20 rounded-full flex items-center justify-center text-[#E8E0D8]/60 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-colors" aria-label="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
              <a href="mailto:thewarmwishescompany@gmail.com" className="w-9 h-9 border border-[#C8A66A]/20 rounded-full flex items-center justify-center text-[#E8E0D8]/60 hover:bg-[#C8A66A] hover:border-[#C8A66A] hover:text-white transition-colors" aria-label="Email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-cormorant font-semibold text-sm uppercase tracking-[0.15em] text-[#C8A66A]">Quick Links</h4>
            <ul className="space-y-3 font-poppins text-sm text-[#E8E0D8]/50">
              <li><Link href="/" className="hover:text-[#C8A66A] transition-colors">Home</Link></li>
              <li><Link href="/collections" className="hover:text-[#C8A66A] transition-colors">Shop</Link></li>
              <li><Link href="/about" className="hover:text-[#C8A66A] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#C8A66A] transition-colors">Contact</Link></li>
              <li className="pt-2"><DownloadAppButton variant="footer" /></li>
            </ul>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-cormorant font-semibold text-sm uppercase tracking-[0.15em] text-[#C8A66A]">Shop</h4>
            <ul className="space-y-3 font-poppins text-sm text-[#E8E0D8]/50">
              <li><Link href="/collections/scented-candles" className="hover:text-[#C8A66A] transition-colors">Scented Candles</Link></li>
              <li><Link href="/collections/handmade-chocolates" className="hover:text-[#C8A66A] transition-colors">Handmade Chocolates</Link></li>
              <li><Link href="/collections/handmade-soaps" className="hover:text-[#C8A66A] transition-colors">Handmade Soaps</Link></li>
              <li><Link href="/collections/gift-hampers" className="hover:text-[#C8A66A] transition-colors">Gift Hampers</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-poppins text-xs text-[#E8E0D8]/30">
            © {new Date().getFullYear()} Warm Wishes. Handcrafted with 💛 in India.
          </p>
          <div className="flex gap-6 font-poppins text-xs text-[#E8E0D8]/30">
            <Link href="/privacy" className="hover:text-[#C8A66A] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#C8A66A] transition-colors">Terms</Link>
            <Link href="/shipping" className="hover:text-[#C8A66A] transition-colors">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
