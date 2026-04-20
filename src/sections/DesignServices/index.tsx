import { useEffect, useRef, useState } from "react";

const services = [
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="#82B2CA" strokeWidth="1.8" viewBox="0 0 56 56">
        <rect x="10" y="24" width="36" height="16" rx="4"/>
        <rect x="14" y="16" width="28" height="12" rx="4"/>
        <rect x="18" y="40" width="4" height="8" rx="2"/>
        <rect x="34" y="40" width="4" height="8" rx="2"/>
      </svg>
    ),
    title: "Komfort",
    description: "Genießen Sie maximalen Komfort und modernes Design in Ihrem Wohnraum.",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="#82B2CA" strokeWidth="1.8" viewBox="0 0 56 56">
        <path d="M44 12l-8 8"/>
        <path d="M46.5 9.5a3.535 3.535 0 0 1 5 5l-27 27a7 7 0 0 1-3.5 1.94l-7 2a2 2 0 0 1-2.47-2.47l2-7A7 7 0 0 1 14 34l27-27z"/>
      </svg>
    ),
    title: "Personalisierung",
    description: "Wählen Sie Stil, Farben und Maße individuell für jeden Raum.",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="#82B2CA" strokeWidth="1.8" viewBox="0 0 56 56">
        <circle cx="28" cy="24" r="10"/>
        <path d="M28 34v10"/><path d="M22 44h12"/>
        <path d="M28 14l2.94 5.96 6.56.95-4.75 4.63 1.12 6.54L28 28.77l-5.87 3.09 1.12-6.54-4.75-4.63 6.56-.95L28 14z"/>
      </svg>
    ),
    title: "Qualität",
    description: "Premium-Materialien und garantierte Verarbeitung für Langlebigkeit und Sicherheit.",
  },
];

export const DesignServices = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          services.forEach((_, i) => {
            setTimeout(() => setVisibleCount((v) => Math.max(v, i + 1)), i * 150);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-[#191A19] py-14 md:py-20 border-t border-[#333]">
      <div className="max-w-7xl mx-auto px-4 md:px-16">
        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8">
          {services.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center px-4 py-8 md:px-8 md:py-12 bg-[#232323] rounded-2xl border border-[#333] relative
                transition-all duration-700
                ${visibleCount > i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#82B2CA]/10">
                {s.icon}
              </div>
              <h3 className="text-[#F8F8F8] text-lg md:text-xl font-extrabold mb-3 tracking-wide uppercase">{s.title}</h3>
              <p className="text-[#BDBDBD] text-sm md:text-base mb-8 leading-relaxed">{s.description}</p>
              <div className="absolute left-0 right-0 bottom-8 flex items-center justify-center gap-2">
                <span className="block w-16 h-0.5 bg-[#82B2CA]" />
                <span className="block w-3 h-3 rounded-full bg-[#82B2CA]" />
                <span className="block w-16 h-0.5 bg-[#82B2CA]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignServices;
