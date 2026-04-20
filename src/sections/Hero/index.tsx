import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { promotions, formatPromoPrice } from "@/config/promotions";
import { useDiscounts } from "@/context/DiscountContext";
// importo fontin custom në stilizim global ose përmes Tailwind plugin
// import "../../assets/fonts/LEMONMILK-Bold.woff2";




import Photo1 from "../../assets/image-pergola.png";
import Photo10 from "../../assets/pergola-glass-guillot.png";
import Photo11 from "../../assets/image-light.png";
import Photo12 from "../../assets/Photo (1).png";

// Carousel data me imazhe nga assets
const slides = [
  {
    image: Photo1,
    title: "HÖCHSTER KOMFORT FÜR IHR ZUHAUSE",
    desc: "Genießen Sie ein einzigartiges Wohngefühl mit durchdachtem Design und maximalem Komfort – für entspannte Momente zu jeder Jahreszeit."
  },
  {
    image: Photo10,
    title: "IHR STIL, IHR DESIGN",
    desc: "Gestalten Sie Ihre Pergola ganz nach Ihren Wünschen – von Farben bis zu Funktionen. Für ein Zuhause, das so individuell ist wie Sie."
  },
  {
    image: Photo11,
    title: "QUALITÄT, DIE ÜBERZEUGT",
    desc: "Unsere Produkte stehen für Langlebigkeit und höchste Verarbeitungsqualität. Verlassen Sie sich auf geprüfte Materialien und präzise Fertigung."
  },
  {
    image: Photo12,
    title: "ELEGANZ TRIFFT FUNKTION",
    desc: "Hochwertige Glaslösungen für Ihre Pergola – maximaler Lichteinfall, perfekter Witterungsschutz und zeitloses Design für Ihren Außenbereich."
  }
];


export const Hero = () => {
  const { isActive } = useDiscounts();
  const [active, setActive] = useState(0);
  const timeoutRef = useRef(null);
  const imageRef = useRef(null);
  const prevImageRef = useRef(null);
  const [prevActive, setPrevActive] = useState(0);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);

  // Efekt i qartë, i njëjtë për të gjitha imazhet (zoom-out + fade-in), edhe në fillim edhe në slide change
  useEffect(() => {
    // Crossfade: fshih imazhin e mëparshëm
    if (prevImageRef.current) {
      gsap.set(prevImageRef.current, { opacity: 0, scale: 1 });
    }
    // Zoom-out + fade-in për imazhin aktiv
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 6, ease: "power2.out" }
      );
    }
    // Slide-in title
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power2.out", delay: 0.15 }
      );
    }
    // Slide-in description
    if (descRef.current) {
      gsap.fromTo(
        descRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power2.out", delay: 0.25 }
      );
    }
    // Slide-in button
    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power2.out", delay: 0.35 }
      );
    }
    setPrevActive(active);
  }, [active]);

  // Auto-slide
  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearTimeout(timeoutRef.current);
  }, [active]);

  const goTo = (idx) => setActive(idx);

  return (
    <section
      className="relative min-h-[90vh] flex items-center bg-black overflow-hidden"
      style={{ fontFamily: 'LEMONMILK-Bold, sans-serif' }}
    >
      {/* Background images for crossfade */}
      {/* Previous image (fades out) */}
      {/* Previous image (fades out) - only render after first slide change */}
      {prevActive !== active && (
        <img
          ref={prevImageRef}
          src={slides[prevActive].image}
          alt={slides[prevActive].title}
          className={"absolute inset-0 w-full h-full object-cover object-center opacity-80"}
          style={{zIndex:1, pointerEvents: 'none'}}
        />
      )}
      {/* Current image (fades in + zoom) */}
      <img
        ref={imageRef}
        src={slides[active].image}
        alt={slides[active].title}
        className={"absolute inset-0 w-full h-full object-cover object-center opacity-80"}
        style={{zIndex:2, pointerEvents: 'none'}}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" style={{zIndex:2}} />
      {/* Content majtas */}
        <div className="relative z-10 flex flex-col justify-center min-h-[60vh] w-full px-5 md:pl-24 md:pr-8 md:max-w-3xl">
          <div className="py-6 md:p-10">
            <h1
              ref={titleRef}
              className="text-white font-extrabold uppercase leading-[1.08] mb-4 md:mb-6"
              style={{ fontFamily: 'LEMONMILK-Bold, sans-serif', fontSize: 'clamp(1.4rem,5vw,3.2rem)', letterSpacing: '0.02em', opacity: 0 }}
            >
              {slides[active].title}
            </h1>
            <p
              ref={descRef}
              className="text-white text-sm md:text-xl font-normal mb-6 md:mb-8 max-w-lg"
              style={{ opacity: 0 }}
            >
              {slides[active].desc}
            </p>
            <Link
              ref={btnRef}
              to="/pergola/elegante-pergola"
              className="inline-flex items-center px-6 md:px-10 py-3 md:py-4 rounded bg-[#82B2CA] text-black font-bold text-sm md:text-lg shadow hover:bg-[#5fa0b8] transition-colors"
              style={{ opacity: 0 }}
            >
              Produkte ansehen
              <svg className="ml-2 w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      {/* Slider dots only */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border-2 ${active === idx ? 'bg-white/80 border-white' : 'bg-white/30 border-white/50'} transition-all`}
            aria-label={`Gehe zu Slide ${idx+1}`}
          />
        ))}
      </div>

      {/* Promo cards — right side */}
      <div className="absolute right-0 top-0 h-full hidden lg:flex flex-col justify-center gap-3 pr-8 pl-4 z-10" style={{ width: 300 }}>
        {promotions.filter((p) => isActive(p.key)).map((p) => {
          const discountedPrice = Math.round(p.originalPrice * (1 - p.discountPercent / 100));
          return (
            <Link
              key={p.key}
              to={p.href}
              className="group flex flex-col gap-1.5 rounded-2xl px-4 py-3.5 transition-all hover:scale-[1.02]"
              style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {/* Top row: name + badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-white text-[11px] font-semibold leading-tight" style={{ fontFamily: "LEMONMILK, sans-serif" }}>
                  {p.label}
                </span>
                <span className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold text-white" style={{ backgroundColor: "#82B2CA" }}>
                  -{p.discountPercent}%
                </span>
              </div>
              {/* Prices */}
              <div className="flex items-baseline gap-2">
                <span className="text-white font-bold text-sm" style={{ fontFamily: "LEMONMILK, sans-serif" }}>
                  {formatPromoPrice(discountedPrice)}
                </span>
                <span className="text-white/40 text-xs line-through">
                  {formatPromoPrice(p.originalPrice)}
                </span>
              </div>
              {/* Arrow */}
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[#82B2CA] text-[10px]">Jetzt entdecken</span>
                <svg className="w-3 h-3 text-[#82B2CA] transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                </svg>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
