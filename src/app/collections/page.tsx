"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, CheckCircle } from "lucide-react";

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  comment?: string;
  date?: string;
}

const COLLECTIONS = [
  {
    title: "Scented Candles",
    desc: "Hand-poured with premium fragrances to light up your space.",
    link: "/collections/scented-candles",
    image: "/images/hero-scented-candles.png",
    bg: "bg-[#1E1B2A]",
  },
  {
    title: "Handmade Chocolates",
    desc: "Artisan chocolates crafted with the finest ingredients.",
    link: "/collections/handmade-chocolates",
    image: "/images/choco-new.png",
    bg: "bg-[#252018]",
  },
  {
    title: "Handmade Soaps",
    desc: "Natural, gentle & nourishing for beautiful skin.",
    link: "/collections/handmade-soaps",
    image: "/images/soap-daisy.png",
    bg: "bg-[#1A201A]",
  },
  {
    title: "Gift Hampers",
    desc: "Curated hampers for every celebration and occasion.",
    link: "/collections/gift-hampers",
    image: "/images/gift-hampers.png",
    bg: "bg-[#2A1F1F]",
  },
];

const INITIAL_REVIEWS: Review[] = [
  { id: "1", name: "Priya M.", text: "Absolutely stunning packaging and the candles smell divine. Gifted to my mother and she was over the moon!", rating: 5, date: "Aug 28, 2026" },
  { id: "2", name: "Rahul S.", text: "The chocolates were SO good — melt in your mouth quality. Already ordered again for a wedding.", rating: 5, date: "Aug 26, 2026" },
  { id: "3", name: "Ananya K.", text: "The soaps are just beautiful. Natural, fragrant and last forever. Best gifting brand in India!", rating: 5, date: "Aug 20, 2026" },
];

export default function CollectionsPage() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [newName, setNewName] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Load persistent reviews
  useEffect(() => {
    // 1. Instant optimistic load from localStorage
    try {
      const saved = localStorage.getItem("warm_wishes_reviews");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }

    // 2. Fetch latest reviews from server API
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setReviews(data);
          localStorage.setItem("warm_wishes_reviews", JSON.stringify(data));
        }
      })
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim() || submitting) return;

    setSubmitting(true);
    const newReviewItem: Review = {
      id: Date.now().toString(),
      name: newName.trim(),
      rating: newRating,
      text: newText.trim(),
      comment: newText.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    const updated = [newReviewItem, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem("warm_wishes_reviews", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReviewItem),
      });
    } catch (err) {
      console.error("Failed to post review to API:", err);
    }

    setNewName("");
    setNewText("");
    setNewRating(5);
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="bg-[#141210] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16 space-y-4">
          <p className="font-poppins text-[11px] uppercase tracking-[0.2em] text-[#C8A66A]">Explore</p>
          <h1 className="font-playfair text-5xl font-semibold text-[#E8E0D8]">Our Collections</h1>
          <div className="flex justify-center items-center gap-3">
            <div className="h-px w-10 bg-[#C8A66A]/40" /><div className="w-1.5 h-1.5 rotate-45 bg-[#C8A66A]" /><div className="h-px w-10 bg-[#C8A66A]/40" />
          </div>
          <p className="font-poppins text-[#E8E0D8]/70 max-w-lg mx-auto">
            Explore our handcrafted collections, made with the finest ingredients and lots of love.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3.5 sm:gap-8 mb-24">
          {COLLECTIONS.map((cat, i) => (
            <Link
              href={cat.link}
              key={i}
              className={`group relative overflow-hidden rounded-2xl border border-[#C8A66A]/10 shadow-sm hover:shadow-2xl hover:shadow-black/40 transition-all duration-500 ${cat.bg} flex flex-col`}
            >
              <div className="relative h-44 sm:h-72 w-full overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-3.5 sm:p-8 flex flex-col gap-1.5 sm:gap-3 text-[#E8E0D8] flex-grow justify-between">
                <div>
                  <h2 className="font-playfair text-base sm:text-2xl md:text-3xl font-semibold uppercase tracking-wide leading-tight mb-1 sm:mb-2">{cat.title}</h2>
                  <p className="font-poppins text-xs sm:text-sm leading-relaxed text-[#E8E0D8]/70 line-clamp-3">{cat.desc}</p>
                </div>
                <span className="self-start mt-2 font-poppins text-[9px] sm:text-[10px] uppercase tracking-widest border px-3 py-1 sm:px-5 sm:py-2 rounded-full group-hover:bg-[#C8A66A] group-hover:border-[#C8A66A] group-hover:text-[#141210] transition-colors border-[#C8A66A]/50 text-[#E8E0D8]">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* ── CUSTOMER REVIEWS & FORM ─────────────────────── */}
        <section className="pt-12 border-t border-[#C8A66A]/20">
          <div className="text-center mb-12 space-y-3">
            <p className="font-poppins text-[11px] uppercase tracking-[0.2em] text-[#C8A66A]">Testimonials</p>
            <h2 className="font-playfair text-4xl font-semibold text-[#E8E0D8]">Loved By Many</h2>
            <div className="flex justify-center items-center gap-3">
              <div className="h-px w-10 bg-[#C8A66A]/40" /><div className="w-1.5 h-1.5 rotate-45 bg-[#C8A66A]" /><div className="h-px w-10 bg-[#C8A66A]/40" />
            </div>
          </div>

          {/* Submission Form */}
          <form onSubmit={handleReviewSubmit} className="mb-14 p-8 bg-[#1C1916] rounded-2xl border border-[#C8A66A]/30 max-w-xl mx-auto space-y-4 shadow-xl">
            <h3 className="font-playfair text-2xl font-semibold text-[#E8E0D8]">Leave a Review</h3>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C8A66A] mb-2 font-poppins">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    className="text-2xl transition-transform hover:scale-110"
                  >
                    <Star size={20} className={star <= newRating ? "fill-[#C8A66A] stroke-[#C8A66A]" : "stroke-gray-600"} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C8A66A] mb-1 font-poppins">Your Name</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Priya M."
                className="w-full bg-[#141210] border border-[#C8A66A]/20 text-[#E8E0D8] font-poppins text-sm px-4 py-3 rounded-md focus:outline-none focus:border-[#C8A66A]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C8A66A] mb-1 font-poppins">Your Review</label>
              <textarea
                required
                rows={4}
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Share your experience with our products..."
                className="w-full bg-[#141210] border border-[#C8A66A]/20 text-[#E8E0D8] font-poppins text-sm px-4 py-3 rounded-md focus:outline-none focus:border-[#C8A66A]"
              />
            </div>

            {submitted && (
              <div className="flex items-center gap-2 p-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] rounded-md font-poppins text-xs">
                <CheckCircle size={16} />
                <span>Thank you! Your review has been saved permanently.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#C8A66A] hover:bg-[#b8935a] disabled:opacity-50 text-[#141210] font-poppins text-xs uppercase tracking-widest py-3.5 rounded-md font-semibold transition-colors cursor-pointer"
            >
              {submitting ? "Saving Review..." : "Submit Review"}
            </button>
          </form>

          {/* Review List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id || review.name} className="bg-[#1C1916] rounded-2xl p-8 shadow-sm border border-[#C8A66A]/10 hover:border-[#C8A66A]/25 transition-colors">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-[#C8A66A] stroke-[#C8A66A]" />
                  ))}
                </div>
                <p className="font-poppins text-sm text-[#E8E0D8]/70 leading-relaxed mb-6 italic">&quot;{review.text}&quot;</p>
                <p className="font-cormorant font-semibold text-lg text-[#E8E0D8]">— {review.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}