"use client";

import Image from "next/image";

// Unique items covering candles, bouquet, chocolates, soaps, and gift hampers
const column1 = [
  "/images/flower-bouquet.png",
  "/images/yellow-flower-bouquet.png",
  "/images/sunflower-jar-candle.png",
  "/images/soap-daisy.png",
];

const column2 = [
  "/images/gift-hamper.png",
  "/images/rose-peony-box.png", // Encoded space to prevent missing image breaks
  "/images/gift-hampers.png",
  "/images/pink-floral-bouquet.png",
];

export function AnimatedHeroGrid() {
  return (
    <div className="relative w-full h-[500px] md:h-full overflow-hidden bg-[#141210] flex gap-4 p-4 rounded-lg">
      {/* Top & Bottom gradient fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-[#141210] z-10 pointer-events-none" />

      {/* Column 1 - Moving Up */}
      <div className="w-1/2 flex flex-col gap-4 animate-scroll-up">
        {[...column1, ...column1].map((imgSrc, idx) => (
          <div
            key={`col1-${idx}`}
            className="relative h-64 w-full flex-shrink-0 rounded-xl overflow-hidden border border-[#C8A66A]/20 shadow-lg bg-[#1C1916]"
          >
            <Image
              src={imgSrc}
              alt="Warm Wishes product preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>

      {/* Column 2 - Moving Down */}
      <div className="w-1/2 flex flex-col gap-4 animate-scroll-down">
        {[...column2, ...column2].map((imgSrc, idx) => (
          <div
            key={`col2-${idx}`}
            className="relative h-64 w-full flex-shrink-0 rounded-xl overflow-hidden border border-[#C8A66A]/20 shadow-lg bg-[#1C1916]"
          >
            <Image
              src={imgSrc}
              alt="Warm Wishes product preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}