import { useCallback, useEffect, useRef, useState } from "react";

/* ─── floating feature cards ─── */
const features = [
  {
    icon: "https://pergolux.de/cdn/shop/files/Shield_Check_54616393-e1cb-420b-80ab-1ce83c5de17f.png?crop=center&height=54&v=1752586038&width=54",
    title: "10 Jahre Garantie",
    text: "Höchste Qualitätsstandards",
    position: "top-left",
  },
  {
    icon: "https://pergolux.de/cdn/shop/files/weather.png?crop=center&height=74&v=1752586039&width=74",
    title: "Wetterfest",
    text: "Bis 100 km/h sturmfest",
    position: "top-right",
  },
  {
    icon: "https://pergolux.de/cdn/shop/files/Sledgehammer_3984b0e5-e932-44e2-b41b-4719568216c6.png?crop=center&height=72&v=1758108706&width=72",
    title: "SnapFIT™",
    text: "Einfache Montage",
    position: "bottom-left",
  },
  {
    icon: "https://pergolux.de/cdn/shop/files/Confetti_198c4952-7307-43f9-8286-78ba45318c28.png?crop=center&height=46&v=1752586038&width=46",
    title: "+100.000 Kunden",
    text: "Weltweit zufrieden",
    position: "bottom-right",
  },
];

/* ─── spec bars ─── */
const specs = [
  { label: "Aluminium 6063-T5", value: 100, color: "from-emerald-400 to-emerald-600" },
  { label: "Windbeständigkeit", value: 92, color: "from-amber-400 to-amber-600" },
  { label: "Schneelast", value: 85, color: "from-sky-400 to-sky-600" },
  { label: "UV-Schutz", value: 98, color: "from-violet-400 to-violet-600" },
];

/* ─── component ─── */
interface Product3DShowcaseProps {
  productImage: string;
  productName?: string;
}

export const Product3DShowcase = ({
  productImage,
  productName = "Maßanfertigung S3",
}: Product3DShowcaseProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [barsAnimated, setBarsAnimated] = useState(false);
  const [louversOpen, setLouversOpen] = useState(false);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });

  /* smooth mouse tracking via rAF */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    targetRef.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    };
  }, []);

  /* lerp animation loop */
  useEffect(() => {
    let running = true;
    const tick = () => {
      setMouse((prev) => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.08,
        y: prev.y + (targetRef.current.y - prev.y) * 0.08,
      }));
      if (running) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* attach mouse listener */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  /* intersection observer – trigger entrance animation */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setBarsAnimated(true), 600);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* derived transforms */
  const rotateX = mouse.y * -8;
  const rotateY = mouse.x * 8;
  const shadowX = mouse.x * 30;
  const shadowY = mouse.y * 30;

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 py-16 md:py-28"
    >
      {/* animated grid background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            transform: `translate(${mouse.x * 10}px, ${mouse.y * 10}px)`,
          }}
        />
      </div>

      {/* floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${2 + (i % 4) * 2}px`,
              height: `${2 + (i % 4) * 2}px`,
              left: `${(i * 17 + 5) % 100}%`,
              top: `${(i * 23 + 10) % 100}%`,
              transform: `translate(${mouse.x * (10 + i * 3)}px, ${mouse.y * (10 + i * 3)}px)`,
              transition: "transform 0.3s ease-out",
            }}
          />
        ))}
      </div>

      {/* glow orbs */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]"
        style={{ transform: `translate(${mouse.x * 40}px, ${mouse.y * 40}px)` }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-amber-500/10 blur-[100px]"
        style={{ transform: `translate(${mouse.x * -30}px, ${mouse.y * -30}px)` }}
      />

      <div className="relative mx-auto max-w-[1440px] px-4 md:px-16">
        {/* header */}
        <div
          className={`mb-12 text-center transition-all duration-1000 md:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Interaktive Vorschau
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">
            Entdecke die{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
              {productName}
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-white/50 md:text-base">
            Bewege die Maus über das Bild – erlebe deine Pergola aus jeder Perspektive
          </p>
        </div>

        {/* 3D stage */}
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* ── Left: 3D product card ── */}
          <div
            className={`relative w-full max-w-xl flex-shrink-0 transition-all duration-1000 lg:w-[55%] ${
              isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
            style={{ perspective: "1200px" }}
          >
            {/* main 3D card */}
            <div
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl backdrop-blur-sm"
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transition: "transform 0.1s ease-out",
                boxShadow: `${shadowX}px ${shadowY}px 80px rgba(16,185,129,.15), 0 0 60px rgba(16,185,129,.05)`,
              }}
            >
              {/* shine overlay */}
              <div
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background: `radial-gradient(circle at ${50 + mouse.x * 30}% ${50 + mouse.y * 30}%, rgba(255,255,255,.12) 0%, transparent 60%)`,
                }}
              />

              {/* product image */}
              <div className="relative">
                <img
                  src={productImage}
                  alt={productName}
                  className="relative z-0 aspect-[4/3] w-full object-cover"
                />

                {/* louver slats overlay */}
                <div className="absolute inset-0 z-[5] pointer-events-none" style={{ perspective: "400px" }}>
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-full transition-all ease-in-out"
                      style={{
                        height: "8.33%",
                        top: `${i * 8.33}%`,
                        transformOrigin: "center top",
                        transform: louversOpen ? "rotateX(68deg)" : "rotateX(0deg)",
                        transitionDuration: "800ms",
                        transitionDelay: `${i * 40}ms`,
                      }}
                    >
                      <div
                        className="w-full h-full transition-all ease-in-out"
                        style={{
                          background: louversOpen
                            ? "linear-gradient(to bottom, rgba(0,0,0,0.05), transparent)"
                            : `linear-gradient(to bottom, rgba(30,30,30,0.85), rgba(50,50,50,0.7))`,
                          transitionDuration: "800ms",
                          transitionDelay: `${i * 40}ms`,
                          borderBottom: louversOpen ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(80,80,80,0.6)",
                          boxShadow: louversOpen ? "none" : "0 2px 4px rgba(0,0,0,0.3)",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* toggle button */}
                <button
                  onClick={() => setLouversOpen((prev) => !prev)}
                  className="absolute bottom-3 right-3 z-10 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-2 backdrop-blur-md transition-all hover:bg-black/80 cursor-pointer"
                >
                  <span className="text-xs font-semibold text-white/80">Dach</span>
                  <div className={`relative h-5 w-9 rounded-full transition-colors duration-300 ${
                    louversOpen ? "bg-emerald-500" : "bg-white/20"
                  }`}>
                    <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-300 ${
                      louversOpen ? "translate-x-4" : "translate-x-0.5"
                    }`} />
                  </div>
                  <span className={`text-xs font-bold transition-colors duration-300 ${
                    louversOpen ? "text-emerald-400" : "text-white/50"
                  }`}>{louversOpen ? "AUF" : "ZU"}</span>
                </button>
              </div>

              {/* bottom info bar */}
              <div className="relative z-10 flex items-center justify-between border-t border-white/10 bg-black/40 px-5 py-3 backdrop-blur-md md:px-6 md:py-4">
                <div>
                  <div className="text-sm font-bold text-white md:text-base">{productName}</div>
                  <div className="text-xs text-white/50">Premium Aluminium Pergola</div>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg
                      key={s}
                      className="h-3.5 w-3.5 text-amber-400"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-xs text-white/60">4.85</span>
                </div>
              </div>
            </div>

            {/* floating feature cards around the 3D image */}
            {features.map((feat, i) => {
              const posClass = {
                "top-left": "-left-4 -top-4 md:-left-8 md:-top-6",
                "top-right": "-right-4 -top-4 md:-right-8 md:-top-6",
                "bottom-left": "-bottom-4 -left-4 md:-bottom-6 md:-left-8",
                "bottom-right": "-bottom-4 -right-4 md:-bottom-6 md:-right-8",
              }[feat.position];

              const delay = (i + 1) * 200;
              const floatX = mouse.x * (15 + i * 8) * (feat.position.includes("right") ? -1 : 1);
              const floatY = mouse.y * (15 + i * 8) * (feat.position.includes("bottom") ? -1 : 1);

              return (
                <div
                  key={feat.title}
                  className={`absolute z-20 ${posClass} transition-all duration-700`}
                  style={{
                    transform: `translate(${floatX}px, ${floatY}px)`,
                    opacity: isVisible ? 1 : 0,
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  <div className="flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 px-3 py-2.5 shadow-xl backdrop-blur-xl md:gap-3 md:px-4 md:py-3">
                    <img
                      src={feat.icon}
                      alt={feat.title}
                      className="h-7 w-7 object-contain md:h-8 md:w-8"
                    />
                    <div>
                      <div className="text-xs font-bold text-white md:text-sm">{feat.title}</div>
                      <div className="text-[10px] text-white/50 md:text-xs">{feat.text}</div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* animated ring around the card */}
            <div
              className="pointer-events-none absolute -inset-6 rounded-[2rem] border border-emerald-500/20 md:-inset-10"
              style={{
                transform: `rotateX(${rotateX * 0.5}deg) rotateY(${rotateY * 0.5}deg)`,
                transition: "transform 0.15s ease-out",
              }}
            />
          </div>

          {/* ── Right: specs & details ── */}
          <div
            className={`w-full flex-1 transition-all delay-300 duration-1000 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
            }`}
          >
            <h3 className="text-xl font-bold text-white md:text-2xl">
              Technische Highlights
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/50">
              Gebaut aus hochwertigstem Aluminium, zertifiziert und getestet
              für extreme Bedingungen.
            </p>

            {/* animated spec bars */}
            <div className="mt-8 space-y-5">
              {specs.map((spec, i) => (
                <div key={spec.label}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white/80">{spec.label}</span>
                    <span className="text-sm font-bold text-white">{spec.value}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${spec.color} transition-all duration-1000 ease-out`}
                      style={{
                        width: barsAnimated ? `${spec.value}%` : "0%",
                        transitionDelay: `${i * 150}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* key numbers */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { num: "100", unit: "km/h", desc: "Sturmfest" },
                { num: "10", unit: "Jahre", desc: "Garantie" },
                { num: "4.85", unit: "/ 5", desc: "Bewertung" },
              ].map((stat) => (
                <div
                  key={stat.desc}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm"
                >
                  <div className="text-2xl font-bold text-white md:text-3xl">
                    {stat.num}
                    <span className="ml-0.5 text-sm font-normal text-emerald-400">
                      {stat.unit}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-white/50">{stat.desc}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#configurator"
                className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/20"
              >
                Jetzt konfigurieren
              </a>
              <a
                href="tel:+4966141087500"
                className="rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Beratung anfragen
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
