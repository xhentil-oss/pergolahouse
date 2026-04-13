import photo1 from "../assets/image-pergola.png";
import photo2 from "../assets/image-light.png";
import photo3 from "../assets/Photo (26).png";
import photo4 from "../assets/pergola-glass.png";
import photo5 from "../assets/pergola-glass-guillot.png";
import photo6 from "../assets/zip-screen-pergola.png";

const gallery = [
  { src: photo1, alt: "Elegante Pergola – moderne minimaliste, ditë" },
  { src: photo2, alt: "Elegante Pergola – moderne minimaliste, natë" },
  { src: photo3, alt: "Elegante Pergola – LED RGB pranë pishinës" },
  { src: photo4, alt: "Elegante Pergola – me xhama, ambient kopshti" },
  { src: photo5, alt: "Elegante Pergola – me xhama, ambient relaksues" },
  { src: photo6, alt: "Elegante Pergola – klasik, pranë pishinës" },
];
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { FeatureTicker } from "@/sections/FeatureTicker";
import { useCart } from "@/context/CartContext";
import pergolaImg from "@/assets/pergola.png";
import photo18 from "@/assets/Photo (18).png";
import photo26 from "@/assets/Photo (26).png";
import icon1 from "@/assets/icon1.jpeg";
import icon4 from "@/assets/icon4.jpeg";
import icon6 from "@/assets/icon6.jpeg";
import icon11 from "@/assets/icon11.jpeg";
import icon17 from "@/assets/icon17.jpeg";
import icon18 from "@/assets/icon18.jpeg";
import icon10 from "@/assets/icon10.jpeg";

/* ─── variants ─── */
const colorOptions = [
  { label: "White 9016 T", color: "#E8E4DF", hint: "Verkehrsweiß – hell und minimalistisch" },
  { label: "Ivory 1015 T", color: "#D9C87A", hint: "Heller Elfenbeinton – warm und einladend" },
  { label: "Gray 7046 T", color: "#8E9196", hint: "Telegrau – dezent und vielseitig" },
  { label: "Gray 7016 T", color: "#2E3234", hint: "Anthrazitgrau – zeitlos und elegant" },
  { label: "Black 9005 T", color: "#0A0A0D", hint: "Tiefschwarz – markant und modern" },
];

const sizeOptions = [
  { label: "3x3m", price: 6490 },
  { label: "3x4m", price: 7190 },
  { label: "3x5m", price: 7890 },
  { label: "3x6m", price: 8590 },
  { label: "4x4m", price: 8990 },
  { label: "4x5m", price: 9690 },
  { label: "4x6m", price: 10390 },
];

import ikonaThjesht from "@/assets/ikona-thjesht.png";
import ikonaMuri from "@/assets/ikona-muri.png";
const mountOptions = [
  { label: "Freistehend", img: ikonaThjesht, surcharge: 0 },
  { label: "Wandmontage", img: ikonaMuri, surcharge: 240 },
];

import ikonaMajtas from "@/assets/ikona-majtas.png";
import ikonaDjathtas from "@/assets/ikona-djathtas.png";
import ikonaPerball from "@/assets/ikona-perball.png";
import ikonaMbrapa from "@/assets/ikona-mbrapa.png";
const sideOptions = [
  { key: "left", label: "Links", sizeLabel: "3m Seite", img: ikonaMajtas },
  { key: "right", label: "Rechts", sizeLabel: "3m Seite", img: ikonaDjathtas },
  { key: "front", label: "Vorne", sizeLabel: "3m Seite", img: ikonaPerball },
  { key: "back", label: "Hinten", sizeLabel: "3m Seite", img: ikonaMbrapa },
];

const sideTypeChoices = [
  { value: "none", label: "Keine", price: 0 },
  { value: "screen", label: "Screen Rollo", price: 499 },
  { value: "schiebeglas", label: "Schiebeverglasung", price: 899 },
  { value: "guillotine", label: "Guillotine-Verglasung", price: 1199 },
];

const accessoryOptions = [
  { label: "LED Warmweiß", description: "Warmweißes Licht für gemütliche Abende im Wintergarten.", price: 329 },
  { label: "LED RGB", description: "Farbwechsel-Beleuchtung für individuelle Stimmungen und Akzente.", price: 449 },
  { label: "Heizung", description: "Infrarot-Wärmestrahler für behagliche Wärme an kühleren Tagen.", price: 549 },
  { label: "Smart Steuerung", description: "Intelligente Steuerung per App – Lamellen, Licht und Heizung.", price: 399 },
];



/* ─── feature story (icon-based) ─── */
const featureStory = [
  { image: icon18 },
  { image: icon6 },
  { image: icon4 },
  { image: icon11 },
  { image: icon1 },
  { image: icon17 },
  { image: icon10 },
];

/* ─── service cards ─── */
const serviceCards = [
  { icon: "star", title: "Premium Qualität", text: "Hochwertige Materialien und Verarbeitung für langfristige Zufriedenheit" },
  { icon: "shield", title: "10 Jahre Garantie", text: "Umfassender Schutz und volle Sicherheit für Ihre Investition" },
  { icon: "lock", title: "Sichere Produkte", text: "Geprüftes Handwerk und zertifizierte Sicherheitsstandards" },
  { icon: "sparkle", title: "Modernes Design", text: "Zeitlose Ästhetik und innovative Technologie vereint" },
];

/* ─── helpers ─── */
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
export const WintergartenPage = () => {
  const { addToCart } = useCart();
  /* state */
  const [activeImage, setActiveImage] = useState(0);
  const [descExpanded, setDescExpanded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].label);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0].label);
  const [selectedMount, setSelectedMount] = useState(mountOptions[0].label);
  const [sides, setSides] = useState<Record<string, string>>({ left: "none", right: "none", front: "none", back: "none" });
  const [showAccessories, setShowAccessories] = useState(false);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  /* sticky bar on mobile */
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => setShowStickyBar(!e.isIntersecting), { threshold: 0 });
    if (ctaRef.current) observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  /* swipe support for mobile gallery */
  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    let startX = 0;
    const handleStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const handleEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        setActiveImage((prev) => {
          if (diff > 0) return Math.min(prev + 1, gallery.length - 1);
          return Math.max(prev - 1, 0);
        });
      }
    };
    el.addEventListener("touchstart", handleStart, { passive: true });
    el.addEventListener("touchend", handleEnd, { passive: true });
    return () => { el.removeEventListener("touchstart", handleStart); el.removeEventListener("touchend", handleEnd); };
  }, []);

  /* price calculation */
  const sizeData = sizeOptions.find((o) => o.label === selectedSize) ?? sizeOptions[0];
  const mountData = mountOptions.find((o) => o.label === selectedMount) ?? mountOptions[0];
  const sideTotal = Object.values(sides).reduce((sum, v) => {
    const choice = sideTypeChoices.find((c) => c.value === v);
    return sum + (choice?.price ?? 0);
  }, 0);
  const accTotal = accessoryOptions.filter((o) => selectedAccessories.includes(o.label)).reduce((s, o) => s + o.price, 0);
  const finalPrice = sizeData.price + mountData.surcharge + sideTotal + accTotal;

  const toggleAccessory = (label: string) =>
    setSelectedAccessories((c) => (c.includes(label) ? c.filter((x) => x !== label) : [...c, label]));

  const handleAddToCart = () => {
    const cartSides = sideOptions
      .filter((s) => sides[s.key] !== "none")
      .map((s) => {
        const choice = sideTypeChoices.find((c) => c.value === sides[s.key])!;
        return { key: s.key, label: s.label, type: choice.label, price: choice.price };
      });
    const cartAccessories = accessoryOptions
      .filter((o) => selectedAccessories.includes(o.label))
      .map((o) => ({ label: o.label, price: o.price }));

    addToCart({
      productName: "Wintergarten",
      image: gallery[0].src,
      color: selectedColor,
      size: selectedSize,
      mount: selectedMount,
      mountSurcharge: mountData.surcharge,
      sides: cartSides,
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
        <section className="bg-white">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 py-4 md:px-16 lg:flex-row lg:items-start lg:gap-12 lg:py-8">
            {/* Gallery */}
            <div className="w-full lg:w-[56%]">
              {/* breadcrumb */}
              <div className="mb-3 hidden items-center gap-2 text-sm text-zinc-400 md:flex">
                <Link to="/" className="hover:text-zinc-900">Startseite</Link><span>/</span>
                <span className="text-zinc-700">Wintergarten</span>
              </div>

              {/* main image + swipe */}
              <div ref={galleryRef} className="relative overflow-hidden rounded-2xl bg-stone-100 md:rounded-3xl">
                <img
                  src={gallery[activeImage].src}
                  alt={gallery[activeImage].alt}
                  className="aspect-square w-full object-cover md:aspect-[4/3] md:h-[520px]"
                />
                {/* dot indicators mobile */}
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 md:hidden">
                  {gallery.map((_, i) => (
                    <button key={i} type="button" onClick={() => setActiveImage(i)} className={`h-2 rounded-full transition-all ${activeImage === i ? "w-5 bg-white" : "w-2 bg-white/50"}`} />
                  ))}
                </div>
              </div>

              {/* thumbnail strip desktop */}
              <div className="mt-3 hidden gap-2 md:grid md:grid-cols-4">
                {gallery.map((img, i) => (
                  <button key={img.src} type="button" onClick={() => setActiveImage(i)} className={`overflow-hidden rounded-xl border-2 transition ${activeImage === i ? "border-zinc-900" : "border-transparent hover:border-stone-300"}`}>
                    <img src={img.src} alt={img.alt} className="h-24 w-full object-cover" />
                  </button>
                ))}
              </div>

              {/* feature highlights */}
              <div className="mt-5 grid grid-cols-4 gap-2">
                {featureStory.map((item, i) => (
                  <div key={i} className="overflow-hidden rounded-[20px] border border-stone-200 bg-stone-50">
                    <img src={item.image} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right column: configurator ── */}
            <div className="w-full lg:sticky lg:top-20 lg:w-[44%]">
              {/* reviews badge */}
              <div className="mb-2 flex items-center gap-2">
                <Stars count={5} />
                <span className="text-sm font-medium text-zinc-600">919 Bewertungen</span>
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">Wintergarten</h1>
              <h3 className="mt-1 text-lg font-semibold text-zinc-700">Ganzjährig nutzbar, stilvoll geschützt</h3>

              {/* expandable description */}
              <div className="relative mt-3">
                <p className={`text-sm leading-6 text-zinc-600 ${!descExpanded ? "line-clamp-3" : ""}`}>
                  Der Wintergarten ist ein hochwertiges Aluminium-System mit drehbaren Lamellen, integriertem Wasserablauf und rundum geschlossener Verglasung. Er verbindet modernes Design mit ganzjährigem Wetterschutz und schafft einen lichtdurchfluteten Wohnraum im Freien. Optional erhältlich mit LED-Beleuchtung, Regen- und Windsensoren, Smartphone-Steuerung sowie Heizung für die kalten Monate.
                </p>
                <button type="button" onClick={() => setDescExpanded(!descExpanded)} className="mt-1 text-sm font-semibold text-zinc-900 underline underline-offset-2">
                  {descExpanded ? "Weniger anzeigen" : "Mehr anzeigen"}
                </button>
              </div>

              {/* ── price ── */}
              <div className="mt-5 rounded-2xl bg-zinc-950 p-4 text-white md:p-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-semibold">{formatPrice(finalPrice)}</span>
                </div>
                <p className="mt-3 text-sm text-white/70">Kostenlose Lieferung ab 1.000 € Bestellwert</p>
              </div>

              {/* ── Configurator sections ── */}
              <div className="mt-5 space-y-5">
                {/* Color */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-700">Farbe<span className="text-zinc-400">.</span> <span className="font-normal text-zinc-500">Gewünschte Farbe auswählen</span></span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {colorOptions.map((c) => (
                      <button key={c.label} type="button" onClick={() => setSelectedColor(c.label)} className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-3 py-2 transition ${selectedColor === c.label ? "border-zinc-900" : "border-stone-200 hover:border-stone-400"}`}>
                        <div className="h-8 w-8 rounded-full border border-stone-200" style={{ backgroundColor: c.color }} />
                        <span className="text-xs font-medium text-zinc-700">{c.label}</span>
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-zinc-500">{colorOptions.find((c) => c.label === selectedColor)?.hint}</p>
                  <button type="button" className="mt-1 text-xs font-semibold text-zinc-900 underline underline-offset-2">Welche Farbe ist die passende?</button>
                </div>

                {/* Size */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-700">Größe<span className="text-zinc-400">.</span> <span className="font-normal text-zinc-500">Passende Größe auswählen</span></span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {sizeOptions.map((s) => (
                      <button key={s.label} type="button" onClick={() => setSelectedSize(s.label)} className={`rounded-xl border-2 py-2.5 text-center text-sm font-semibold transition ${selectedSize === s.label ? "border-zinc-900 bg-zinc-900 text-white" : "border-stone-200 text-zinc-700 hover:border-stone-400"}`}>
                        {s.label}
                      </button>
                    ))}
                  </div>
                  <button type="button" className="mt-2 text-xs font-semibold text-zinc-900 underline underline-offset-2">Richtige Größe wählen</button>
                </div>

                {/* Mount type */}
                <div>
                  <div className="mb-2">
                    <span className="text-sm font-semibold text-zinc-700">Aufbau Variante<span className="text-zinc-400">.</span> <span className="font-normal text-zinc-500">Wähle zwischen freistehend und Wandmontage</span></span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {mountOptions.map((m) => (
                      <button key={m.label} type="button" onClick={() => setSelectedMount(m.label)} className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition ${selectedMount === m.label ? "border-zinc-900 bg-zinc-50" : "border-stone-200 hover:border-stone-400"}`}>
                        <img src={m.img} alt={m.label} className="h-10 object-contain" />
                        <span className="text-sm font-semibold text-zinc-800">{m.label}</span>
                      </button>
                    ))}
                  </div>
                  <button type="button" className="mt-2 text-xs font-semibold text-zinc-900 underline underline-offset-2">Welche Variante ist die passende?</button>
                </div>

                {/* ── Side elements configurator ── */}
                <div>
                  <div className="mb-2">
                    <span className="text-sm font-semibold text-zinc-700">Seitenelemente<span className="text-zinc-400">.</span> <span className="font-normal text-zinc-500">Wähle passende Glaswände oder Screen Rollos.</span></span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {sideOptions.map((side) => (
                      <div key={side.key} className="flex flex-col items-center gap-2 rounded-xl border border-stone-200 p-3">
                        <img src={side.img} alt={side.label} className="h-14 object-contain" />
                        <span className="text-xs font-medium text-zinc-600">{side.sizeLabel}</span>
                        <select
                          value={sides[side.key]}
                          onChange={(e) => setSides((prev) => ({ ...prev, [side.key]: e.target.value }))}
                          className="w-full rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-xs text-zinc-700 focus:border-zinc-900 focus:outline-none"
                        >
                          {sideTypeChoices.map((choice) => (
                            <option key={choice.value} value={choice.value}>
                              {choice.label}{choice.price ? ` (+${formatPrice(choice.price)})` : ""}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Accessories (collapsible) ── */}
                <div>
                  <button type="button" onClick={() => setShowAccessories(!showAccessories)} className="flex w-full items-center justify-between rounded-xl border border-stone-200 px-4 py-3 text-left text-sm font-semibold text-zinc-700 transition hover:bg-stone-50">
                    <span>Optionales Zubehör</span>
                    <span className="text-zinc-400">{showAccessories ? "Ausblenden ▲" : "Zubehör anzeigen ▼"}</span>
                  </button>
                  {showAccessories && (
                    <div className="mt-3 space-y-2">
                      {accessoryOptions.map((acc) => {
                        const active = selectedAccessories.includes(acc.label);
                        return (
                          <button key={acc.label} type="button" onClick={() => toggleAccessory(acc.label)} className={`flex w-full items-center justify-between gap-3 rounded-xl border-2 p-3 text-left transition ${active ? "border-[#344148] bg-[#82B2CA]/10" : "border-stone-200 hover:border-stone-400"}`}>
                            <div>
                              <div className="text-sm font-semibold text-zinc-900">{acc.label}</div>
                              <div className="text-xs text-zinc-500">{acc.description}</div>
                            </div>
                            <div className="shrink-0 text-right">
                              <div className="text-sm font-semibold">+{formatPrice(acc.price)}</div>
                              <div className={`text-xs font-bold ${active ? "text-[#82B2CA]" : "text-zinc-400"}`}>{active ? "✓" : "+"}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>



                {/* ── CTA buttons ── */}
                <div ref={ctaRef} className="grid gap-3 sm:grid-cols-2">
                  <button type="button" onClick={handleAddToCart} className="rounded-xl py-3.5 text-center text-sm font-bold text-white transition hover:opacity-90" style={{ backgroundColor: '#344148' }}>
                    In den Warenkorb – {formatPrice(finalPrice)}
                  </button>
                  <a href="tel:+4966141087500" className="flex items-center justify-center gap-2 rounded-xl border border-zinc-900 py-3.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-900 hover:text-white">
                    Beratung anfragen
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Ticker ── */}
        <FeatureTicker backgroundColorClass="bg-[#344148]" />

        {/* ── Contact CTA ── */}
        <section className="bg-zinc-950 py-10 text-center text-white md:py-14">
          <p className="text-sm uppercase tracking-widest text-[#82B2CA]">über 100.000 zufriedene kunden weltweit</p>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">Haben Sie noch Fragen?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/70">Unser Kundenservice-Team steht Ihnen gerne zur Verfügung. Kontaktieren Sie uns für eine persönliche Beratung.</p>
          <div className="mt-6 flex justify-center gap-5">
            <a href="/contact" className="rounded-full border-2 border-white px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-zinc-950">
              Kontaktieren Sie uns
            </a>
            <a href="tel:+49123456789" className="rounded-full bg-[#82B2CA] px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-[#6fa1b8]">
              Anrufen
            </a>
          </div>
        </section>

        {/* ── Die beste Wahl ── */}
        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-[1440px] px-4 md:px-16">
            <h2 className="mb-8 text-center text-2xl font-bold text-zinc-900 md:text-3xl">Die beste Wahl für Ihr Zuhause</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {serviceCards.map((c) => {
                const getIcon = (iconType: string) => {
                  switch(iconType) {
                    case 'star':
                      return <svg className="h-12 w-12 text-zinc-700" fill="currentColor" viewBox="0 0 24 24" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>;
                    case 'shield':
                      return <svg className="h-12 w-12 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
                    case 'lock':
                      return <svg className="h-12 w-12 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm6-10V7a3 3 0 00-6 0v4a3 3 0 006 0z" /></svg>;
                    case 'sparkle':
                      return <svg className="h-12 w-12 text-zinc-700" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3 7.26L23 12l-8 .74L12 20l-3-7.26L1 12l8-.74L12 2z" /></svg>;
                    default:
                      return null;
                  }
                };
                return (
                  <div key={c.title} className="flex flex-col items-center rounded-2xl border border-stone-200 bg-stone-50 p-6 text-center">
                    {getIcon(c.icon)}
                    <h3 className="mt-4 text-sm font-bold text-zinc-900">{c.title}</h3>
                    <p className="mt-1 text-xs text-zinc-500">{c.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Ticker bottom ── */}
        <FeatureTicker backgroundColorClass="bg-[#344148]" />

        {/* ── FAQ ── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white">
          {/* decorative blobs */}
          <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#82B2CA]/20 blur-[100px]" />
          <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-[#82B2CA]/15 blur-[100px]" />

          <div className="relative max-w-[1440px] mx-auto px-4 py-16 md:px-16 md:py-[120px]">
            {/* header */}
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
                Hier findest du Antworten auf die häufigsten Fragen zum Wintergarten.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
              <div className="flex flex-col gap-4">
                {[
                  { q: "Ist der Wintergarten für ganzjährige Nutzung geeignet?", a: "Ja. Die Konstruktion aus 6063-T5 Aluminium mit rundum geschlossener Verglasung ist auf dauerhafte Nutzung im Außenbereich ausgelegt und bietet ganzjährigen Wetterschutz." },
                  { q: "Kann ich den Wintergarten selbst montieren?", a: "Ja. Der Wintergarten ist für einen unkomplizierten Aufbau konzipiert. Wenn du möchtest, kannst du zusätzlich einen Montageservice anfragen." },
                  { q: "Wie funktioniert die Belüftung?", a: "Die drehbaren Lamellen im Dach lassen sich stufenlos verstellen, sodass du Luftzirkulation, Licht und Schatten flexibel regulieren kannst." },
                ].map((item, i) => {
                  const isOpen = openFaq === i;
                  const bgColor = "bg-[#344148]";
                  return (
                    <div key={item.q} className="rounded-xl border border-stone-200 bg-white hover:shadow-lg transition-shadow overflow-hidden">
                      <button type="button" onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center gap-4 px-5 py-4 text-left">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center text-white font-bold text-sm`}>
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
                {[
                  { q: "Kann ich später Zubehör hinzufügen?", a: "Ja. LED-Beleuchtung, Heizung, Smart Steuerung und weitere Seitenelemente lassen sich jederzeit ergänzen." },
                  { q: "Wie wird der Wintergarten geliefert?", a: "Der Wintergarten wird per Spedition in mehreren Paketen geliefert. Ab 1.000 € Bestellwert ist die Lieferung kostenlos." },
                  { q: "Ist eine Baugenehmigung erforderlich?", a: "Das hängt vom Bundesland und der Größe ab. Nutze unseren Baugenehmigungscheck, um die Anforderungen für deinen Standort zu prüfen." },
                ].map((item, i) => {
                  const isOpen = openFaq === i + 3;
                  const bgColor = "bg-[#344148]";
                  return (
                    <div key={item.q} className="rounded-xl border border-stone-200 bg-white hover:shadow-lg transition-shadow overflow-hidden">
                      <button type="button" onClick={() => setOpenFaq(isOpen ? null : i + 3)} className="flex w-full items-center gap-4 px-5 py-4 text-left">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center text-white font-bold text-sm`}>
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
