"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { CollectionHero } from "@/components/product/CollectionHero";
import { FeatureGrid } from "@/components/product/FeatureGrid";

const CHOCOLATES = [
  { id: "choc-1", name: "Velvet Cocoa Truffles", price: 99, image: "/images/chocolates/chocolate-2-box.png", notes: "Rich Dark | Silky Ganache | Artisanal", badge: "Bestseller" },
  { id: "choc-2", name: "Roasted Almond Squares", price: 199, image: "/images/chocolates/chocolate-4-box.png", notes: "Crunchy Nut | Creamy Milk | Indulgent" },
  { id: "choc-3", name: "Golden Hazelnut Rochers", price: 399, image: "/images/chocolates/chocolate-6-box.png", notes: "Edible Gold | Roasted Nut | Luxe Dark" },
  { id: "choc-4", name: "Petite Bonbon Assortment", price: 599, image: "/images/chocolates/chocolate-10-box.png", notes: "Hand-poured | Multi-Flavour | Grand Gift", badge: "New" },
];

const FEATURES = [
  { icon: "✨", label: "Finest Ingredients" },
  { icon: "🌿", label: "No Preservatives" },
  { icon: "💛", label: "Made With Love" },
  { icon: "🎁", label: "Perfect For Gifting" },
];

export default function ChocolatesPage() {
  return (
    <div className="bg-[#141210] min-h-screen text-[#E8E0D8]">
      <CollectionHero
        title={<>Handmade<br/>Chocolates</>}
        desc="Artisan chocolates crafted with the finest ingredients for a rich, indulgent experience."
        image="/images/chocolates.png"
        imageAlt="Handmade Chocolates"
        bullets={["Finest Ingredients", "No Preservatives", "Made With Love"]}
        imageLeft={false}
      />
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-poppins text-[11px] uppercase tracking-[0.2em] text-[#C8A66A] mb-3">Handcrafted</p>
          <h2 className="font-playfair text-4xl font-semibold text-[#E8E0D8]">Our Bestsellers</h2>
          <div className="flex justify-center items-center gap-3 mt-4">
            <div className="h-px w-10 bg-[#C8A66A]/40" /><div className="w-1.5 h-1.5 rotate-45 bg-[#C8A66A]" /><div className="h-px w-10 bg-[#C8A66A]/40" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {CHOCOLATES.map((c) => <ProductCard key={c.id} {...c} category="Handmade Chocolates" />)}
        </div>
        <FeatureGrid features={FEATURES} />
      </section>
    </div>
  );
}
