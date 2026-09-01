"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { CollectionHero } from "@/components/product/CollectionHero";
import { FeatureGrid } from "@/components/product/FeatureGrid";

const CANDLES = [
  // --- 1. FLOWER BOUQUETS ---
  { 
    id: "candle-1", 
    name: "Golden Petal Atelier Bouquet", 
    price: 999, 
    image: "/images/flower-bouquet.png", 
    notes: "Blooming Jasmine | Velvet Rose | Warm Sandalwood",
    badge: "Bestseller" 
  },
  { 
    id: "candle-2", 
    name: "Sunlit Mimosa Bouquet Candle", 
    notes: "Yellow Dahlia | Citrus Blossom | Sweet Nectar",
    price: 999, 
    badge: "Limited Edition",
    image: "/images/yellow-flower-bouquet.png", 
  },
  { 
    id: "candle-3", 
    name: "Velvet Violet Botanical Keepsake", 
    price: 999, 
    image: "/images/purple-floral-box.png", 
    notes: "French Lavender | Wild Orchid | Purple Peony",
    badge: "Luxury Box",
  },
  { 
    id: "candle-4", 
    name: "Blossom Romance Gift Box", 
    price: 999, 
    image: "/images/pink-floral-bouquet.png", 
    notes: "White Peony | Pink Rose | Soft Musk",
    badge: "Luxury Box"
  },

  // --- 2. URLI CANDLES ---
  { 
    id: "candle-5", 
    name: "Imperial Brass Saffron Urli", 
    price: 249, 
    image: "/images/urli.png", 
    notes: "Sacred Marigold | Saffron Threads | Royal Oud",
    badge: "Heritage",
  },
  { 
    id: "candle-6", 
    name: "Pearl Blossom Urli", 
    price: 249, 
    image: "/images/pearl-blossom-urli.png", 
    notes: "Cherry Blossom | White Tea | Frosted Musk",
  },

  // --- 3. GEL CANDLES ---
  { 
    id: "candle-7", 
    name: "Ethereal Glitter Rose Gel Glass", 
    price: 299, 
    image: "/images/gel-jar candle1.png", 
    notes: "Aesthetic | Fresh | Elegant" 
  },
  { 
    id: "candle-8", 
    name: "Crystal Pearl Infusion Gel Glass", 
    price: 299, 
    image: "/images/glass-pearl-candle.png", 
    notes: "Aesthetic | Ocean Air | Fresh Glass" 
  },
  { 
    id: "candle-9", 
    name: "Ocean Blue Daisy Gel Glass", 
    price: 299, 
    image: "/images/blue-gel-daisy.png", 
    notes: "Ocean Breeze | Fresh Air | Water Lily",
    badge: "New"
  },

  // --- 4. WAX SACHETS ---
  { 
    id: "candle-10", 
    name: "Hanging Floral Wax Sachets combo of 3", 
    price: 420, 
    image: "/images/floral-sachets.png", 
    notes: "Aromatic Lavender | Fresh Linen",
    badge: "Aroma"
  },
  { 
    id: "candle-11", 
    name: "Orange Floral pearl Wax Sachet", 
    price: 149, 
    image: "/images/orange-floral-sachet.png", 
    notes: "Citrus Blossom | Bright Amber" 
  },
  { 
    id: "candle-12", 
    name: "Daisy Pearl Wax Sachet", 
    price: 149, 
    image: "/images/daisy-pearl-sachet.png", 
    notes: "Fresh Daisy | Clean Linen" 
  },

  // --- 5. GIFT BOXES & SETS ---
  { 
    id: "candle-13", 
    name: "Daisy Gift Box (pack of 4)", 
    price: 249, 
    image: "/images/daisy-gift-set.png", 
    notes: "Fresh Daisy | Citrus | Wildflower" 
  },
  { 
    id: "candle-14", 
    name: "Elegant Peony pack of 4", 
    price: 499, 
    image: "/images/rose-peony-box.png", 
    notes: "Rich Rose | Peony | Soft Vanilla", 
    badge: "Gift Box" 
  },
  { 
    id: "candle-15", 
    name: "Motichoor & Modak Candle Set", 
    price: 299, 
    image: "/images/modak-motichoor.png", 
    notes: "Festive | Sweet Cardamom | Saffron" 
  },
  { 
    id: "candle-16", 
    name: "Motichoor Laddoo Candle", 
    price: 299, 
    image: "/images/ladoo-candle.png", 
    notes: "Festive | Sweet Cardamom | Saffron" 
  },

  // --- 6. SCULPTURAL, BUBBLES & TEDDIES ---
  { 
    id: "candle-17", 
    name: "Blue Teddy Bear Heart Candle", 
    price: 179, 
    image: "/images/teddy-bear.png", 
    notes: "Cute | Ocean Breeze | Comforting" 
  },
  { 
    id: "candle-18", 
    name: "Single Red Rose Teddy Candle", 
    price: 179, 
    image: "/images/red-rose-teddy.png", 
    notes: "Crimson Rose | Musk | Sweet Amber" 
  },
  { 
    id: "candle-19", 
    name: "Rose Teddy Bear Pair Set", 
    price: 349, 
    image: "/images/rose-teddy-pair.png", 
    notes: "Red Velvet | Soft Cotton | Honey", 
    badge: "Set of 2" 
  },
  { 
    id: "candle-20", 
    name: "Pastel Bubble Cube Candle - pack of 4", 
    price: 299, 
    image: "/images/bubble-candle.png", 
    notes: "Ocean Breeze | Minimalist | Soft Cotton" 
  },
  { 
    id: "candle-21", 
    name: "Single Bubble Candle - large", 
    price: 279, 
    image: "/images/pink-bubble-gold-leaf.png", 
    notes: "Sweet Blossom | Soft Vanilla | Cashmere",
    badge: "Aesthetic"
  },

  // --- 7. SPECIALTY VOTIVES & JARS ---
  { 
    id: "candle-22", 
    name: "Red Heart Embed Glass Candle", 
    price: 249, 
    image: "/images/red-heart-glass-candle.png", 
    notes: "Sweet Vanilla | Red Rose | Strawberry", 
    badge: "Valentine Special" 
  },
  { 
    id: "candle-23", 
    name: "Sunflower Jar Candle", 
    price: 299, 
    image: "/images/sunflower-jar-candle.png", 
    notes: "Bright | Citrus | Sunflower", 
    badge: "New" 
  },
  { 
    id: "candle-24", 
    name: "Tealight Candle - pack of 6", 
    price: 299, 
    image: "/images/tealight-candle.png", 
    notes: "Floral | Warm Vanilla | Creamy" 
  },
  { 
    id: "candle-25", 
    name: "Single Peony Candle", 
    price: 179, 
    image: "/images/peony-single-candle.png", 
    notes: "Sweet Peony | Soft Rose | Blossom",
    badge: "Trending"
  },
  { 
    id: "candle-26", 
    name: "Creamy Vanilla Glass Jar Candle", 
    price: 199, 
    image: "/images/Creamy-Vanilla-Glass-Jar-Candle.png", 
    notes: "Creamy Vanilla | Warm Honey | Soft Amber",
    badge: "Special Edition"
  },
  { 
    id: "candle-27", 
    name: "Glass Jar Candle", 
    price: 349, 
    image: "/images/glass-jar-candle.png", 
    notes: "Soft Rose | Velvet Petals | White Amber",
    badge: "Signature"
  },
];

const FEATURES = [
  { icon: "🕯️", label: "45+ Hours Burn Time" },
  { icon: "✨", label: "Premium Soy Wax" },
  { icon: "🌸", label: "IFRA Certified Fragrance" },
  { icon: "💛", label: "Hand Poured With Love" },
];

export default function ScentedCandlesPage() {
  return (
    <div className="bg-[#141210] min-h-screen">
      <CollectionHero
        title={<>Scented<br/>Candles</>}
        desc="Hand-poured with love and premium fragrances for a soothing, luxurious experience in your space."
        image="/images/hero-scented-candles.png"
        imageAlt="Scented Candles"
        bullets={["45+ Hr Burn Time", "Premium Soy Wax", "IFRA Certified"]}
      />
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-poppins text-[11px] uppercase tracking-[0.2em] text-[#C8A66A] mb-3">Our Signature</p>
          <h2 className="font-playfair text-4xl font-semibold text-[#E8E0D8]">Fragrances</h2>
          <Divider />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
          {CANDLES.map((c) => (
            <ProductCard key={c.id} {...c} category="Scented Candles" />
          ))}
        </div>
        <FeatureGrid features={FEATURES} />
      </section>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex justify-center items-center gap-3 mt-4">
      <div className="h-px w-10 bg-[#C8A66A]/40" />
      <div className="w-1.5 h-1.5 rotate-45 bg-[#C8A66A]" />
      <div className="h-px w-10 bg-[#C8A66A]/40" />
    </div>
  );
}