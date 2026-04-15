import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { FeatureTicker } from "@/sections/FeatureTicker";
import { useCart } from "@/context/CartContext";

const gallery = [
  { src: "https://cdn.shopify.com/s/files/1/0575/2173/3813/files/Sundream_3x4_Screens-4x3.jpg?v=1711543068", alt: "Carport – Hauptansicht" },
  { src: "https://cdn.shopify.com/s/files/1/0575/2173/3813/files/PSC_AC_ANT_600_ZIP_02.jpg?v=1723556288", alt: "Carport – Seitenansicht" },
  { src: "https://cdn.shopify.com/s/files/1/0575/2173/3813/files/ANTRACITE_5mSCREEN_ed7c811d-a98f-4873-b0c1-114f0f566658.png?v=1747734954", alt: "Carport Anthrazit" },
  { src: "https://cdn.shopify.com/s/files/1/0575/2173/3813/files/BLACK_3mSCREEN_fb9bd088-6469-4520-b7ea-91432e336cbf.png?v=1747734992", alt: "Carport Schwarz" },
  { src: "https://cdn.shopify.com/s/files/1/0575/2173/3813/files/Group_73.png?v=1749220146", alt: "Carport Weiß" },
  { src: "https://cdn.shopify.com/s/files/1/0575/2173/3813/files/White_5m_f359b606-9a43-43b4-96a4-61f7e9f4e0f4.png?v=1750923131", alt: "Carport Weiß – Detail" },
];

const colorOptions = [
  { label: "Anthrazit", color: "#2E3234", hint: "Anthrazitgrau – zeitlos und elegant" },
  { label: "Weiß", color: "#E8E4DF", hint: "Verkehrsweiß – hell und minimalistisch" },
  { label: "Schwarz", color: "#0A0A0D", hint: "Tiefschwarz – markant und modern" },
];

const sizeOptions = [
  { label: "3×5 m", price: 5390 },
  { label: "3×6 m", price: 6090 },
  { label: "4×5 m", price: 6590 },
  { label: "4×6 m", price: 7290 },
];

const faqItems = [
  { q: "Ist der Carport für alle Fahrzeugtypen geeignet?", a: "Ja, unsere Carports sind in verschiedenen Größen erhältlich und bieten ausreichend Platz für PKW, SUVs und Transporter. Die größte Variante (4x6m) bietet Platz für zwei Fahrzeuge." },
  { q: "Wie wird der Carport montiert?", a: "Dank des SnapFIT™-Systems ist die Montage besonders einfach. Die Aluminium-Bauteile werden zusammengesteckt und verschraubt. Ein Aufbau zu zweit ist in wenigen Stunden möglich." },
  { q: "Ist der Carport wetterfest?", a: "Ja, der Carport ist aus korrosionsbeständigem 6063-T5 Aluminium gefertigt und hält Windgeschwindigkeiten bis 100 km/h sowie Schneelasten bis 120 kg/m² stand." },
  { q: "Brauche ich eine Baugenehmigung?", a: "Das hängt vom Bundesland und der Größe ab. In vielen Fällen sind freistehende Carports bis zu einer bestimmten Grundfläche genehmigungsfrei. Informieren Sie sich bei Ihrer Gemeinde." },
  { q: "Kann ich den Carport mit Seitenwänden ergänzen?", a: "Ja, optional können Screen-Rollos oder Schiebeverglasungen als seitlicher Wind- und Wetterschutz nachgerüstet werden." },
  { q: "In welchen Farben ist der Carport erhältlich?", a: "Der Carport ist in den Farben Anthrazit, Weiß und Schwarz erhältlich – passend zu jeder Fassade." },
];

const addonItems = [
  { title: "Warmweißes Licht", subtitle: "Warmes Ambiente-Licht", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>), color: "#F59E0B" },
  { title: "Kaltweiß Licht", subtitle: "Klares weißes Licht", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>), color: "#E2E8F0" },
  { title: "RGB-Beleuchtung", subtitle: "Farbwechsel & Stimmungslicht", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>), color: "#8B5CF6" },
  { title: "Perimeter-Beleuchtung", subtitle: "Umlaufende Randbeleuchtung", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18M3 3v18M3 21h18M21 3v18" /></svg>), color: "#82B2CA" },
  { title: "Spot-Beleuchtung", subtitle: "Integrierte Spots", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m1.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>), color: "#FCD34D" },
  { title: "Infrarot-Heizung", subtitle: "Wärme für kühle Tage", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>), color: "#EF4444" },
  { title: "Integrierte Steckdosen", subtitle: "Strom direkt am Carport", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>), color: "#10B981" },
  { title: "Soundsystem", subtitle: "Musik im Außenbereich", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>), color: "#6366F1" },
  { title: "Windsensor", subtitle: "Automatisch bei Windstärke", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" /></svg>), color: "#06B6D4" },
  { title: "Regensensor", subtitle: "Automatisch bei Regen", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>), color: "#3B82F6" },
  { title: "Schneesensor", subtitle: "Schutz bei Schneefall", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364" /></svg>), color: "#BAE6FD" },
  { title: "Sonnensensor", subtitle: "Automatisch bei Sonneneinstrahlung", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>), color: "#F59E0B" },
  { title: "Solar-System", subtitle: "Für Standorte ohne Stromanschluss", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>), color: "#84CC16" },
];

const formatPrice = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

const Stars = ({ count }: { count: number }) => (
  <span className="inline-flex gap-0.5 text-[#82B2CA]">
    {[1, 2, 3, 4, 5].map((i) => (
      <svg key={i} className="h-4 w-4" viewBox="0 0 24 24" fill={i <= count ? "currentColor" : "#d1d5db"}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </span>
);

/* ─────────────────────────────────────────────── */
export const CarportsPage = () => {
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [descExpanded, setDescExpanded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].label);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0].label);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => setShowStickyBar(!e.isIntersecting), { threshold: 0 });
    if (ctaRef.current) observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    let startX = 0;
    const handleStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const handleEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        setActiveImage((prev) => diff > 0 ? Math.min(prev + 1, gallery.length - 1) : Math.max(prev - 1, 0));
      }
    };
    el.addEventListener("touchstart", handleStart, { passive: true });
    el.addEventListener("touchend", handleEnd, { passive: true });
    return () => { el.removeEventListener("touchstart", handleStart); el.removeEventListener("touchend", handleEnd); };
  }, []);

  const sizeData = sizeOptions.find((s) => s.label === selectedSize) ?? sizeOptions[0];
  const finalPrice = sizeData.price;

  const handleAddToCart = () => {
    addToCart({
      productName: "Carport",
      image: gallery[0].src,
      color: selectedColor,
      size: selectedSize,
      mount: "",
      mountSurcharge: 0,
      sides: [],
      accessories: [],
      basePrice: finalPrice,
      totalPrice: finalPrice,
    });
  };

  return (
    <div className="relative overflow-x-hidden bg-white font-inter_tight text-neutral-900">
      <Header />
      <main role="main">

        {/* ── Product hero ── */}
        <section style={{ backgroundColor: '#344148' }}>
          {/* breadcrumb */}
          <div className="mx-auto max-w-[1440px] px-5 pt-6 md:px-12 lg:px-16">
            <div className="hidden items-center gap-2 text-sm text-white/40 md:flex">
              <Link to="/" className="hover:text-white transition-colors">Startseite</Link>
              <span>/</span>
              <span className="text-white/70">Carport</span>
            </div>
          </div>

          <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 pb-10 pt-4 md:px-12 lg:flex-row lg:items-start lg:gap-8 lg:px-16 lg:pb-16">
            {/* LEFT: Gallery */}
            <div className="w-full lg:w-[58%]">
              <div className="flex gap-3">
                {/* Vertical thumbnail strip */}
                <div className="hidden flex-col gap-2 md:flex">
                  {gallery.map((img, i) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${activeImage === i ? "border-[#82B2CA] opacity-100" : "border-transparent opacity-50 hover:opacity-80"}`}
                    >
                      <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Main image */}
                <div className="flex flex-1 flex-col gap-2">
                  <div ref={galleryRef} className="relative overflow-hidden rounded-2xl">
                    <img
                      src={gallery[activeImage].src}
                      alt={gallery[activeImage].alt}
                      className="aspect-[4/3] w-full object-cover md:h-[480px]"
                    />
                    <button
                      type="button"
                      onClick={() => setActiveImage((p) => Math.max(p - 1, 0))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveImage((p) => Math.min(p + 1, gallery.length - 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 md:hidden">
                      {gallery.map((_, i) => (
                        <button key={i} type="button" onClick={() => setActiveImage(i)} className={`h-1.5 rounded-full transition-all ${activeImage === i ? "w-5 bg-white" : "w-1.5 bg-white/40"}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Configurator card */}
            <div className="w-full lg:sticky lg:top-20 lg:w-[42%]">
              <div className="rounded-3xl bg-white p-6 shadow-2xl md:p-7">

                {/* reviews + badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Stars count={5} />
                    <span className="text-xs text-zinc-500">312 Bewertungen</span>
                  </div>
                  <span className="rounded-full bg-[#82B2CA]/15 px-3 py-1 text-xs font-semibold text-[#82B2CA]">Bestseller</span>
                </div>

                <h1 className="font-lemonmilk text-2xl font-bold leading-tight text-[#344148] md:text-3xl">Carport</h1>
                <p className="mt-1 text-sm text-zinc-500">Stilvoller Schutz für Ihr Fahrzeug</p>

                {/* description */}
                <div className="mt-3 border-t border-stone-100 pt-3">
                  <p className={`text-xs leading-5 text-zinc-500 ${!descExpanded ? "line-clamp-2" : ""}`}>
                    Der Carport aus hochwertigem Aluminium bietet zuverlässigen Schutz vor Regen, Schnee, Hagel und UV-Strahlung. Die robuste Konstruktion aus 6063-T5 Aluminium vereint modernes Design mit außergewöhnlicher Stabilität. Dank des SnapFIT™-Systems ist der Aufbau besonders einfach und schnell.
                  </p>
                  <button type="button" onClick={() => setDescExpanded(!descExpanded)} className="mt-0.5 text-xs font-semibold text-[#344148] underline underline-offset-2">
                    {descExpanded ? "Weniger" : "Mehr anzeigen"}
                  </button>
                </div>

                {/* price */}
                <div ref={ctaRef} className="mt-4 flex items-center justify-between rounded-2xl px-4 py-3" style={{ backgroundColor: '#344148' }}>
                  <div>
                    <p className="text-xs text-white/50">Gesamtpreis</p>
                    <span className="font-lemonmilk text-2xl font-bold text-white">{formatPrice(finalPrice)}</span>
                  </div>
                  <p className="text-right text-[10px] leading-4 text-white/40">Kostenloser<br />Versand ab 1.000 €</p>
                </div>

                {/* ── Configurator sections ── */}
                <div className="mt-5 space-y-5">
                  {/* Color */}
                  <div>
                    <p className="mb-2.5 text-xs font-bold uppercase tracking-widest text-zinc-400">Farbe</p>
                    <div className="flex flex-wrap gap-2">
                      {colorOptions.map((c) => (
                        <button key={c.label} type="button" onClick={() => setSelectedColor(c.label)}
                          className={`flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-xs font-medium transition-all ${selectedColor === c.label ? "border-[#344148] bg-[#344148] text-white" : "border-stone-200 text-zinc-600 hover:border-zinc-400"}`}>
                          <div className="h-4 w-4 rounded-full border border-white/30 shadow-sm" style={{ backgroundColor: c.color }} />
                          {c.label}
                        </button>
                      ))}
                    </div>
                    <p className="mt-1.5 text-xs text-zinc-400">{colorOptions.find((c) => c.label === selectedColor)?.hint}</p>
                  </div>

                  {/* Size */}
                  <div>
                    <p className="mb-2.5 text-xs font-bold uppercase tracking-widest text-zinc-400">Größe</p>
                    <div className="grid grid-cols-2 gap-2">
                      {sizeOptions.map((s) => (
                        <button key={s.label} type="button" onClick={() => setSelectedSize(s.label)}
                          className={`group relative flex flex-col gap-1.5 rounded-2xl border-2 px-3 py-3 text-left transition-all ${selectedSize === s.label ? "border-[#344148] bg-[#344148]/5 shadow-sm" : "border-stone-200 bg-white hover:border-[#82B2CA]/50 hover:bg-stone-50"}`}>
                          <div className="flex items-center justify-between gap-2">
                            <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all ${selectedSize === s.label ? "border-[#344148] bg-[#344148]" : "border-stone-300"}`}>
                              {selectedSize === s.label && (
                                <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                              )}
                            </div>
                            <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${selectedSize === s.label ? "bg-[#344148] text-white" : "bg-stone-100 text-zinc-600"}`}>
                              {formatPrice(s.price)}
                            </span>
                          </div>
                          <div className={`font-bold text-base leading-tight ${selectedSize === s.label ? "text-[#344148]" : "text-zinc-800"}`}>{s.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CTA buttons */}
                  <div className="grid gap-2 sm:grid-cols-2 pt-1">
                    <button type="button" onClick={handleAddToCart}
                      className="rounded-full py-3 text-center text-sm font-bold text-white transition hover:opacity-90 hover:shadow-lg"
                      style={{ backgroundColor: '#82B2CA' }}>
                      In den Warenkorb
                    </button>
                    <a href="tel:+4966141087500"
                      className="flex items-center justify-center gap-2 rounded-full border-2 border-[#344148] py-3 text-sm font-semibold text-[#344148] transition hover:bg-[#344148] hover:text-white">
                      Beratung anfragen
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Ticker ── */}
        <FeatureTicker backgroundColorClass="bg-[#344148]" />

        {/* ── Contact CTA ── */}
        <section className="bg-zinc-950 py-12 text-center text-white md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#82B2CA]">Über 100.000 zufriedene Kunden weltweit</p>
          <h2 className="mx-auto mt-3 max-w-xl text-3xl font-semibold md:text-4xl">Haben Sie noch Fragen?</h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-white/70">Unser Kundenservice-Team steht Ihnen gerne zur Verfügung. Kontaktieren Sie uns für eine persönliche Beratung.</p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link to="/contact" className="rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold transition hover:bg-white hover:text-zinc-900">Kontaktieren Sie uns</Link>
            <a href="tel:+49" className="rounded-full bg-[#82B2CA] px-6 py-2.5 text-sm font-semibold text-zinc-900 transition hover:opacity-90">Anrufen</a>
          </div>
        </section>

        {/* ── Optionale Ausstattung ── */}
        <section className="bg-[#344148] py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-4 md:px-16">
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full border border-[#82B2CA]/40 bg-[#82B2CA]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#82B2CA]">
                Optionale Ausstattung
              </span>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Gestalten Sie Ihren Carport</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-white/50">
                Wählen Sie die Ausstattung, die zu Ihrem Stil passt — alles direkt in die Struktur integriert.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {addonItems.map((item) => (
                <div
                  key={item.title}
                  className="group relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${item.color}18`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-0.5 text-xs text-white/40">{item.subtitle}</p>
                  </div>
                  <div
                    className="absolute right-4 top-4 h-2 w-2 rounded-full opacity-60"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <p className="text-sm text-white/40">
                Alle Optionen sind während der Bestellung konfigurierbar · Professionelle Montage verfügbar
              </p>
            </div>
          </div>
        </section>

        {/* ── Ticker bottom ── */}
        <FeatureTicker backgroundColorClass="bg-[#344148]" />

        {/* ── FAQ ── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white">
          <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#82B2CA]/20 blur-[100px]" />
          <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-[#82B2CA]/15 blur-[100px]" />

          <div className="relative max-w-[1440px] mx-auto px-4 py-16 md:px-16 md:py-[120px]">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#82B2CA]/10 border border-[#82B2CA]/30 px-4 py-1.5 mb-5">
                <svg className="h-4 w-4 text-[#82B2CA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
                <span className="text-sm font-semibold text-[#82B2CA]">Häufig gestellte Fragen</span>
              </div>
              <h2 className="text-zinc-900 text-[32px] font-bold leading-10 md:text-5xl md:leading-[58px]">
                Hast du noch Fragen?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-zinc-500 text-base md:text-lg">
                Hier findest du Antworten auf die häufigsten Fragen zum Carport.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
              <div className="flex flex-col gap-4">
                {faqItems.slice(0, 3).map((item, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div key={item.q} className="rounded-xl border border-stone-200 bg-white hover:shadow-lg transition-shadow overflow-hidden">
                      <button type="button" onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center gap-4 px-5 py-4 text-left">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#344148] flex items-center justify-center text-white font-bold text-sm">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <span className="text-sm font-semibold text-zinc-900 flex-1">{item.q}</span>
                        <span className={`flex-shrink-0 text-lg text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
                      </button>
                      {isOpen && <p className="px-5 pb-4 text-sm leading-6 text-zinc-600">{item.a}</p>}
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-4">
                {faqItems.slice(3).map((item, i) => {
                  const isOpen = openFaq === i + 3;
                  return (
                    <div key={item.q} className="rounded-xl border border-stone-200 bg-white hover:shadow-lg transition-shadow overflow-hidden">
                      <button type="button" onClick={() => setOpenFaq(isOpen ? null : i + 3)} className="flex w-full items-center gap-4 px-5 py-4 text-left">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#344148] flex items-center justify-center text-white font-bold text-sm">
                          {String(i + 4).padStart(2, "0")}
                        </div>
                        <span className="text-sm font-semibold text-zinc-900 flex-1">{item.q}</span>
                        <span className={`flex-shrink-0 text-lg text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
                      </button>
                      {isOpen && <p className="px-5 pb-4 text-sm leading-6 text-zinc-600">{item.a}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* ── Sticky mobile bottom bar ── */}
      <div className={`fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white px-4 py-3 shadow-[0_-2px_12px_rgba(0,0,0,.08)] transition-transform md:hidden ${showStickyBar ? "translate-y-0" : "translate-y-full"}`}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="text-lg font-bold text-zinc-950">{formatPrice(finalPrice)}</div>
            <div className="text-xs text-zinc-500">inkl. Versand</div>
          </div>
          <button type="button" onClick={handleAddToCart} className="rounded-xl px-6 py-3 text-sm font-bold text-white transition hover:opacity-90" style={{ backgroundColor: '#344148' }}>
            In den Warenkorb
          </button>
        </div>
      </div>
    </div>
  );
};
