import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    { icon: "✋", title: "Handmade With Care", desc: "Every product hand-poured, hand-wrapped and made with intention." },
    { icon: "⭐", title: "Premium Quality", desc: "Only the finest soy wax, Belgian chocolate and cold-press oils." },
    { icon: "🎁", title: "Luxury Packaging", desc: "Gift-ready from the moment it leaves our studio." },
    { icon: "🇮🇳", title: "Made In India", desc: "Proudly crafted in India, celebrating local artisanship." },
    { icon: "🌿", title: "Sustainable Materials", desc: "Eco-conscious choices in everything we use." },
  ];

  return (
    <div className="bg-[#141210] min-h-screen">
      {/* Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
        <div className="relative min-h-[400px]">
          <Image src="/images/gift-hampers.png" alt="Our Story" fill className="object-cover" />

        </div>
        <div className="flex flex-col justify-center p-12 md:p-20 bg-[#1C1916]">
          <p className="font-poppins text-[11px] uppercase tracking-[0.2em] text-[#C8A66A] mb-4">Our Story</p>
          <h1 className="font-playfair text-5xl md:text-6xl font-semibold text-[#E8E0D8] leading-tight mb-6">
            Warm Wishes
          </h1>
          <p className="font-poppins text-[#E8E0D8]/80 leading-relaxed mb-4">
            Warm Wishes was born out of a simple thought — to bring joy to people through thoughtful, handcrafted gifts. Every product is made with love, care and the finest ingredients.
          </p>
          <p className="font-poppins text-[#E8E0D8]/70 leading-relaxed mb-8">
            We believe a gift is not just a product — it's a feeling. From the moment it's crafted in our studio to the moment it reaches your loved one's hands, every detail is infused with warmth.
          </p>
          <Link href="/collections" className="self-start inline-flex items-center gap-2 bg-[#C8A66A] text-white font-poppins text-xs uppercase tracking-widest px-8 py-4 rounded-md hover:bg-[#b8935a] transition-colors shadow-lg shadow-[#C8A66A]/20">
            Explore Collections
          </Link>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-poppins text-[11px] uppercase tracking-[0.2em] text-[#C8A66A] mb-3">What We Stand For</p>
          <h2 className="font-playfair text-4xl font-semibold text-[#E8E0D8]">Handmade With Care</h2>
          <div className="flex justify-center items-center gap-3 mt-4">
            <div className="h-px w-10 bg-[#C8A66A]/40" /><div className="w-1.5 h-1.5 rotate-45 bg-[#C8A66A]" /><div className="h-px w-10 bg-[#C8A66A]/40" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {values.map((v, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-4 p-6 bg-[#1C1916] rounded-2xl shadow-sm border border-[#C8A66A]/10 hover:shadow-md hover:border-[#C8A66A]/30 transition-all">
              <div className="w-14 h-14 bg-[#252018] rounded-full flex items-center justify-center text-2xl border border-[#C8A66A]/20">{v.icon}</div>
              <h3 className="font-cormorant font-semibold text-base text-[#E8E0D8]">{v.title}</h3>
              <p className="font-poppins text-[11px] text-[#E8E0D8]/60 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Made With Love Section */}
      <section className="py-24 bg-[#1C1916] border-t border-[#C8A66A]/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-poppins text-[11px] uppercase tracking-[0.2em] text-[#C8A66A] mb-4">Crafted With Intention</p>
            <h2 className="font-playfair text-4xl font-semibold text-[#E8E0D8] mb-6">Made With Love,<br />For Every Occasion</h2>
            <p className="font-poppins text-[#E8E0D8]/80 leading-relaxed mb-4">
              From birthdays to anniversaries, from festive hampers to little everyday surprises — we help you make every moment special with curated, handcrafted gifts.
            </p>
            <p className="font-poppins text-[#E8E0D8]/70 leading-relaxed">
              Each product undergoes quality checks to ensure you receive nothing but the best. We don't just make gifts — we create experiences.
            </p>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-[#C8A66A]/10">
            <Image src="/images/gift-hamper.png" alt="Made With Love" fill className="object-cover" />
            <div className="absolute inset-0 bg-[#141210]/20" />
          </div>
        </div>
      </section>
    </div>
  );
}
