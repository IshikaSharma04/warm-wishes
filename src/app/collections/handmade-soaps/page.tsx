"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { CollectionHero } from "@/components/product/CollectionHero";
import { FeatureGrid } from "@/components/product/FeatureGrid";

const SOAPS = [
  { id: "soap-1", name: "Pastel Cloud Soap Box- pack of 4", price: 349, image: "/images/soaps/pastel-cloud-box-soap.png", notes: "Soothing | Floral | Calming", badge: "Bestseller" },
  { id: "soap-2", name: "Dino-Mite Bar- Set of 3", price: 299, image: "/images/soaps/dino-mite-bar-soap-set.png", notes: "Romantic | Gentle | Floral" },
  { id: "soap-3", name: "Cute kitty & Fish Set - pack of 4", price: 399, image: "/images/soaps/cute-critters-fish-set.png", notes: "Nourishing | Warm | Natural" },
  { id: "soap-4", name: "Mini Zoo Party Box- set of 6", price: 249, image: "/images/soaps/mini-zoo-party-box.png", notes: "Assorted Animal Shapes | Gentle Moisture" },
  { id: "soap-5", name: "Crystal Rose Embed Glycerin Bar", price:99 , image: "/images/soaps/crystal-rose-embed-bar.png", notes: "Clear Glycerin | Essential Rose Oil | Luxe" },
  { id: "soap-6", name: "Blossom Relief Bar- single", price: 99, image: "/images/soaps/blossom-relief-bar.png", notes: "Purifying | Fresh | Herbal" },
  { id: "soap-7", name: "Golden Grape Cluster soap", price: 349, image: "/images/soaps/grape-soap.png", notes: "Honey Glycerin | Shimmer Spheres | Radiant" },
];

const FEATURES = [
  { icon: "🌿", label: "Natural Ingredients" },
  { icon: "🌸", label: "Gentle On Skin" },
  { icon: "✋", label: "Handcrafted" },
  { icon: "♻️", label: "Eco Friendly" },
];

export default function SoapsPage() {
  return (
    <div className="bg-[#141210] min-h-screen text-[#E8E0D8]">
      <CollectionHero
        title={<>Handmade<br/>Soaps</>}
        desc="Natural ingredients for gentle care and beautiful skin. Made with botanical goodness."
        image="/images/soap-daisy.png"
        imageAlt="Handmade Soaps"
        bullets={["Natural Ingredients", "Gentle On Skin", "Eco Friendly"]}
        imageLeft
      />
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-poppins text-[11px] uppercase tracking-[0.2em] text-[#C8A66A] mb-3">Botanical</p>
          <h2 className="font-playfair text-4xl font-semibold text-[#E8E0D8]">Our Collection</h2>
          <div className="flex justify-center items-center gap-3 mt-4">
            <div className="h-px w-10 bg-[#C8A66A]/40" /><div className="w-1.5 h-1.5 rotate-45 bg-[#C8A66A]" /><div className="h-px w-10 bg-[#C8A66A]/40" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SOAPS.map((s) => <ProductCard key={s.id} {...s} category="Handmade Soaps" />)}
        </div>
        <FeatureGrid features={FEATURES} />
      </section>
    </div>
  );
}
