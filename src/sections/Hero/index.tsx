import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
// importo fontin custom në stilizim global ose përmes Tailwind plugin
// import "../../assets/fonts/LEMONMILK-Bold.woff2";




import Photo1 from "../../assets/image-pergola.png";
import Photo10 from "../../assets/pergola-glass-guillot.png";
import Photo11 from "../../assets/image-light.png";

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
  }
];


export const Hero = () => {
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

  // Funksionet për shigjetat dhe dot-at
  const goTo = (idx) => setActive(idx);
  const prev = () => setActive((prev) => (prev - 1 + slides.length) % slides.length);
  const next = () => setActive((prev) => (prev + 1) % slides.length);

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
        <div className="relative z-10 flex flex-col justify-center min-h-[60vh] pl-8 md:pl-24 max-w-3xl">
          <div className="p-6 md:p-10">
            <h1
              ref={titleRef}
              className="text-white font-extrabold uppercase leading-[1.08] mb-6"
              style={{ fontFamily: 'LEMONMILK-Bold, sans-serif', fontSize: 'clamp(1.7rem,4vw,3.2rem)', letterSpacing: '0.02em', opacity: 0 }}
            >
              {slides[active].title}
            </h1>
            <p
              ref={descRef}
              className="text-white text-lg md:text-2xl font-normal mb-8"
              style={{ opacity: 0 }}
            >
              {slides[active].desc}
            </p>
            <Link
              ref={btnRef}
              to="/pergola/elegante-pergola"
              className="inline-flex items-center px-10 py-4 rounded bg-[#82B2CA] text-black font-bold text-lg shadow hover:bg-[#5fa0b8] transition-colors"
              style={{ opacity: 0 }}
            >
              Produkte ansehen
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      {/* Slider dots funksionale */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`w-3 h-3 rounded-full border-2 ${active === idx ? 'bg-white/80 border-white' : 'bg-white/30 border-white/50'} transition-all`}
            aria-label={`Gehe zu Slide ${idx+1}`}
          />
        ))}
      </div>
      {/* Shigjetat funksionale */}
      <div className="absolute right-16 top-1/2 flex flex-col gap-6 z-10">
        <button onClick={prev} className="w-14 h-14 rounded-full border border-white/60 flex items-center justify-center bg-black/30 text-white text-2xl hover:bg-white/10 transition-colors">←</button>
        <button onClick={next} className="w-14 h-14 rounded-full border border-white/60 flex items-center justify-center bg-black/30 text-white text-2xl hover:bg-white/10 transition-colors">→</button>
      </div>
    </section>
  );
};
