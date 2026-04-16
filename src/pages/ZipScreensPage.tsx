import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { FeatureTicker } from "@/sections/FeatureTicker";
import { useCart } from "@/context/CartContext";
import pergolaImg from "../assets/image-pergola.png";
import lightImg from "../assets/image-light.png";
import photo26Img from "../assets/Photo (26).png";
import glassImg from "../assets/pergola-glass.png";
import glassGuillotImg from "../assets/pergola-glass-guillot.png";
import zipScreenImg from "../assets/zip-screen-pergola.png";

const gallery = [
  { src: pergolaImg, alt: "Pergola Moderne" },
  { src: lightImg, alt: "LED Beleuchtung" },
  { src: photo26Img, alt: "Pergola mit Zip-Screen" },
  { src: glassImg, alt: "Pergola mit Glasschiebetüren" },
  { src: glassGuillotImg, alt: "Pergola mit Guillotine-Glas" },
  { src: zipScreenImg, alt: "Zip-Screen Pergola" },
];

const colorOptions = [
  { label: "Anthrazit", color: "#2E3234", hint: "Anthrazitgrau – zeitlos und elegant" },
  { label: "Weiß", color: "#E8E4DF", hint: "Verkehrsweiß – hell und minimalistisch" },
  { label: "Schwarz", color: "#0A0A0D", hint: "Tiefschwarz – markant und modern" },
];

const sizeOptions = [
  { label: "3 m", price: 1390 },
  { label: "4 m", price: 1690 },
  { label: "5 m", price: 2390 },
  { label: "6 m", price: 2850 },
];

const faqItems = [
  { q: "Was ist der Unterschied zwischen Zip-Screen und Screen-Rollo?", a: "Der Zip-Screen verfügt über ein seitliches ZIP-Führungssystem, das das Gewebe fest in Aluminium-Schienen hält. Dadurch ist er windstabiler, bietet besseren Insektenschutz und lässt sich motorisiert bedienen. Das Screen-Rollo wird manuell per Hand bedient." },
  { q: "Ist der Zip-Screen mit meiner Pergola kompatibel?", a: "Die Zip-Screens sind mit allen Pergola-Modellen der Serien 2 und 3 kompatibel. Bei Pergola-Modellen mit 6 m Länge (mit Mittelpfosten) werden zwei 3-m-Zip-Screens benötigt." },
  { q: "Wie wird der Zip-Screen montiert?", a: "Die Montage erfolgt über das SnapFIT™-System direkt an der Pergola-Konstruktion. Die Führungsschienen werden seitlich befestigt, der motorisierte Antrieb wird angeschlossen – fertig." },
  { q: "Wie wird der Zip-Screen bedient?", a: "Der Zip-Screen wird bequem per Fernbedienung gesteuert. Optional ist eine Integration in Smart-Home-Systeme möglich, sodass Sie den Screen auch per App oder Sprachsteuerung bedienen können." },
  { q: "Ist der Zip-Screen wetterfest?", a: "Ja. Das pulverbeschichtete Aluminiumgestell und das UV-beständige Textilgewebe sind für den ganzjährigen Außeneinsatz konzipiert. Bei extremem Sturm sollte der Screen eingefahren werden." },
  { q: "Schützt der Zip-Screen vor Insekten?", a: "Ja, das feinmaschige Textilgewebe hält Mücken, Fliegen und andere Insekten zuverlässig fern – bei gleichzeitig guter Luftzirkulation und Durchsicht." },
];

const addonItems = [
  { title: "Warmweißes Licht", subtitle: "Warmes Ambiente-Licht", price: 299, icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>), color: "#F59E0B" },
  { title: "Kaltweiß Licht", subtitle: "Klares weißes Licht", price: 299, icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>), color: "#E2E8F0" },
  { title: "RGB-Beleuchtung", subtitle: "Farbwechsel & Stimmungslicht", price: 399, icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>), color: "#8B5CF6" },
  { title: "Perimeter-Beleuchtung", subtitle: "Umlaufende Randbeleuchtung", price: 449, icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18M3 3v18M3 21h18M21 3v18" /></svg>), color: "#82B2CA" },
  { title: "Spot-Beleuchtung", subtitle: "Integrierte Spots", price: 349, icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m1.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>), color: "#FCD34D" },
  { title: "Integrierte Steckdosen", subtitle: "Strom direkt am Screen", price: 199, icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>), color: "#10B981" },
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
export const ZipScreensPage = () => {
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [descExpanded, setDescExpanded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].label);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0].label);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
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
  const accTotal = addonItems.filter((o) => selectedAccessories.includes(o.title)).reduce((s, o) => s + o.price, 0);
  const finalPrice = sizeData.price + accTotal;

  const toggleAccessory = (title: string) =>
    setSelectedAccessories((c) => c.includes(title) ? c.filter((x) => x !== title) : [...c, title]);

  const handleAddToCart = () => {
    const cartAccessories = addonItems
      .filter((o) => selectedAccessories.includes(o.title))
      .map((o) => ({ label: o.title, price: o.price }));
    addToCart({
      productName: "Zip-Screen",
      image: gallery[0].src,
      color: selectedColor,
      size: selectedSize,
      mount: "",
      mountSurcharge: 0,
      sides: [],
      accessories: cartAccessories,
      basePrice: sizeData.price,
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
              <span className="text-white/70">Zip-Screen</span>
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
                    <span className="text-xs text-zinc-500">387 Bewertungen</span>
                  </div>
                  <span className="rounded-full bg-[#82B2CA]/15 px-3 py-1 text-xs font-semibold text-[#82B2CA]">Bestseller</span>
                </div>

                <h1 className="font-lemonmilk text-2xl font-bold leading-tight text-[#344148] md:text-3xl">Zip-Screen</h1>
                <p className="mt-1 text-sm text-zinc-500">Motorisierter Sicht- & Sonnenschutz mit ZIP-Technik</p>

                {/* description */}
                <div className="mt-3 border-t border-stone-100 pt-3">
                  <p className={`text-xs leading-5 text-zinc-500 ${!descExpanded ? "line-clamp-2" : ""}`}>
                    Das Zip-Screen-System ist eine exklusive Beschattungslösung für den Außenbereich, die effektiven Sonnen-, Sicht- und Windschutz mit modernem Design und hoher Funktionalität verbindet. Während das Caribe Zip Screen als vertikales System ideal für seitliche Abschirmungen, Fassaden und Pergolen geeignet ist, wurde das Pacific Zip Screen als horizontales System speziell für Glasdächer, Wintergärten und Überdachungen entwickelt. Beide Systeme überzeugen durch robuste Aluminiumprofile, langlebige Screen-Gewebe und eine stabile Zip-Führung, die den Stoff auch bei Wind sicher in Position hält. Optional sind sie mit Motorisierung, Fernbedienung, verschiedenen Stoff- und Farbvarianten sowie weiteren Komfortlösungen erhältlich.
                  </p>
                  <button type="button" onClick={() => setDescExpanded(!descExpanded)} className="mt-0.5 text-xs font-semibold text-[#344148] underline underline-offset-2">
                    {descExpanded ? "Weniger" : "Mehr anzeigen"}
                  </button>
                </div>

                {/* price */}
                <div ref={ctaRef} className="mt-4 rounded-2xl px-4 py-3" style={{ backgroundColor: '#344148' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white/50">Gesamtpreis</p>
                      <span className="font-lemonmilk text-2xl font-bold text-white">{formatPrice(finalPrice)}</span>
                    </div>
                    <p className="text-right text-[10px] leading-4 text-white/40">Kostenloser<br />Versand ab 1.000 €</p>
                  </div>
                  {accTotal > 0 && (
                    <div className="mt-2 border-t border-white/10 pt-2 flex items-center justify-between">
                      <span className="text-[10px] text-white/40">{sizeData.label} Grundpreis</span>
                      <span className="text-[10px] text-white/40">{formatPrice(sizeData.price)}</span>
                    </div>
                  )}
                  {accTotal > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-white/40">{selectedAccessories.length} Zubehör</span>
                      <span className="text-[10px]" style={{ color: "#82B2CA" }}>+{formatPrice(accTotal)}</span>
                    </div>
                  )}
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
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Erweitern Sie Ihren Zip-Screen</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-white/50">
                Wählen Sie die Ausstattung, die zu Ihrem Stil passt — alles direkt in die Struktur integriert.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {addonItems.map((item) => {
                const selected = selectedAccessories.includes(item.title);
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => toggleAccessory(item.title)}
                    className={`group relative flex flex-col gap-3 rounded-2xl border p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl ${selected ? "border-[#82B2CA] bg-[#82B2CA]/10" : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"}`}
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${item.color}18`, color: item.color }}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-0.5 text-xs text-white/40">{item.subtitle}</p>
                      <p className="mt-1.5 text-xs font-bold" style={{ color: "#82B2CA" }}>+{formatPrice(item.price)}</p>
                    </div>
                    <div className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all"
                      style={{ borderColor: selected ? "#82B2CA" : "rgba(255,255,255,0.2)", backgroundColor: selected ? "#82B2CA" : "transparent" }}>
                      {selected && (
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            {selectedAccessories.length > 0 && (
              <div className="mt-6 flex items-center justify-center gap-3">
                <span className="text-sm text-white/60">{selectedAccessories.length} Zubehör ausgewählt</span>
                <span className="text-sm font-bold text-white">+{formatPrice(accTotal)}</span>
              </div>
            )}
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
                Hier findest du Antworten auf die häufigsten Fragen zu deinem Zip-Screen.
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
