import Image from "next/image";
import { ReactNode } from "react";

interface CollectionHeroProps {
  title: ReactNode;
  desc: string;
  image: string;
  imageAlt: string;
  bullets: string[];
  imageLeft?: boolean;
}

export function CollectionHero({ title, desc, image, imageAlt, bullets, imageLeft = false }: CollectionHeroProps) {
  const imgPanel = (
    <div className="relative min-h-[400px]">
      <Image src={image} alt={imageAlt} fill className="object-cover" />
      
    </div>
  );
  const textPanel = (
    <div className="flex flex-col justify-center p-12 md:p-20 bg-[#1C1916]">
      <p className="font-poppins text-[11px] uppercase tracking-[0.2em] text-[#C8A66A] mb-4">Collection</p>
      <h1 className="font-playfair text-5xl md:text-6xl font-semibold text-[#E8E0D8] leading-tight mb-6">{title}</h1>
      <p className="font-poppins text-[#E8E0D8]/80 max-w-md leading-relaxed mb-8">{desc}</p>
      <div className="flex flex-wrap gap-6 text-sm font-poppins text-[#E8E0D8]/70">
        {bullets.map((b) => (
          <span key={b} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#C8A66A] rounded-full" />
            {b}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
      {imageLeft ? <>{imgPanel}{textPanel}</> : <>{textPanel}{imgPanel}</>}
    </section>
  );
}