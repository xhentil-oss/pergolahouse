import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import imagePergola from "@/assets/image-pergola.png";

export const FeatureSlider = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-white py-20 md:py-32 border-b border-neutral-100 overflow-hidden">
      <div ref={sectionRef} className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12 md:gap-20">

        {/* Left: Image — slides in from left */}
        <div
          className={`flex-1 min-w-[320px] flex justify-center transition-all duration-1000 ease-out
            ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"}`}
        >
          <div className="relative">
            <img
              src={imagePergola}
              alt="Über uns"
              className="rounded-3xl shadow-xl w-full max-w-[420px] object-cover"
            />
            {/* floating accent badge */}
            <div
              className={`absolute -bottom-5 left-4 rounded-2xl px-5 py-3 shadow-lg transition-all duration-1000 delay-300
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ backgroundColor: "#344148" }}
            >
              <p className="font-lemonmilk text-lg text-white leading-none">10+</p>
              <p className="text-white/50 text-xs mt-0.5">Jahre Erfahrung</p>
            </div>
          </div>
        </div>

        {/* Right: Content — slides in from right */}
        <div
          className={`flex-1 min-w-[320px] transition-all duration-1000 ease-out delay-150
            ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"}`}
        >
          <p className="text-[#82B2CA] font-bold uppercase tracking-widest mb-3 text-xs">Über uns</p>
          <h2 className="font-lemonmilk text-[#344148] text-3xl md:text-4xl leading-tight mb-6">
            Wir schaffen Räume,<br />die inspirieren.
          </h2>
          <p className="text-neutral-500 text-base md:text-lg mb-8 leading-relaxed">
            Mit Leidenschaft für Design und langjähriger Erfahrung realisiert unser Team individuelle Projekte, die Ihren Stil und Ihre Bedürfnisse widerspiegeln. Von der Idee bis zur Umsetzung sind wir Ihr zuverlässiger Partner.
          </p>

          {/* mini stats row */}
          <div className="flex items-center justify-start gap-12 md:gap-16 mb-8 pb-8 border-b border-neutral-100">
            {[
              { v: "100.000+", l: "Kunden" },
              { v: "14", l: "Länder" },
              { v: "4,79 ★", l: "Bewertung" },
            ].map((s) => (
              <div key={s.l} className="text-left">
                <p className="font-lemonmilk text-xl text-[#344148]">{s.v}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>

          <Link
            to="/ueber-uns"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-85 hover:shadow-lg"
            style={{ backgroundColor: "#344148" }}
          >
            Mehr erfahren
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};
