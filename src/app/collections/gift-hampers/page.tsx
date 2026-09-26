"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { CollectionHero } from "@/components/product/CollectionHero";
import { FeatureGrid } from "@/components/product/FeatureGrid";

const HAMPERS = [
  {
    id: "hamper-valentine-599",
    name: "Valentine Rose & Romance Hamper",
    price: 599,
    image: "/images/gift-hampers/valentine-599.webp",
    category: "Gift Hampers",
    notes: "Rose Teddy Candle + Peony Rose candle + Heart Glass Candle + 4 Heart Chocolates",
    badge: "Love Edition",
  },
  {
    id: "hamper-ganesh-299",
    name: "Ganesh Chaturthi Shubh Prasad Hamper",
    price: 299,
    image: "/images/gift-hampers/ganesh299.webp",
    category: "Gift Hampers",
    notes: "Modak Candle + Motichoor Ladoo Candle + Daisy Flower Candle + tealight glass candle",
    badge: "Festive",
  },
  {
    id: "hamper-ganesh-599",
    name: "Ganesh Chaturthi Grand Bappa Hamper",
    price: 599,
    image: "/images/gift-hampers/ganesh-599.webp",
    category: "Gift Hampers",
    notes: "2 Modak Candles + 2 Ladoo Candles + Floral Urli + tealight glass candle+ Artisan Truffle",
    badge: "Divine Edition",
  },
];

const FEATURES = [
  { icon: "🎁", label: "Curated Selections" },
  { icon: "✨", label: "Luxury Packaging" },
  { icon: "💌", label: "Free Personalised Note" },
  { icon: "🚚", label: "Safe Express Delivery" },
];

export default function GiftHampersPage() {
  return (
    <div className="bg-[#141210] min-h-screen text-[#E8E0D8]">
      <CollectionHero
        title={<>Gift<br />Hampers</>}
        desc="Curated gift hampers filled with love, handmade candles, artisan chocolates and botanical soaps — for every celebration."
        image="/images/gift-hampers.png"
        imageAlt="Gift Hampers"
        bullets={["Curated Selections", "Luxury Packaging", "Free Gift Note"]}
        imageLeft={false}
      />

      {/* ── DIWALI COLLECTION BANNER ──────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pt-16">
        <Link
          href="/collections/diwali-gift-hampers"
          className="group relative block overflow-hidden rounded-3xl border border-[#C8A66A]/25 shadow-lg shadow-black/30 hover:border-[#C8A66A]/50 transition-colors duration-500"
        >
          <div className="relative h-56 sm:h-80 w-full">
            <Image
              src="/images/diwali-hampers/diwali-999.webp"
              alt="Diwali Gift Hampers"
              fill
              sizes="100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#141210] via-[#141210]/80 to-[#141210]/20" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-14">
            <p className="font-poppins text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#C8A66A] mb-2 sm:mb-3">
              Festive Collection
            </p>
            <h2 className="font-playfair text-2xl sm:text-4xl font-semibold text-[#E8E0D8] mb-2 sm:mb-3">
              Diwali Gift Hampers
            </h2>
            <p className="font-poppins text-xs sm:text-sm text-[#E8E0D8]/70 max-w-md mb-4 sm:mb-6">
              Painted diyas, motichoor ladoo candles, daisy bouquets & premium scented jar sets.
            </p>
            <span className="inline-flex items-center gap-2 self-start font-poppins text-[10px] sm:text-xs uppercase tracking-widest bg-[#C8A66A] hover:bg-[#b8935a] text-[#141210] font-bold px-5 sm:px-8 py-3 sm:py-4 rounded-md transition-colors">
              Explore Diwali Collection <ArrowRight size={13} />
            </span>
          </div>
        </Link>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-poppins text-[11px] uppercase tracking-[0.2em] text-[#C8A66A] mb-3">Curated With Care</p>
          <h2 className="font-playfair text-4xl font-semibold text-[#E8E0D8]">Our Hamper Collection</h2>
          <div className="flex justify-center items-center gap-3 mt-4">
            <div className="h-px w-10 bg-[#C8A66A]/40" /><div className="w-1.5 h-1.5 rotate-45 bg-[#C8A66A]" /><div className="h-px w-10 bg-[#C8A66A]/40" />
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-6">
          {HAMPERS.map((h) => <ProductCard key={h.id} {...h} />)}
        </div>

        <FeatureGrid features={FEATURES} />

        {/* Custom Order CTA */}
        <div className="mt-20 bg-[#1C1916] rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#C8A66A]/20 shadow-lg shadow-black/20">
          <div>
            <h3 className="font-playfair text-3xl font-semibold text-[#E8E0D8] mb-2">Make It Extra Special</h3>
            <p className="font-poppins text-sm text-[#E8E0D8]/70 max-w-md">Add a personalised gift message or build your own custom gift box exactly the way you want it.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a href="https://wa.me/919073620812?text=Hi%2C%20I%20want%20to%20create%20a%20custom%20gift%20hamper!" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366]/10 text-[#25D366] font-poppins text-xs uppercase tracking-widest px-8 py-4 rounded-md transition-colors hover:bg-[#25D366] hover:text-[#141210] border border-[#25D366]/30 font-bold">
              WhatsApp Us
            </a>
            <a href="https://wa.me/919073620812?text=Hi%2C%20I%20want%20to%20customize%20a%20gift%20box!" target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#C8A66A] hover:bg-[#b8935a] text-[#141210] font-poppins text-xs uppercase tracking-widest px-8 py-4 rounded-md transition-colors shadow-lg shadow-[#C8A66A]/20 font-bold">
              Custom Order
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
