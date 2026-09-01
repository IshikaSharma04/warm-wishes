"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const subtotal = total();
  const shipping = subtotal > 999 ? 0 : 99;
  const grandTotal = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 bg-[#141210] px-6">
        <ShoppingBag size={64} className="text-[#C8A66A]/40" />
        <h2 className="font-playfair text-4xl font-semibold text-[#E8E0D8]">Your cart is empty</h2>
        <p className="font-poppins text-sm text-[#E8E0D8]/60">Add something beautiful to your cart.</p>
        <Link href="/collections" className="bg-[#C8A66A] text-[#141210] font-poppins text-xs uppercase tracking-widest px-8 py-4 rounded-md hover:bg-[#b8935a] transition-colors font-medium">
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#141210] min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="font-playfair text-4xl font-semibold text-[#E8E0D8] mb-2">Your Cart</h1>
        <div className="flex justify-between items-center mb-10">
          <p className="font-poppins text-sm text-[#E8E0D8]/60">{items.length} item{items.length !== 1 ? "s" : ""}</p>
          <button onClick={clearCart} className="font-poppins text-xs text-[#E8E0D8]/50 hover:text-rose-400 transition-colors uppercase tracking-widest">Clear Cart</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-[#1C1916] rounded-2xl p-5 flex gap-5 items-center shadow-sm border border-[#C8A66A]/20">
                <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-[#141210]">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="font-poppins text-[10px] uppercase tracking-widest text-[#C8A66A] mb-1">{item.category}</p>
                  <h3 className="font-playfair text-xl font-semibold text-[#E8E0D8] truncate">{item.name}</h3>
                  <p className="font-playfair text-lg font-semibold text-[#E8E0D8] mt-1">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 border border-[#E8E0D8]/20 rounded-full flex items-center justify-center hover:border-[#C8A66A] hover:text-[#C8A66A] text-[#E8E0D8] transition-colors"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="font-poppins text-sm font-medium w-6 text-center text-[#E8E0D8]">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 border border-[#E8E0D8]/20 rounded-full flex items-center justify-center hover:border-[#C8A66A] hover:text-[#C8A66A] text-[#E8E0D8] transition-colors"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <p className="font-playfair text-lg font-semibold text-[#E8E0D8]">₹{item.price * item.quantity}</p>
                  <button onClick={() => removeItem(item.id)} className="text-[#E8E0D8]/30 hover:text-rose-400 transition-colors mt-2">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-[#1C1916] rounded-2xl p-8 shadow-sm border border-[#C8A66A]/20 h-fit sticky top-24">
            <h3 className="font-playfair text-2xl font-semibold text-[#E8E0D8] mb-6">Order Summary</h3>
            <div className="space-y-4 font-poppins text-sm text-[#E8E0D8]">
              <div className="flex justify-between">
                <span className="text-[#E8E0D8]/70">Subtotal</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#E8E0D8]/70">Shipping</span>
                <span className={shipping === 0 ? "text-[#C8A66A] font-medium" : "font-medium"}>
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-[10px] text-[#E8E0D8]/50">Free shipping on orders above ₹999</p>
              )}
              <div className="border-t border-[#C8A66A]/20 pt-4 flex justify-between">
                <span className="font-semibold text-base">Total</span>
                <span className="font-playfair text-2xl font-bold text-[#E8E0D8]">₹{grandTotal}</span>
              </div>
            </div>

            {/* Coupon */}
            <div className="mt-6">
              <div className="flex gap-0">
                <input type="text" placeholder="Coupon code" className="flex-1 bg-[#141210] border border-[#C8A66A]/20 text-[#E8E0D8] placeholder:text-[#E8E0D8]/40 font-poppins text-xs px-4 py-3 rounded-l-md focus:outline-none focus:border-[#C8A66A] transition-colors" />
                <button className="bg-[#252018] text-[#E8E0D8] border border-[#C8A66A]/20 border-l-0 font-poppins text-xs uppercase tracking-widest px-4 py-3 rounded-r-md hover:bg-[#C8A66A] hover:text-[#141210] hover:border-[#C8A66A] transition-colors">Apply</button>
              </div>
            </div>

            <Link href="/checkout" className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[#C8A66A] hover:bg-[#b8935a] text-[#141210] font-poppins text-xs uppercase tracking-widest py-4 rounded-md transition-colors shadow-lg shadow-[#C8A66A]/20 font-medium">
              Proceed to Checkout <ArrowRight size={14} />
            </Link>

            {/* WhatsApp Order */}
            <a
              href={`https://wa.me/919073620812?text=Hi!%20I'd%20like%20to%20order:%0A${encodeURIComponent(items.map(i => `• ${i.name} x${i.quantity} = ₹${i.price * i.quantity}`).join('\n'))}%0A%0ATotal:%20₹${grandTotal}`}
              target="_blank" rel="noreferrer"
              className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-[#141210] border border-[#25D366]/30 font-poppins text-xs uppercase tracking-widest py-4 rounded-md transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
