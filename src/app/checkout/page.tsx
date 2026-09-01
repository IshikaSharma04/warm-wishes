"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, QrCode, Smartphone } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const [step, setStep] = useState<"shipping" | "payment" | "confirm">("shipping");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", pincode: "" });
  const [utr, setUtr] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

  const subtotal = total();
  const shipping = subtotal > 999 ? 0 : 99;
  const grandTotal = subtotal + shipping;

  const UPI_ID = "9874402677@ybl";
  const UPI_NAME = "Warm Wishes";
  
  // Construct UPI deep link
  const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${grandTotal}&cu=INR`;
  // Generate QR code using an external API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUrl)}`;

  if (items.length === 0 && step !== "confirm") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 bg-[#141210] px-6">
        <Check size={64} className="text-[#C8A66A]/40" />
        <h2 className="font-playfair text-4xl font-semibold text-[#E8E0D8]">Nothing to checkout</h2>
        <Link href="/collections" className="bg-[#C8A66A] text-[#141210] font-poppins text-xs uppercase tracking-widest px-8 py-4 rounded-md hover:bg-[#b8935a] transition-colors font-medium">
          Browse Collections
        </Link>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 bg-[#141210] px-6 text-center">
        <div className="w-20 h-20 bg-[#C8A66A] rounded-full flex items-center justify-center">
          <Check size={36} className="text-[#141210]" />
        </div>
        <h2 className="font-playfair text-4xl font-semibold text-[#E8E0D8]">Thank You!</h2>
        <p className="font-poppins text-[#E8E0D8]/70 max-w-md">
          Your order has been placed successfully and your payment is being verified. We'll contact you shortly with shipping details.
        </p>
        <p className="font-playfair text-2xl font-semibold text-[#C8A66A]">Order Total: ₹{grandTotal}</p>
        <Link href="/" className="bg-[#C8A66A] text-[#141210] font-poppins text-xs uppercase tracking-widest px-8 py-4 rounded-md hover:bg-[#b8935a] transition-colors mt-4 font-medium">
          Back to Home
        </Link>
      </div>
    );
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!utr.trim()) return;

    setIsConfirming(true);

    // Prepare order details for WhatsApp notification
    const orderDetails = items.map(i => `• ${i.name} x${i.quantity}`).join('\n');
    const waText = `*NEW ORDER (UPI Payment)* ✨\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Address:* ${form.address}, ${form.city}, ${form.pincode}\n\n*Order Details:*\n${orderDetails}\n\n*Total:* ₹${grandTotal}\n*UPI Ref/UTR:* ${utr}`;
    
    // Save to messages API just in case
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: form.name, 
          email: form.email, 
          phone: form.phone, 
          message: `NEW ORDER:\n${orderDetails}\nTotal: ₹${grandTotal}\nUPI UTR: ${utr}\nAddress: ${form.address}, ${form.city} ${form.pincode}` 
        }),
      });
    } catch (err) {
      console.error(err);
    }

    // Attempt to open WhatsApp for the user to directly send the order info to the owner
    const waUrl = `https://wa.me/919073620812?text=${encodeURIComponent(waText)}`;
    try {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error(err);
    }

    clearCart();
    setStep("confirm");
  };

  return (
    <div className="bg-[#141210] min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-6">
        <button 
          onClick={() => step === "payment" ? setStep("shipping") : window.history.back()} 
          className="inline-flex items-center gap-2 font-poppins text-xs uppercase tracking-widest text-[#E8E0D8]/60 hover:text-[#C8A66A] transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <h1 className="font-playfair text-4xl font-semibold text-[#E8E0D8] mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {step === "shipping" ? (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <h2 className="font-playfair text-2xl font-semibold text-[#E8E0D8]">Shipping Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} type="text" placeholder="Full Name" className="bg-[#1C1916] border border-[#C8A66A]/20 rounded-xl px-5 py-4 font-poppins text-sm text-[#E8E0D8] placeholder:text-[#E8E0D8]/40 focus:outline-none focus:border-[#C8A66A] transition-colors" />
                  <input required value={form.email} onChange={e => setForm({...form, email: e.target.value})} type="email" placeholder="Email Address" className="bg-[#1C1916] border border-[#C8A66A]/20 rounded-xl px-5 py-4 font-poppins text-sm text-[#E8E0D8] placeholder:text-[#E8E0D8]/40 focus:outline-none focus:border-[#C8A66A] transition-colors" />
                </div>
                <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} type="tel" placeholder="Phone Number" className="w-full bg-[#1C1916] border border-[#C8A66A]/20 rounded-xl px-5 py-4 font-poppins text-sm text-[#E8E0D8] placeholder:text-[#E8E0D8]/40 focus:outline-none focus:border-[#C8A66A] transition-colors" />
                <textarea required value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Full Address" rows={3} className="w-full bg-[#1C1916] border border-[#C8A66A]/20 rounded-xl px-5 py-4 font-poppins text-sm text-[#E8E0D8] placeholder:text-[#E8E0D8]/40 focus:outline-none focus:border-[#C8A66A] resize-none transition-colors" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required value={form.city} onChange={e => setForm({...form, city: e.target.value})} type="text" placeholder="City" className="bg-[#1C1916] border border-[#C8A66A]/20 rounded-xl px-5 py-4 font-poppins text-sm text-[#E8E0D8] placeholder:text-[#E8E0D8]/40 focus:outline-none focus:border-[#C8A66A] transition-colors" />
                  <input required value={form.pincode} onChange={e => setForm({...form, pincode: e.target.value})} type="text" placeholder="PIN Code" className="bg-[#1C1916] border border-[#C8A66A]/20 rounded-xl px-5 py-4 font-poppins text-sm text-[#E8E0D8] placeholder:text-[#E8E0D8]/40 focus:outline-none focus:border-[#C8A66A] transition-colors" />
                </div>

                <button type="submit" className="w-full bg-[#C8A66A] hover:bg-[#b8935a] text-[#141210] font-poppins text-xs uppercase tracking-widest py-4 rounded-xl transition-colors shadow-lg shadow-[#C8A66A]/20 mt-4 font-bold">
                  Continue to Payment
                </button>
              </form>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="font-playfair text-2xl font-semibold text-[#E8E0D8]">Payment via UPI</h2>
                <div className="bg-[#1C1916] border border-[#C8A66A]/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                  <p className="font-poppins text-sm text-[#E8E0D8]/70 mb-6">Scan the QR code below or tap the button to pay directly via any UPI app.</p>
                  
                  {/* QR Code */}
                  <div className="bg-white p-4 rounded-xl mb-6 inline-block">
                    <img src={qrCodeUrl} alt="UPI QR Code" className="w-48 h-48" />
                  </div>
                  
                  <p className="font-playfair text-xl text-[#E8E0D8] mb-2">UPI ID: <span className="font-semibold text-[#C8A66A]">{UPI_ID}</span></p>
                  
                  {/* Direct Payment Link for Mobile */}
                  <a href={upiUrl} className="mt-4 flex items-center justify-center gap-2 bg-[#141210] border border-[#C8A66A]/30 text-[#C8A66A] font-poppins text-xs uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-[#C8A66A]/10 transition-colors w-full sm:w-auto">
                    <Smartphone size={16} /> Open UPI App (Mobile)
                  </a>
                </div>

                <form onSubmit={handlePaymentConfirm} className="bg-[#1C1916] border border-[#C8A66A]/20 rounded-2xl p-8">
                  <h3 className="font-playfair text-xl font-semibold text-[#E8E0D8] mb-4">Confirm Payment</h3>
                  <p className="font-poppins text-xs text-[#E8E0D8]/60 mb-4">After completing the payment, please enter the 12-digit UPI Reference Number (UTR) below to confirm your order.</p>
                  <div className="space-y-4">
                    <input 
                      required 
                      value={utr} 
                      onChange={e => setUtr(e.target.value)} 
                      type="text" 
                      placeholder="Enter 12-digit UTR/Reference No." 
                      className="w-full bg-[#141210] border border-[#C8A66A]/20 rounded-xl px-5 py-4 font-poppins text-sm text-[#E8E0D8] placeholder:text-[#E8E0D8]/40 focus:outline-none focus:border-[#C8A66A] transition-colors" 
                    />
                    <button 
                      type="submit" 
                      disabled={isConfirming || utr.length < 6}
                      className="w-full bg-[#C8A66A] hover:bg-[#b8935a] disabled:opacity-50 text-[#141210] font-poppins text-xs uppercase tracking-widest py-4 rounded-xl transition-colors shadow-lg shadow-[#C8A66A]/20 font-bold flex items-center justify-center gap-2"
                    >
                      {isConfirming ? "Confirming..." : "Confirm & Place Order"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-[#1C1916] rounded-2xl p-8 shadow-sm border border-[#C8A66A]/20 sticky top-24">
              <h3 className="font-playfair text-xl font-semibold text-[#E8E0D8] mb-6">Order Summary</h3>
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[#141210]">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="font-poppins text-sm font-medium text-[#E8E0D8] truncate">{item.name}</p>
                      <p className="font-poppins text-xs text-[#E8E0D8]/60">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-poppins text-sm font-medium text-[#E8E0D8] shrink-0">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-[#C8A66A]/20 space-y-3 font-poppins text-sm text-[#E8E0D8]">
                <div className="flex justify-between"><span className="text-[#E8E0D8]/70">Subtotal</span><span>₹{subtotal}</span></div>
                <div className="flex justify-between"><span className="text-[#E8E0D8]/70">Shipping</span><span className={shipping === 0 ? "text-[#C8A66A]" : ""}>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
                <div className="flex justify-between border-t border-[#C8A66A]/20 pt-3"><span className="font-semibold">Total</span><span className="font-playfair text-xl font-bold">₹{grandTotal}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
