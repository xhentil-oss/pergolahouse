import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import photo1 from "../../assets/Photo (1).png";

const stats = [
  { value: "100.000+", label: "Zufriedene Kunden" },
  { value: "10 Jahre", label: "Garantie" },
  { value: "4.85/5", label: "Bewertung" },
  { value: "100 km/h", label: "Sturmfest" },
];

const getTimeLeft = () => {
  const target = new Date();
  target.setDate(target.getDate() + 14);
  target.setHours(23, 59, 59, 0);
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
};

export const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallax = Math.min(scrollY * 0.3, 200);

  return (
    <>
      <section ref={heroRef} className="relative min-h-[65vh] md:min-h-[75vh] overflow-hidden bg-zinc-950">
        {/* full-screen background image with parallax */}
        <div
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${parallax}px)` }}
        >
          <img
            src={photo1}
            alt="Premium Pergola"
            className="h-[120%] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        </div>

        {/* animated floating particles */}
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-[#82B2CA]/30 animate-pulse"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i * 13) % 60}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${2 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* main content */}
        <div className="relative z-10 mx-auto flex min-h-[65vh] md:min-h-[75vh] max-w-[1440px] flex-col justify-center px-4 py-12 md:px-16">
          {/* headline */}
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Dein Outdoor-
              <br />
              <span className="relative">
                <span className="text-white">
                  Wohnzimmer
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 8c50-6 100-6 150-2s100 2 146-4" stroke="url(#underline)" strokeWidth="3" strokeLinecap="round" />
                  <defs><linearGradient id="underline" x1="0" y1="0" x2="300" y2="0"><stop stopColor="#ffffff" /><stop offset="1" stopColor="#ffffff" /></linearGradient></defs>
                </svg>
              </span>
              <br />
              <span className="text-white/90">wartet.</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/60 md:text-xl">
              Premium Aluminium-Pergolen – designed in Norwegen, gebaut für jedes Wetter.
              Erlebe Komfort, der keine Kompromisse kennt.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/collections/unsere-pergolen"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-8 py-4 text-base font-bold text-white transition-all hover:opacity-90 hover:shadow-2xl"
              style={{ backgroundColor: '#344148' }}
            >
              <span className="relative z-10">Kollektion entdecken</span>
              <svg className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          </div>
        </div>
      </section>

    </>
  );
};
