"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, Heart, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore, useWishlistStore, MAX_CART_QTY } from "@/lib/store";

interface ProductQuickViewProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
  notes?: string;
  whatsappNumber?: string;
  onClose: () => void;
}

export function ProductQuickView({
  id,
  name,
  price,
  image,
  category,
  badge,
  notes,
  whatsappNumber = "919073620812",
  onClose,
}: ProductQuickViewProps) {
  const { items, addItem, updateQuantity, removeItem } = useCartStore();
  const { addItem: wishlistAdd, removeItem: wishlistRemove, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(id);
  const cartItem = items.find((i) => i.id === id);
  const qty = cartItem?.quantity ?? 0;
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleAddToCart = () => addItem({ id, name, price, image, category, quantity: 1 });
  const handleIncrease = () => { if (qty < MAX_CART_QTY) updateQuantity(id, qty + 1); };
  const handleDecrease = () => { if (qty === 1) removeItem(id); else updateQuantity(id, qty - 1); };
  const handleWishlist = () => { if (wishlisted) wishlistRemove(id); else wishlistAdd({ id, name, price, image, category }); };

  const waMessage = encodeURIComponent(
    `Hi! I'd like to order:\n*${name}* (${category})\nPrice: ₹${price}\n\nPlease confirm availability.`
  );
  const waUrl = `https://wa.me/${whatsappNumber}?text=${waMessage}`;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6"
      style={{ animation: "qv-fade-in 0.2s ease forwards" }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <div
        className="relative z-10 bg-[#1C1916] rounded-2xl sm:rounded-3xl overflow-hidden w-full max-w-3xl shadow-2xl shadow-black/60 border border-[#C8A66A]/15"
        style={{ animation: "qv-slide-up 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-[#141210]/80 backdrop-blur rounded-full flex items-center justify-center border border-[#C8A66A]/20 hover:border-[#C8A66A]/50 hover:bg-[#C8A66A]/10 transition-all"
          aria-label="Close"
        >
          <X size={16} className="text-[#E8E0D8]" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="relative aspect-square sm:aspect-auto sm:min-h-[420px] bg-[#141210] overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
              priority
            />
            {badge && (
              <span className="absolute top-4 left-4 bg-[#C8A66A] text-[#141210] font-poppins text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-bold">
                {badge}
              </span>
            )}
            <button
              onClick={handleWishlist}
              className="absolute top-4 right-4 w-9 h-9 bg-[#1C1916]/80 backdrop-blur rounded-full flex items-center justify-center shadow border border-[#C8A66A]/20 hover:bg-[#2A1F1F] transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={16} className={wishlisted ? "fill-rose-500 stroke-rose-500" : "stroke-[#E8E0D8]/80"} />
            </button>
          </div>

          <div className="flex flex-col justify-between p-7 sm:p-8">
            <div>
              <p className="font-poppins text-[10px] uppercase tracking-[0.2em] text-[#C8A66A] mb-2">{category}</p>
              <h2 className="font-playfair text-2xl sm:text-3xl font-semibold text-[#E8E0D8] leading-tight mb-3">{name}</h2>

              {notes && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {notes.split("|").map((n) => (
                    <span key={n} className="font-poppins text-[10px] uppercase tracking-wider text-[#C8A66A]/80 bg-[#C8A66A]/5 border border-[#C8A66A]/20 px-2.5 py-1 rounded-full">
                      {n.trim()}
                    </span>
                  ))}
                </div>
              )}

              <div className="h-px bg-[#C8A66A]/15 my-5" />

              <p className="font-playfair text-4xl font-semibold text-[#E8E0D8] mb-6">₹{price}</p>
            </div>

            <div className="flex flex-col gap-3">
              {qty === 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 font-poppins text-[11px] uppercase tracking-wider font-semibold py-3.5 rounded-xl border border-[#C8A66A]/50 text-[#E8E0D8] hover:bg-[#C8A66A] hover:border-[#C8A66A] hover:text-[#141210] transition-all duration-300"
                >
                  <ShoppingBag size={14} />
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center rounded-xl overflow-hidden border border-[#C8A66A]/50 bg-[#141210] h-12">
                  <button onClick={handleDecrease} className="flex items-center justify-center w-12 h-full text-[#C8A66A] hover:bg-[#C8A66A]/10 transition-colors shrink-0" aria-label="Decrease">
                    {qty === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                  </button>
                  <div className="flex-1 flex items-center justify-center h-full border-x border-[#C8A66A]/20">
                    <span className="font-poppins font-semibold text-sm text-[#E8E0D8]">{qty}</span>
                  </div>
                  <button onClick={handleIncrease} disabled={qty >= MAX_CART_QTY} className="flex items-center justify-center w-12 h-full text-[#C8A66A] hover:bg-[#C8A66A]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0" aria-label="Increase">
                    <Plus size={14} />
                  </button>
                </div>
              )}

              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 font-poppins text-[11px] uppercase tracking-wider font-semibold py-3.5 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white border border-[#25D366]/20 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes qv-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes qv-slide-up {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
