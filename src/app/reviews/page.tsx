"use client";

import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

interface Review {
  id: string;
  name: string;
  rating: number;
  text?: string;
  comment?: string;
  date: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Load reviews on page mount
  useEffect(() => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim() || submitting) return;

    setSubmitting(true);
    const newReview: Review = {
      id: Date.now().toString(),
      name: name.trim(),
      rating,
      comment: comment.trim(),
      text: comment.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    const updated = [newReview, ...reviews];
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
        body: JSON.stringify(newReview),
      });
    } catch (err) {
      console.error("Failed to save review to API:", err);
    }

    setName("");
    setComment("");
    setRating(5);
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="bg-[#141210] min-h-screen py-20 px-6 text-[#E8E0D8]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-poppins text-[11px] uppercase tracking-[0.2em] text-[#C8A66A] mb-2">
            Customer Feedback
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl font-semibold">
            Reviews & Thoughts
          </h1>
        </div>

        {/* --- ADD REVIEW FORM --- */}
        <div className="bg-[#1C1916] border border-[#C8A66A]/30 p-8 rounded-lg mb-16 shadow-xl">
          <h3 className="font-playfair text-2xl mb-4">Leave a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-poppins text-xs uppercase tracking-wider text-[#C8A66A] mb-2">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-[#141210] border border-[#C8A66A]/20 text-[#E8E0D8] p-3 rounded text-sm focus:outline-none focus:border-[#C8A66A]"
              />
            </div>

            <div>
              <label className="block font-poppins text-xs uppercase tracking-wider text-[#C8A66A] mb-2">
                Rating
              </label>
              <div className="flex gap-2 text-2xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={
                      star <= rating
                        ? "text-[#C8A66A] transition-colors"
                        : "text-[#E8E0D8]/20 transition-colors"
                    }
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-poppins text-xs uppercase tracking-wider text-[#C8A66A] mb-2">
                Your Review
              </label>
              <textarea
                required
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience..."
                className="w-full bg-[#141210] border border-[#C8A66A]/20 text-[#E8E0D8] p-3 rounded text-sm focus:outline-none focus:border-[#C8A66A]"
              />
            </div>

            {submitted && (
              <div className="flex items-center gap-2 p-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] rounded font-poppins text-xs">
                <CheckCircle size={16} />
                <span>Thank you! Your review has been saved permanently.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-[#C8A66A] hover:bg-[#b59357] disabled:opacity-50 text-[#141210] font-poppins text-xs uppercase tracking-widest font-semibold rounded transition-colors duration-300 cursor-pointer"
            >
              {submitting ? "Saving Review..." : "Submit Review"}
            </button>
          </form>
        </div>

        {/* --- DISPLAY REVIEWS LIST --- */}
        <div className="space-y-6">
          <h3 className="font-playfair text-2xl mb-6">
            Recent Reviews ({reviews.length})
          </h3>
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-[#1C1916] border border-[#C8A66A]/10 p-6 rounded"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-playfair font-semibold text-lg">
                  {r.name}
                </h4>
                <span className="text-[#C8A66A]">{"★".repeat(r.rating)}</span>
              </div>
              <p className="font-poppins text-sm text-[#E8E0D8]/80 leading-relaxed mb-3">
                {r.comment || r.text}
              </p>
              <span className="font-poppins text-[10px] text-[#C8A66A]/60 uppercase tracking-widest">
                {r.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}