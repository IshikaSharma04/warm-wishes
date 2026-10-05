"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";

export interface DiwaliHamper {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  notes: string;
  badge?: string;
  group: "hampers" | "candle-sets";
}

/**
 * Every Diwali image lives in `public/images/diwali-hampers/`.
 * The 6-jar scented candle set is Diwali-only, so it is kept in this
 * collection instead of the general Scented Candles page.
 */
export const DIWALI_HAMPERS: DiwaliHamper[] = [
  // ── 1. Signature hampers ───────────────────────────
  {
    id: "hamper-diwali-299",
    name: "Diwali Shubh Labh Hamper",
    price: 299,
    image: "/images/diwali-hampers/diwali-299.webp",
    category: "Gift Hampers",
    notes: "Hand-painted Diya + Daisy Candle + Motichoor Ladoo Candle + Chocolate Truffle",
    badge: "Festive",
    group: "hampers",
  },
  {
    id: "hamper-diwali-599",
    name: "Diwali Prosperity & Blessings Hamper",
    price: 599,
    image: "/images/diwali-hampers/diwali-599.webp",
    category: "Gift Hampers",
    notes: "Mixed Nuts + Floral Urli Candle + Diya + 2 Ladoo Candles + Daisy Candle",
    badge: "Bestseller",
    group: "hampers",
  },
  {
    id: "hamper-diwali-999",
    name: "Diwali Royale Grandeur Hamper",
    price: 999,
    image: "/images/diwali-hampers/diwali-999.webp",
    category: "Gift Hampers",
    notes: "Almonds & Cashews + Floral Urli + Glass Pearl Candle + 4 Truffles + Diya + 2 Ladoo + 1 Daisy",
    badge: "Grand Festive",
    group: "hampers",
  },
  {
    id: "hamper-diwali-1499",
    name: "Diwali Premium Celebration Hamper",
    price: 1499,
    image: "/images/diwali-hampers/diwali-1499.webp",
    category: "Gift Hampers",
    notes: "Exclusive Assortment of Sweets, Dry Fruits, Candles, and Diyas",
    badge: "Premium",
    group: "hampers",
  },

  // ── 2. Festive boxes ───────────────────────────────
  {
    id: "hamper-diwali-ladoo-tealight",
    name: "Motichoor Ladoo & Daisy Candle Box",
    price: 179,
    image: "/images/diwali-hampers/ladoo-tealight-combo.webp",
    category: "Gift Hampers",
    notes: "Motichoor Ladoo + Daisy Candle + Hand-Painted Diya Combos",
    group: "hampers",
  },
  {
    id: "hamper-diwali-tealight-diya",
    name: "Daisy Candle & Diya Festive Box",
    price: 179,
    image: "/images/diwali-hampers/tealight-diya-combo.webp",
    category: "Gift Hampers",
    notes: "2 Hand-Painted Diyas + Purple & Pink Daisy Candles",
    group: "hampers",
  },
  {
    id: "hamper-diwali-dryfruit-ladoo-diya",
    name: "Dry Fruit, Ladoo & Diya Box",
    price: 299,
    image: "/images/diwali-hampers/dryfruit-ladoo-diya-set.webp",
    category: "Gift Hampers",
    notes: "Cashews + Almonds + Motichoor Ladoo + Hand-Painted Diya",
    group: "hampers",
  },

  // ── 3. Candle & tealight sets ──────────────────────
  {
    id: "diwali-ladoo-candle-set",
    name: "Peony Candle & Ladoo Set",
    price: 249,
    image: "/images/diwali-hampers/urli-ladoo-set.webp",
    category: "Diwali Specials",
    notes: "Pink Peony Candle + 2 Motichoor Ladoo Candles",
    badge: "New",
    group: "candle-sets",
  },
  {
    id: "diwali-daisy-tealight-set",
    name: "Daisy Candle & Tealight Duo",
    price: 249,
    image: "/images/diwali-hampers/urli-tealight-set.webp",
    category: "Diwali Specials",
    notes: "Orange Daisy Candle + 2 Matching Tealight Jars",
    badge: "New",
    group: "candle-sets",
  },
  {
    id: "diwali-rose-single",
    name: "Single Pink Rose Candle",
    price: 199,
    image: "/images/diwali-hampers/urli-single.webp",
    category: "Diwali Specials",
    notes: "Hand-Poured Pink Rose Candle in Clear Gift Box",
    group: "candle-sets",
  },
  {
    id: "diwali-daisy-single",
    name: "Pink Peony Candle",
    price: 199,
    image: "/images/diwali-hampers/daisy.webp",
    category: "Diwali Specials",
    notes: "Layered Pink Peony Wax Candle with Gold Bow",
    group: "candle-sets",
  },
  {
    id: "diwali-floral-tealight-set4",
    name: "Floral Tealight Candles — Pack of 4",
    price: 179,
    image: "/images/diwali-hampers/tealight-set-of-4.webp",
    category: "Diwali Specials",
    notes: "Pink, Purple & White Daisy Tealight Jars",
    badge: "Pack of 4",
    group: "candle-sets",
  },
  {
    id: "diwali-daisy-tealight-box",
    name: "Daisy Candle & Tealight Box",
    price: 199,
    image: "/images/diwali-hampers/daisy-tealight-set.webp",
    category: "Diwali Specials",
    notes: "1 Large Daisy Candle + 5 Matching Tealight Jars",
    group: "candle-sets",
  },
  {
    id: "diwali-daisy-tealight-pack2",
    name: "Daisy & Tealight Box — Pack of 2",
    price: 299,
    image: "/images/diwali-hampers/daisy-tealight-duo.webp",
    category: "Diwali Specials",
    notes: "Yellow & Pink Daisy Candle Boxes with Tealights",
    badge: "Pack of 2",
    group: "candle-sets",
  },
  {
    id: "diwali-tealight-mix-pack6",
    name: "Floral Tealight Candles — Pack of 10",
    price: 199,
    image: "/images/diwali-hampers/tealight-set.webp",
    category: "Diwali Specials",
    notes: "Assorted Floral Tealight Jars in Gift Box",
    badge: "Pack of 6",
    group: "candle-sets",
  },

  // ── 4. Premium scented jar set (Diwali exclusive) ──
  {
    id: "hamper-diwali-scented-jars",
    name: "Premium Scented Glass Jar Candles — Set of 6",
    price: 599,
    image: "/images/diwali-hampers/scented-candles-jar.webp",
    category: "Diwali Specials",
    notes: "Rose | Lavender | Strawberry | Jasmine | Vanilla | Orange — 30 ml each",
    badge: "Diwali Exclusive",
    group: "candle-sets",
  },
];

const FILTERS = [
  { key: "all", label: "All Diwali" },
  { key: "hampers", label: "Hampers" },
  { key: "candle-sets", label: "Candle Sets" },
] as const;

export function DiwaliGiftHampers() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");

  const items = useMemo(
    () => (filter === "all" ? DIWALI_HAMPERS : DIWALI_HAMPERS.filter((h) => h.group === filter)),
    [filter]
  );

  return (
    <section className="py-24">
      <div className="text-center mb-10">
        <p className="font-poppins text-[11px] uppercase tracking-[0.2em] text-[#C8A66A] mb-3">
          Festive Collection
        </p>
        <h2 className="font-playfair text-4xl font-semibold text-[#E8E0D8]">Diwali Gift Hampers</h2>
        <div className="flex justify-center items-center gap-3 mt-4">
          <div className="h-px w-10 bg-[#C8A66A]/40" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#C8A66A]" />
          <div className="h-px w-10 bg-[#C8A66A]/40" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`font-poppins text-[10px] sm:text-[11px] uppercase tracking-widest px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border transition-colors ${
              filter === f.key
                ? "bg-[#C8A66A] border-[#C8A66A] text-[#141210] font-semibold"
                : "border-[#C8A66A]/40 text-[#E8E0D8]/75 hover:border-[#C8A66A] hover:text-[#C8A66A]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3.5 sm:gap-6">
        {items.map((h) => (
          <ProductCard
            key={h.id}
            id={h.id}
            name={h.name}
            price={h.price}
            image={h.image}
            category={h.category}
            notes={h.notes}
            badge={h.badge}
          />
        ))}
      </div>
    </section>
  );
}
