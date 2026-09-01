"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlistStore, useCartStore } from "@/lib/store";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore((s) => s.addItem);

  const handleMoveToCart = (item: typeof items[0]) => {
    addToCart({ ...item, quantity: 1 });
    removeItem(item.id);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 bg-[#141210] px-6">
        <Heart size={64} className="text-[#C8A66A]/40" />
        <h2 className="font-playfair text-4xl font-semibold text-[#E8E0D8]">Your wishlist is empty</h2>
        <p className="font-poppins text-sm text-[#E8E0D8]/60">Save items you love to find them later.</p>
        <Link href="/collections" className="bg-[#C8A66A] text-[#141210] font-poppins text-xs uppercase tracking-widest px-8 py-4 rounded-md hover:bg-[#b8935a] transition-colors font-medium">
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#141210] min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="font-playfair text-4xl font-semibold text-[#E8E0D8] mb-2">Your Wishlist</h1>
        <p className="font-poppins text-sm text-[#E8E0D8]/60 mb-10">{items.length} item{items.length !== 1 ? "s" : ""} saved</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-[#1C1916] rounded-2xl overflow-hidden shadow-sm border border-[#C8A66A]/20 flex flex-col hover:shadow-black/40 hover:border-[#C8A66A]/40 transition-all">
              <div className="relative aspect-square bg-[#141210]">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-3 right-3 w-9 h-9 bg-[#1C1916]/80 backdrop-blur rounded-full flex items-center justify-center shadow-sm hover:bg-[#2A1F1F] transition-colors border border-rose-500/20 group"
                >
                  <Trash2 size={14} className="text-rose-400 group-hover:text-rose-500" />
                </button>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="font-poppins text-[10px] uppercase tracking-widest text-[#C8A66A] mb-1">{item.category}</p>
                <h3 className="font-playfair text-lg font-semibold text-[#E8E0D8] mb-1">{item.name}</h3>
                <p className="font-playfair text-xl font-semibold text-[#E8E0D8] mt-auto mb-4">₹{item.price}</p>
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="w-full flex items-center justify-center gap-2 bg-[#C8A66A] hover:bg-[#b8935a] text-[#141210] font-poppins text-[11px] uppercase tracking-widest font-bold py-3 rounded-lg transition-colors"
                >
                  <ShoppingBag size={14} /> Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
