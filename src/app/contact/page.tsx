"use client";

import Image from "next/image";
import { MapPin, Mail, Phone, CheckCircle, Send } from "lucide-react";
import { useState } from "react";

const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FAQS = [
  { q: "How long do your candles burn?", a: "Our premium soy candles have a burn time of 45+ hours." },
  { q: "Do you offer custom gift hampers?", a: "Yes! WhatsApp us on +91 90736 20812 or send us a message here for fully customised hampers." },
  { q: "What is your shipping time?", a: "We ship within 2-3 business days. Delivery takes 5-7 days pan-India." },
  { q: "Are your products eco-friendly?", a: "Absolutely. We use soy wax, natural oils, and recyclable packaging." },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || sending) return;

    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (res.ok) {
        setSent(true);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Failed to send message:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-[#141210] min-h-screen">
      {/* Header */}
      <section className="py-20 text-center">
        <p className="font-poppins text-[11px] uppercase tracking-[0.2em] text-[#C8A66A] mb-3">Get In Touch</p>
        <h1 className="font-playfair text-5xl font-semibold text-[#E8E0D8] mb-3">Contact Us</h1>
        <div className="flex justify-center items-center gap-3">
          <div className="h-px w-10 bg-[#C8A66A]/40" /><div className="w-1.5 h-1.5 rotate-45 bg-[#C8A66A]" /><div className="h-px w-10 bg-[#C8A66A]/40" />
        </div>
        <p className="font-poppins text-[#E8E0D8]/70 mt-4">We'd love to hear from you!</p>
      </section>

      {/* Form + Info */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-[#1C1916] rounded-3xl shadow-2xl shadow-black/40 border border-[#C8A66A]/10 overflow-hidden">
          {/* Form */}
          <div className="p-10 md:p-14 border-r border-[#C8A66A]/10 flex flex-col justify-center">
            <h2 className="font-playfair text-2xl font-semibold text-[#E8E0D8] mb-8">Send us a message</h2>

            {sent ? (
              <div className="bg-[#C8A66A]/10 border border-[#C8A66A]/30 rounded-2xl p-8 text-center space-y-4">
                <div className="w-14 h-14 bg-[#C8A66A]/20 rounded-full flex items-center justify-center mx-auto text-[#C8A66A]">
                  <CheckCircle size={28} />
                </div>
                <h3 className="font-playfair text-2xl font-semibold text-[#E8E0D8]">Message Sent! ✨</h3>
                <p className="font-poppins text-sm text-[#E8E0D8]/70 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out! We&apos;ve received your message and will get back to you very soon.
                </p>
                <div>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-2 inline-block font-poppins text-xs font-semibold text-[#C8A66A] hover:text-[#b8935a] uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    ← Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name *"
                  className="w-full bg-[#141210] border border-[#C8A66A]/20 rounded-xl px-5 py-4 font-poppins text-sm text-[#E8E0D8] placeholder:text-[#E8E0D8]/40 focus:ring-2 focus:ring-[#C8A66A] outline-none transition-colors"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full bg-[#141210] border border-[#C8A66A]/20 rounded-xl px-5 py-4 font-poppins text-sm text-[#E8E0D8] placeholder:text-[#E8E0D8]/40 focus:ring-2 focus:ring-[#C8A66A] outline-none transition-colors"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number (Optional)"
                  className="w-full bg-[#141210] border border-[#C8A66A]/20 rounded-xl px-5 py-4 font-poppins text-sm text-[#E8E0D8] placeholder:text-[#E8E0D8]/40 focus:ring-2 focus:ring-[#C8A66A] outline-none transition-colors"
                />
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your Message *"
                  className="w-full bg-[#141210] border border-[#C8A66A]/20 rounded-xl px-5 py-4 font-poppins text-sm text-[#E8E0D8] placeholder:text-[#E8E0D8]/40 focus:ring-2 focus:ring-[#C8A66A] outline-none resize-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 bg-[#C8A66A] hover:bg-[#b8935a] disabled:opacity-50 text-[#141210] font-poppins font-semibold px-8 py-4 rounded-xl tracking-widest uppercase text-xs transition-colors shadow-lg shadow-[#C8A66A]/20 cursor-pointer"
                >
                  <Send size={14} />
                  {sending ? "Sending Message..." : "Send Message"}
                </button>
                {error && (
                  <p className="font-poppins text-xs text-red-400 text-center pt-1">{error}</p>
                )}
              </form>
            )}
          </div>

          {/* Info */}
          <div className="bg-[#1C1916] p-10 md:p-14 flex flex-col justify-center">
            <h2 className="font-playfair text-2xl font-semibold text-[#E8E0D8] mb-8">Get In Touch</h2>
            <div className="space-y-7">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-[#252018] border border-[#C8A66A]/20 rounded-full flex items-center justify-center text-[#C8A66A] shrink-0 shadow-sm">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="font-cormorant font-semibold text-lg text-[#E8E0D8]">WhatsApp</h4>
                  <p className="font-poppins text-sm text-[#E8E0D8]/70">+91 90736 20812</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-[#252018] border border-[#C8A66A]/20 rounded-full flex items-center justify-center text-[#C8A66A] shrink-0 shadow-sm">
                  <InstagramIcon size={18} />
                </div>
                <div>
                  <h4 className="font-cormorant font-semibold text-lg text-[#E8E0D8]">Instagram</h4>
                  <p className="font-poppins text-sm text-[#E8E0D8]/70">@warm__wishes</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-[#252018] border border-[#C8A66A]/20 rounded-full flex items-center justify-center text-[#C8A66A] shrink-0 shadow-sm">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="font-cormorant font-semibold text-lg text-[#E8E0D8]">Email</h4>
                  <p className="font-poppins text-sm text-[#E8E0D8]/70">thewarmwishescompany@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-[#252018] border border-[#C8A66A]/20 rounded-full flex items-center justify-center text-[#C8A66A] shrink-0 shadow-sm">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-cormorant font-semibold text-lg text-[#E8E0D8]">Location</h4>
                  <p className="font-poppins text-sm text-[#E8E0D8]/70">Kolkata, India</p>
                </div>
              </div>
            </div>
            <a
              href="https://wa.me/919073620812"
              target="_blank" rel="noreferrer"
              className="mt-10 inline-flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-[#141210] border border-[#25D366]/30 font-poppins text-xs uppercase tracking-widest py-4 rounded-xl transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <p className="font-poppins text-[11px] uppercase tracking-[0.2em] text-[#C8A66A] mb-3">Help</p>
          <h2 className="font-playfair text-4xl font-semibold text-[#E8E0D8]">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-[#1C1916] rounded-xl border border-[#C8A66A]/20 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#252018] transition-colors"
              >
                <span className="font-poppins text-sm font-medium text-[#E8E0D8]">{faq.q}</span>
                <span className={`text-[#C8A66A] transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-6">
                  <p className="font-poppins text-sm text-[#E8E0D8]/70 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="pb-24">
        <div className="text-center mb-12">
          <p className="font-poppins text-[11px] uppercase tracking-[0.2em] text-[#C8A66A] mb-3">@warm__wishes</p>
          <h2 className="font-playfair text-4xl font-semibold text-[#E8E0D8]">Follow Us On Instagram</h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
          {["/images/candle-vanilla.png", "/images/chocolates.png", "/images/soaps.png", "/images/gift-hamper.png", "/images/candle-lavender.png", "/images/hero-gift-box.png"].map((src, i) => (
            <a href="https://instagram.com/warm__wishes" target="_blank" rel="noreferrer" key={i} className="relative aspect-square overflow-hidden group">
              <Image src={src} alt="Instagram" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <InstagramIcon size={24} />
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
