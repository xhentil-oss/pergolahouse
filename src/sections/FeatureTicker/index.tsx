import React from "react";

const items = [
  "✓ 100% Aluminium",
  "✓ 10 Jahre Garantie",
  "✓ Persönliche Beratung",
  "✓ Schnelle Lieferung",
  "✓ Premium Qualität",
  "✓ Höchste Sicherheit",
  "✓ Langlebige Konstruktion",
  "✓ Wasserdicht & Wetterfest",
  "✓ Maßgefertigte Lösungen",
  "✓ Zertifizierte Materialien",
  "✓ Modernste Technologie",
  "✓ Kostenloser Versand",
];

export const FeatureTicker = ({
  backgroundColorClass = "bg-[#f4f4f3]",
  textColorClass = "text-[#344148]",
}) => {
  return (
    <section className={`${backgroundColorClass} py-3 md:py-4 w-full overflow-hidden`}>
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span key={`a-${i}`} className={`${textColorClass} font-bold text-xs md:text-sm tracking-widest uppercase shrink-0 mx-6 md:mx-10`}>
            {item}
          </span>
        ))}
        {items.map((item, i) => (
          <span key={`b-${i}`} className={`${textColorClass} font-bold text-xs md:text-sm tracking-widest uppercase shrink-0 mx-6 md:mx-10`}>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};

export default FeatureTicker;
