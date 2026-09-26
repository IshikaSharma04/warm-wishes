"use client";

import Image from "next/image";
import { CollectionHero } from "@/components/product/CollectionHero";
import { FeatureGrid } from "@/components/product/FeatureGrid";
import { DiwaliGiftHampers } from "@/components/product/DiwaliGiftHampers";

const FEATURES = [
  { icon: "🪔", label: "Hand-Painted Diyas" },
  { icon: "✨", label: "Luxury Festive Packaging" },
  { icon: "💌", label: "Free Personalised Note" },
  { icon: "🚚", label: "Safe Express Delivery" },
];

export default function DiwaliGiftHampersPage() {
  return (
    <div className="bg-[#141210] min-h-screen text-[#E8E0D8]">
      <CollectionHero
        title={<>Diwali Gift<br />Hampers</>}
        desc="Light up this Diwali with handcrafted hampers — painted diyas, motichoor ladoo candles, daisy candle bouquets and premium scented glass jars, all wrapped in festive luxury packaging."
        image="/images/diwali-hampers/diwali-999.webp"
        imageAlt="Diwali Gift Hampers"
        bullets={["Hand-Painted Diyas", "Motichoor Ladoo Candles", "Scented Jar Sets"]}
        imageLeft={false}
      />

      <div className="max-w-7xl mx-auto px-6">
        <DiwaliGiftHampers />

        <FeatureGrid features={FEATURES} />

        {/* Bulk / Corporate Order CTA */}
        <div className="mt-20 mb-24 bg-[#1C1916] rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#C8A66A]/20 shadow-lg shadow-black/20 overflow-hidden relative">
          <Image
            src="/images/diwali-hampers/ladoo-tealight-combo.webp"
            alt="Festive Diwali candle hamper"
            fill
            sizes="100vw"
            className="object-cover opacity-10"
          />
          <div className="relative z-10">
            <h3 className="font-playfair text-3xl font-semibold text-[#E8E0D8] mb-2">Bulk & Corporate Diwali Orders</h3>
            <p className="font-poppins text-sm text-[#E8E0D8]/70 max-w-md">
              Ordering 25+ hampers for your team, clients or family? We customise packaging, notes and quantities just for you.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href="https://wa.me/919073620812?text=Hi%2C%20I%20want%20to%20place%20a%20bulk%20Diwali%20hamper%20order!"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366]/10 text-[#25D366] font-poppins text-xs uppercase tracking-widest px-8 py-4 rounded-md transition-colors hover:bg-[#25D366] hover:text-[#141210] border border-[#25D366]/30 font-bold"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
