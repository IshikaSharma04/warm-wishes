interface Feature {
  icon: string;
  label: string;
}

export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 bg-[#1C1916] rounded-3xl p-10 shadow-lg shadow-black/20 border border-[#C8A66A]/10">
      {features.map(({ icon, label }) => (
        <div key={label} className="flex flex-col items-center text-center gap-3">
          <span className="text-3xl">{icon}</span>
          <span className="font-poppins text-sm text-[#E8E0D8]/80">{label}</span>
        </div>
      ))}
    </div>
  );
}
