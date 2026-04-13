// FeatureTicker section restored
import React from "react";

export const FeatureTicker = ({ backgroundColorClass = "bg-[#f4f4f3]" }) => {
  return (
    <section className={`${backgroundColorClass} py-4 w-full overflow-hidden`}>
      <div className="max-w-[1440px] mx-auto px-4 flex items-center gap-8 animate-marquee whitespace-nowrap">
        <span className="text-[#344148] font-bold text-lg tracking-widest uppercase">✓ 100% Aluminium</span>
        <span className="text-[#344148] font-bold text-lg tracking-widest uppercase">✓ 10 Jahre Garantie</span>
        <span className="text-[#344148] font-bold text-lg tracking-widest uppercase">✓ Persönliche Beratung</span>
        <span className="text-[#344148] font-bold text-lg tracking-widest uppercase">✓ Schnelle Lieferung</span>
        <span className="text-[#344148] font-bold text-lg tracking-widest uppercase">✓ Premium Qualität</span>
      </div>
    </section>
  );
};

export default FeatureTicker;
