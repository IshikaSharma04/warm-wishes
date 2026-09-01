import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-[70vh] bg-[#141210] flex flex-col items-center justify-center gap-4 text-center px-6">
      <div className="relative w-20 h-20 rounded-full overflow-hidden border border-[#C8A66A]/40 shadow-xl animate-pulse">
        <Image
          src="/images/logo.png"
          alt="Warm Wishes Loading"
          fill
          priority
          className="object-cover"
        />
      </div>
      <p className="font-poppins text-xs uppercase tracking-[0.25em] text-[#C8A66A] font-light">
        Loading...
      </p>
    </div>
  );
}
