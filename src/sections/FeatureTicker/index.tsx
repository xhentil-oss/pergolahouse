import React from "react";

const items = [
  "✓ 100% Aluminium",
  "✓ 10 Jahre Garantie",
  "✓ Persönliche Beratung",
  "✓ Schnelle Lieferung",
  "✓ Premium Qualität",
];

export const FeatureTicker = ({ backgroundColorClass = "bg-[#f4f4f3]" }) => {
  return (
    <section className={`${backgroundColorClass} py-3 md:py-4 w-full overflow-hidden`}>
      <div className="flex animate-marquee whitespace-nowrap">
        {/* copy 1 */}
        {items.map((item, i) => (
          <span key={`a-${i}`} className="text-[#344148] font-bold text-xs md:text-sm tracking-widest uppercase shrink-0 mx-6 md:mx-10">
            {item}
          </span>
        ))}
        {/* copy 2 — seamless loop */}
        {items.map((item, i) => (
          <span key={`b-${i}`} className="text-[#344148] font-bold text-xs md:text-sm tracking-widest uppercase shrink-0 mx-6 md:mx-10">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};

export default FeatureTicker;
