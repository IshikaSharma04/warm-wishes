"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { AnimatedHeroGrid } from "@/components/hero/AnimatedHeroGrid";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const BESTSELLERS = [
  { id: "candle-1", name: "Golden Bloom Flower Bouquet", price: 999, image: "/images/flower-bouquet.png", category: "Scented Candles", notes: "Floral | Jasmine | Sandalwood", badge: "Bestseller" },
  { id: "choc-1", name: "Assorted Truffles", price: 399, image: "/images/chocolates/chocolate-6-box.png", category: "Handmade Chocolates", notes: "Dark | Silky | Premium", badge: "Bestseller" },
  { id: "soap-1", name: "Single Bubble Candle", price: 279, image: "/images/pink-bubble-gold-leaf.png", category: "Handmade Soaps", notes: "Soothing | Floral | Calming" },
  { id: "candle-4", name: "Sunflower Garden Jar Candle", price: 299, image: "/images/sunflower-jar-candle.png", category: "Scented Candles", notes: "Bright | Citrus | Sunflower", badge: "New" },
];
const REVIEWS = [
  { name: "Priya M.", text: "Absolutely stunning packaging and the candles smell divine. Gifted to my mother and she was over the moon!", rating: 5 },
  { name: "Rahul S.", text: "The chocolates were SO good — melt in your mouth quality. Already ordered again for a wedding.", rating: 5 },
  { name: "Ananya K.", text: "The soaps are just beautiful. Natural, fragrant and last forever. Best gifting brand in India!", rating: 5 },
];

const CATEGORIES = [
  { title: "Scented Candles", desc: "Hand-poured with premium fragrances", link: "/collections/scented-candles", image: "/images/gel-jar candle1.png" },
  { title: "Handmade Chocolates", desc: "Artisan chocolates with finest ingredients", link: "/collections/handmade-chocolates", image: "/images/choco-new.png" },
  { title: "Handmade Soaps", desc: "Natural, gentle & nourishing for beautiful skin", link: "/collections/handmade-soaps", image: "/images/soap-daisy.png" },
  { title: "Gift Hampers", desc: "Curated for every celebration & occasion", link: "/collections/gift-hampers", image: "/images/gift-hamper.png" },
];

const WHY_US = [
  { icon: "✋", title: "Handmade With Love", desc: "Every product is lovingly handcrafted" },
  { icon: "⭐", title: "Premium Quality", desc: "Only the finest ingredients used" },
  { icon: "🎁", title: "Luxury Packaging", desc: "Gift-ready presentation every time" },
  { icon: "💝", title: "Perfect For Every Occasion", desc: "From birthdays to weddings & more" },
];

const INSTA_POSTS = [
  { img: "/images/diwali-999.png", alt: "Diwali Hamper" },
  { img: "/images/valentine-599.png", alt: "Valentine Gift Hamper" },
  { img: "/images/flower-bouquet.png", alt: "Bouquet Candle" },
  { img: "/images/ganesh-599.png", alt: "Ganesh Chaturthi Hamper" },
  { img: "/images/chocolates/chocolate-6-box.png", alt: "Handmade Chocolates" },
  { img: "/images/pink-bubble-gold-leaf.png", alt: "Bubble Candle" },
];

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center mb-16">
      <p className="font-poppins text-[11px] uppercase tracking-[0.2em] text-[#C8A66A] mb-3">{eyebrow}</p>
      <h2 className="font-playfair text-4xl font-semibold text-[#E8E0D8] mb-3">{title}</h2>
      <div className="flex justify-center items-center gap-3">
        <div className="h-px w-10 bg-[#C8A66A]/40" /><div className="w-1.5 h-1.5 rotate-45 bg-[#C8A66A]" /><div className="h-px w-10 bg-[#C8A66A]/40" />
      </div>
    </div>
  );
}

export default function HomePage() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [reviews, setReviews] = useState(REVIEWS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("warm_wishes_reviews");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews(parsed.slice(0, 3));
        }
      }
    } catch (e) {
      console.error(e);
    }

    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setReviews(data.slice(0, 3));
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-col">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] bg-[#141210] flex flex-col justify-center">
        <div className="max-w-[1500px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[85vh] items-center">
          
          {/* Left Side: Content Panel */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-16 order-2 lg:order-1 z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#C8A66A]/60" />
              <p className="font-poppins text-xs uppercase tracking-[0.3em] text-[#C8A66A] font-semibold">
                Luxury Gifting Studio
              </p>
            </div>

            <h1 className="font-playfair text-5xl sm:text-6xl xl:text-7xl font-semibold leading-[1.08] text-[#E8E0D8] mb-8 tracking-tight">
              Handcrafted <br />
              Gifts Made <br />
              <span className="italic font-normal text-[#C8A66A]">With Love</span>
            </h1>

            <p className="font-poppins text-base sm:text-lg text-[#E8E0D8]/75 max-w-xl leading-relaxed mb-12 font-light">
              Thoughtfully crafted candles, chocolates, and handmade soaps designed to turn everyday moments into memorable gifting experiences.
            </p>

            <div className="flex items-center">
              <Link 
                href="/collections" 
                className="inline-flex items-center justify-center gap-3 bg-[#C8A66A] hover:bg-[#b8935a] text-[#141210] font-poppins font-semibold px-9 py-4 rounded-md tracking-widest uppercase text-xs transition-all shadow-xl shadow-[#C8A66A]/10 hover:shadow-[#C8A66A]/20"
              >
                Shop Collection <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Right Side: Animated Cards */}
          <div className="lg:col-span-6 xl:col-span-5 h-[550px] lg:h-[82vh] order-1 lg:order-2 p-2 lg:p-6">
            <AnimatedHeroGrid />
          </div>

        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────── */}
      <section className="py-20 bg-[#1C1916]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {WHY_US.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 rounded-xl">
              <span className="text-3xl mb-4">{item.icon}</span>
              <h3 className="font-playfair font-semibold text-lg text-[#E8E0D8] mb-2">{item.title}</h3>
              <p className="font-poppins text-xs text-[#E8E0D8]/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────── */}
      <section className="py-24 bg-[#141210]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader eyebrow="Our Offerings" title="Shop By Category" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.title}
                href={cat.link}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] flex flex-col justify-end p-8 border border-[#C8A66A]/10 hover:border-[#C8A66A]/30 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-black/40"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-75 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/40 to-transparent" />
                <div className="relative z-10">
                  <h3 className="font-playfair text-2xl font-semibold text-[#E8E0D8] mb-1">{cat.title}</h3>
                  <p className="font-poppins text-xs text-[#E8E0D8]/60 mb-4">{cat.desc}</p>
                  <span className="font-poppins text-[10px] uppercase tracking-widest text-[#C8A66A] flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS ─────────────────────────────────── */}
      <section className="py-24 bg-[#1C1916]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader eyebrow="Loved By All" title="Best Sellers" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {BESTSELLERS.map((p) => <ProductCard key={p.id} {...p} />)}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL BANNER ─────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[50vh] flex items-center">
        <Image src="/images/gift-hampers.png" alt="Gift with love" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#141210]/75" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <p className="font-poppins text-[11px] uppercase tracking-[0.25em] text-[#C8A66A] mb-4">Handcrafted In India</p>
          <h2 className="font-playfair text-4xl md:text-6xl font-semibold text-white mb-6">Made With Love,<br/>For Every Occasion</h2>
          <p className="font-poppins text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
            From birthdays to anniversaries, from festive hampers to little everyday surprises — we help you make every moment special.
          </p>
          <Link href="/collections/gift-hampers" className="inline-flex items-center gap-2 bg-[#C8A66A] hover:bg-[#b8935a] text-[#141210] font-poppins font-semibold px-10 py-4 rounded-md tracking-widest uppercase text-xs transition-colors shadow-lg shadow-[#C8A66A]/20">
            Explore Gift Hampers <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── CUSTOMER REVIEWS ─────────────────────────────── */}
      <section className="py-24 bg-[#141210]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader eyebrow="Testimonials" title="Loved By Many" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-[#1C1916] rounded-2xl p-8 shadow-sm border border-[#C8A66A]/10 hover:border-[#C8A66A]/25 transition-colors">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-[#C8A66A] stroke-[#C8A66A]" />
                  ))}
                </div>
                <p className="font-poppins text-sm text-[#E8E0D8]/70 leading-relaxed mb-6 italic">&quot;{review.text || (review as any).comment}&quot;</p>
                <p className="font-cormorant font-semibold text-lg text-[#E8E0D8]">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM FOLLOW SECTION ──────────────────────── */}
      <section className="py-20 bg-[#1C1916] border-t border-[#C8A66A]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C8A66A]/10 border border-[#C8A66A]/30 text-[#C8A66A] text-xs font-poppins uppercase tracking-widest mb-4">
              <InstagramIcon size={14} />
              <span>@warm__wishes</span>
            </div>
            <h2 className="font-playfair text-4xl sm:text-5xl font-semibold text-[#E8E0D8] mb-4">
              Follow Us on Instagram
            </h2>
            <p className="font-poppins text-sm text-[#E8E0D8]/70 leading-relaxed max-w-lg mx-auto mb-8">
              Join our community for daily behind-the-scenes craft, new festive drops, styling inspiration & exclusive giveaways.
            </p>

            {/* Direct Follow Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://instagram.com/warm__wishes"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsFollowing(true)}
                className={`inline-flex items-center justify-center gap-3 font-poppins text-xs uppercase tracking-widest font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg ${
                  isFollowing
                    ? "bg-[#25D366] text-[#141210] shadow-[#25D366]/20"
                    : "bg-[#C8A66A] hover:bg-[#b8935a] text-[#141210] shadow-[#C8A66A]/20"
                }`}
              >
                <InstagramIcon size={16} />
                {isFollowing ? "Following @warm__wishes ✓" : "Follow @warm__wishes"}
              </a>
              <a
                href="https://instagram.com/warm__wishes"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 text-xs font-poppins tracking-wider text-[#E8E0D8]/70 hover:text-[#C8A66A] transition-colors py-2 px-4"
              >
                View Profile <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Instagram Post Showcase Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {INSTA_POSTS.map((post, idx) => (
              <a
                key={idx}
                href="https://instagram.com/warm__wishes"
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-square rounded-xl overflow-hidden border border-[#C8A66A]/15 bg-[#141210]"
              >
                <Image
                  src={post.img}
                  alt={post.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#141210]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1.5 text-[#E8E0D8] p-2 text-center">
                  <InstagramIcon size={20} />
                  <span className="font-poppins text-[10px] uppercase tracking-wider text-[#C8A66A]">Follow</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}