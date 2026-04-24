// Side options for the configurator
const sideOptions = [
  { key: "left", label: "Links", sizeLabel: "Seite", img: ikonaMajtas },
  { key: "right", label: "Rechts", sizeLabel: "Seite", img: ikonaDjathtas },
  { key: "front", label: "Vorne", sizeLabel: "Seite", img: ikonaPerball },
  { key: "back", label: "Hinten", sizeLabel: "Seite", img: ikonaMbrapa },
];

const sideTypeChoices = [
  { value: "none", label: "Keine", price: 0 },
  { value: "screen", label: "Screen Rollo", price: 499 },
  { value: "schiebeglas", label: "Schiebeverglasung", price: 899 },
  { value: "guillotine", label: "Guillotine-Verglasung", price: 1199 },
];

const accessoryCategories = [
  {
    key: "beleuchtung",
    label: "Beleuchtung",
    icon: "💡",
    items: [
      { label: "Warmweißes Licht", description: "Warmes Ambiente-Licht für gemütliche Abende.", price: 329 },
      { label: "Kaltweiß Licht", description: "Klares, modernes Kaltweiß-Licht für die Pergola.", price: 299 },
      { label: "RGB-Beleuchtung", description: "Farbwechsel-Beleuchtung für individuelle Stimmungen.", price: 449 },
      { label: "Perimeter-Beleuchtung", description: "Umlaufende Beleuchtung – dekorativer Premium-Effekt.", price: 389 },
      { label: "Spot-Beleuchtung", description: "Fokussierte Beleuchtung – integrierte Spots in der Struktur.", price: 279 },
    ],
  },
  {
    key: "sensoren",
    label: "Sensoren",
    icon: "📡",
    items: [
      { label: "Windsensor", description: "Schließt die Lamellen automatisch bei starkem Wind.", price: 249 },
      { label: "Regensensor", description: "Schließt die Lamellen automatisch bei Regen.", price: 219 },
      { label: "Schneesensor", description: "Automatischer Schutz gegen Schnee und Lasteinwirkungen.", price: 239 },
      { label: "Sonnensensor", description: "Regelt die Lamellen automatisch je nach Sonneneinstrahlung.", price: 229 },
      { label: "Solar-System", description: "Optionales Solarsystem für den Motor – ideal ohne Stromanschluss.", price: 699 },
    ],
  },
  {
    key: "heizung",
    label: "Heizung & Komfort",
    icon: "🔥",
    items: [
      { label: "Infrarot-Heizung", description: "Infrarot-Wärmestrahler für behagliche Wärme an kühlen Tagen.", price: 549 },
      { label: "Integrierte Steckdosen", description: "Elektrische Steckdosen, integriert in die Pergola-Pfosten.", price: 199 },
      { label: "Soundsystem", description: "Integrierbares Soundsystem – Musik überall unter der Pergola.", price: 599 },
    ],
  },
];

const accessoryOptions = accessoryCategories.flatMap((c) => c.items);

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { FeatureTicker } from "@/sections/FeatureTicker";
import { useCart } from "@/context/CartContext";
import { getPromotion } from "@/config/promotions";
import { useDiscounts } from "@/context/DiscountContext";
// Removed unused image imports
import ikon1 from "@/assets/1 png.png";
import ikon2 from "@/assets/2 png (1).png";
import ikon3 from "@/assets/3 png.png";
import ikon4 from "@/assets/4 png.png";
import ikon5 from "@/assets/5 png.png";
import ikon6 from "@/assets/6 png.png";
import { Pergola3DViewer } from "@/components/Pergola3DViewer";


import photo2 from "../assets/First page.png";
import photo3 from "../assets/6.png";
import photo4 from "../assets/5.png";
import photo5 from "../assets/3.png";
import photo6 from "../assets/4.png";
import photo7 from "../assets/2.png";
import photo8 from "../assets/1.png";

const gallery = [

  { src: photo2, alt: "Luxus-Pergola – Premium Design mit Pool" },
  { src: photo3, alt: "Luxus-Pergola – Anthrazit mit Gartenbereich" },
  { src: photo4, alt: "Luxus-Pergola – Business Outdoor Bereich" },
  { src: photo5, alt: "Luxus-Pergola – LED-Beleuchtung bei Nacht" },
  { src: photo6, alt: "Luxus-Pergola – Modernes Outdoor-Wohnen" },
  { src: photo7, alt: "Luxus-Pergola – Wintergarten mit Pool" },
  { src: photo8, alt: "Luxus-Pergola – Lamellen-Detailansicht" },
];

const colorOptions = [
  { label: "Gray 7016 T", color: "#2E3234", hint: "Anthrazitgrau – zeitlos und elegant" },
  { label: "Gray 7046 T", color: "#8E9196", hint: "Telegrau – dezent und vielseitig" },
  { label: "Black 9005 T", color: "#0A0A0D", hint: "Tiefschwarz – markant und modern" },
  { label: "Ivory 1015 T", color: "#D9C87A", hint: "Heller Elfenbeinton – warm und einladend" },
  { label: "White 9016 T", color: "#E8E4DF", hint: "Verkehrsweiß – hell und minimalistisch" },
];

const breiteRange = { min: 1000, max: 6950, step: 1 };
const laengeRange = { min: 1000, max: 4000, step: 1 };
const hoeheRange = { min: 1000, max: 3500, step: 1 };

const pricePerSqm = 445;

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
// sideOptions already declared above

// sideTypeChoices already declared above

// accessoryOptions already declared above

const featureStory = [
  { image: ikon1 },
  { image: ikon2 },
  { image: ikon3 },
  { image: ikon4 },
  { image: ikon5 },
  { image: ikon6 },
];


const addonItems = [
  {
    title: "Warmweißes Licht",
    subtitle: "Warmes Ambiente-Licht",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ),
    color: "#F59E0B",
  },
  {
    title: "Kaltweiß Licht",
    subtitle: "Klares weißes Licht",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ),
    color: "#E2E8F0",
  },
  {
    title: "RGB-Beleuchtung",
    subtitle: "Farbwechsel & Stimmungslicht",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    color: "#8B5CF6",
  },
  {
    title: "Perimeter-Beleuchtung",
    subtitle: "Umlaufende Randbeleuchtung",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18M3 3v18M3 21h18M21 3v18" />
      </svg>
    ),
    color: "#82B2CA",
  },
  {
    title: "Spot-Beleuchtung",
    subtitle: "Integrierte Spots",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m1.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: "#FCD34D",
  },
  {
    title: "Infrarot-Heizung",
    subtitle: "Wärme für kühle Tage",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
    color: "#EF4444",
  },
  {
    title: "Integrierte Steckdosen",
    subtitle: "Strom direkt an der Pergola",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "#10B981",
  },
  {
    title: "Soundsystem",
    subtitle: "Musik überall unter der Pergola",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    color: "#6366F1",
  },
  {
    title: "Windsensor",
    subtitle: "Automatisch bei Windstärke",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
      </svg>
    ),
    color: "#06B6D4",
  },
  {
    title: "Regensensor",
    subtitle: "Automatisch bei Regen",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    color: "#3B82F6",
  },
  {
    title: "Schneesensor",
    subtitle: "Schutz bei Schneefall",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364" />
      </svg>
    ),
    color: "#BAE6FD",
  },
  {
    title: "Sonnensensor",
    subtitle: "Automatisch bei Sonneneinstrahlung",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    color: "#F59E0B",
  },
  {
    title: "Solar-System",
    subtitle: "Für Standorte ohne Stromanschluss",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    color: "#84CC16",
  },
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

export const LuxusPergolaPage = () => {
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [louversOpen] = useState(true);
  const [descExpanded, setDescExpanded] = useState(false);
  const [selectedColor, setSelectedColor] = useState("Gray 7016 T");
  const [breite, setBreite] = useState(3000);
  const [laenge, setLaenge] = useState(3000);
  const [hoehe, setHoehe] = useState(2800);
  const [laengeInput, setLaengeInput] = useState("3000");
  const [breiteInput, setBreiteInput] = useState("3000");
  const [hoeheInput, setHoeheInput] = useState("2800");
  const [selectedMount, setSelectedMount] = useState(mountOptions[0].label);
  const [sides, setSides] = useState<Record<string, string>>({ left: "none", right: "none", front: "none", back: "none" });
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

  const sqm = (breite / 1000) * (laenge / 1000);
  const basePrice = Math.round(sqm * pricePerSqm);
  const mountData = mountOptions.find((o) => o.label === selectedMount) ?? mountOptions[0];
  const sideTotal = Object.values(sides).reduce((sum, v) => {
    const choice = sideTypeChoices.find((c) => c.value === v);
    return sum + (choice?.price ?? 0);
  }, 0);
  const accTotal = accessoryOptions.filter((o) => selectedAccessories.includes(o.label)).reduce((s, o) => s + o.price, 0);
  const { isActive } = useDiscounts();
  const luxusPromo = getPromotion("luxus-pergola");
  const discountFactor = (luxusPromo && isActive("luxus-pergola")) ? (1 - luxusPromo.discountPercent / 100) : 1;
  const discountedBase = Math.round(basePrice * discountFactor);
  const finalPrice = discountedBase + mountData.surcharge + sideTotal + accTotal;
  const originalFinalPrice = basePrice + mountData.surcharge + sideTotal + accTotal;

  const sizeLabel = `${breite}x${laenge}x${hoehe}mm`;

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
      productName: "Luxus Pergola",
      image: gallery[0].src,
      color: selectedColor,
      size: sizeLabel,
      mount: selectedMount,
      mountSurcharge: mountData.surcharge,
      sides: cartSides,
      accessories: cartAccessories,
      basePrice,
      totalPrice: finalPrice,
    });
  };

  return (
    <div className="relative overflow-x-hidden bg-white font-inter_tight text-neutral-900">
      <Header />
      <main role="main">
        <section style={{ backgroundColor: '#344148' }}>
          {/* breadcrumb */}
          <div className="mx-auto max-w-[1440px] px-5 pt-6 md:px-12 lg:px-16">
            <div className="hidden items-center gap-2 text-sm text-white/40 md:flex">
              <Link to="/" className="hover:text-white transition-colors">Startseite</Link>
              <span>/</span>
              <span className="text-white/70">Luxus Pergola</span>
            </div>
          </div>

          <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 pb-10 pt-4 md:px-12 lg:grid lg:grid-cols-[58fr_42fr] lg:items-start lg:gap-8 lg:px-16 lg:pb-16">
            {/* LEFT: Gallery */}
            <div className="w-full">
              <div className="flex gap-3">
                {/* Vertical thumbnail strip */}
                <div className="hidden flex-col gap-2 md:flex">
                  {/* 3D thumbnail */}
                  <button
                    type="button"
                    onClick={() => setActiveImage(0)}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all relative flex items-center justify-center bg-gradient-to-br from-stone-200 to-stone-100 ${activeImage === 0 ? "border-[#82B2CA] opacity-100" : "border-transparent opacity-50 hover:opacity-80"}`}
                  >
                    <svg className="h-7 w-7 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>
                    <span className="absolute bottom-1 text-[9px] font-semibold text-zinc-500">3D</span>
                  </button>
                  {gallery.map((img, i) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setActiveImage(i + 1)}
                      className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${activeImage === i + 1 ? "border-[#82B2CA] opacity-100" : "border-transparent opacity-50 hover:opacity-80"}`}
                    >
                      <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Main image + featureStory below */}
                <div className="flex flex-1 flex-col gap-2">
                  <div ref={galleryRef} className="relative overflow-hidden rounded-2xl">
                    {activeImage === 0 ? (
                      <div className="aspect-[4/3] w-full md:h-[480px]">
                        <Pergola3DViewer breite={breite} laenge={laenge} hoehe={hoehe} color={selectedColor} louversOpen={louversOpen} />
                      </div>
                    ) : (
                      <img
                        src={gallery[activeImage - 1].src}
                        alt={gallery[activeImage - 1].alt}
                        className="aspect-[4/3] w-full object-cover md:h-[480px]"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => setActiveImage((p) => Math.max(p - 1, 0))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveImage((p) => Math.min(p + 1, gallery.length))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 md:hidden">
                      {[...Array(gallery.length + 1)].map((_, i) => (
                        <button key={i} type="button" onClick={() => setActiveImage(i)} className={`h-1.5 rounded-full transition-all ${activeImage === i ? "w-5 bg-white" : "w-1.5 bg-white/40"}`} />
                      ))}
                    </div>
                  </div>
                  {/* Feature icons */}
                  <div className="grid grid-cols-3 gap-2">
                    {featureStory.map((item, i) => (
                      <div key={i} className="overflow-hidden rounded-xl">
                        <img src={item.image} alt="Feature" className="w-full h-full object-cover block" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Configurator card */}
            <div className="w-full lg:max-h-[calc(100vh+130px)] lg:overflow-y-auto lg:pb-6 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
              <div className="rounded-3xl bg-white p-6 shadow-2xl md:p-7">
              <h1 className="font-lemonmilk text-2xl font-bold leading-tight text-[#344148] md:text-3xl">Luxus Pergola</h1>
              <p className="mt-1 text-sm text-zinc-500">Deine Luxus Pergola – millimetergenau gefertigt</p>
              <div className="mt-3 border-t border-stone-100 pt-3">
                <p className={`text-[13px] leading-5 text-zinc-500 ${!descExpanded ? "line-clamp-2" : ""}`}>
                  Die Luxus-Pergola ist ein exklusives Aluminium-Pergolasystem mit vollständig einfahrbaren und drehbaren Lamellen, integriertem Wasserablauf und hoher Widerstandsfähigkeit gegenüber Witterungseinflüssen. Sie schafft elegante Außenräume mit maximalem Komfort und einem besonders großzügigen Raumgefühl, da sich das Dach vollständig öffnen lässt und die Lamellen zusätzlich flexibel gedreht werden können. So ermöglicht sie sowohl optimalen Schutz vor Sonne und Regen als auch eine individuelle Steuerung von Licht, Schatten und Belüftung. Optional ist sie mit LED-Beleuchtung, Regen- und Windsensoren, Smartphone-Steuerung sowie seitlichen Glas- oder Zip-Systemen erhältlich.
                </p>
                <button type="button" onClick={() => setDescExpanded(!descExpanded)} className="mt-0.5 text-xs font-semibold text-[#344148] underline underline-offset-2">
                  {descExpanded ? "Weniger" : "Mehr anzeigen"}
                </button>
              </div>
              <div ref={ctaRef} className="mt-4 flex items-center justify-between rounded-2xl px-4 py-3" style={{ backgroundColor: '#344148' }}>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-white/50">Gesamtpreis</p>
                    {luxusPromo?.active && (
                      <span className="rounded-full px-2 py-0.5 text-[9px] font-bold text-white" style={{ backgroundColor: "#82B2CA" }}>
                        -{luxusPromo.discountPercent}%
                      </span>
                    )}
                  </div>
                  {luxusPromo?.active && (
                    <span className="text-xs text-white/40 line-through">{formatPrice(originalFinalPrice)}</span>
                  )}
                  <span className="font-lemonmilk text-2xl font-bold text-white">{formatPrice(finalPrice)}</span>
                </div>
              </div>
              <div className="mt-5 space-y-5">
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
                  <p className="mt-1.5 text-[13px] text-zinc-400">{colorOptions.find((c) => c.label === selectedColor)?.hint}</p>
                </div>
                <div>
                  <p className="mb-2.5 text-xs font-bold uppercase tracking-widest text-zinc-400">Größe</p>
                  <div className="space-y-4 rounded-2xl bg-[#344148]/5 p-4">
                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-[13px] font-semibold text-[#344148]">Länge</span>
                        {(() => { const err = laengeInput !== "" && (Number(laengeInput) > laengeRange.max || Number(laengeInput) < laengeRange.min); return (
                        <div className={`flex items-center rounded-lg bg-white shadow-sm border ${err ? "border-red-400" : "border-stone-200"}`}>
                          <input type="number" value={laengeInput}
                            onFocus={() => setLaengeInput("")}
                            onChange={(e) => { setLaengeInput(e.target.value); const v = Number(e.target.value); if (!isNaN(v) && v > 0) setLaenge(v); }}
                            onBlur={() => { const v = Math.max(laengeRange.min, Math.min(laengeRange.max, Number(laengeInput) || laengeRange.min)); setLaenge(v); setLaengeInput(String(v)); }}
                            className={`w-16 bg-transparent pl-2.5 py-1 text-xs font-bold text-right outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${err ? "text-red-500" : "text-[#344148]"}`} />
                          <span className={`pr-2.5 text-xs font-bold ${err ? "text-red-500" : "text-[#344148]"}`}>mm</span>
                        </div>); })()}
                      </div>
                      <input type="range" min={laengeRange.min} max={laengeRange.max} step={laengeRange.step} value={laenge} onChange={(e) => { setLaenge(Number(e.target.value)); setLaengeInput(e.target.value); }}
                        className="h-1.5 w-full cursor-pointer appearance-none rounded-full [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#344148] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow"
                        style={{ background: `linear-gradient(to right, #82B2CA 0%, #82B2CA ${((laenge - laengeRange.min) / (laengeRange.max - laengeRange.min)) * 100}%, #d6d3d1 ${((laenge - laengeRange.min) / (laengeRange.max - laengeRange.min)) * 100}%, #d6d3d1 100%)` }}
                      />
                    </div>
                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-[13px] font-semibold text-[#344148]">Breite</span>
                        {(() => { const err = breiteInput !== "" && (Number(breiteInput) > breiteRange.max || Number(breiteInput) < breiteRange.min); return (
                        <div className={`flex items-center rounded-lg bg-white shadow-sm border ${err ? "border-red-400" : "border-stone-200"}`}>
                          <input type="number" value={breiteInput}
                            onFocus={() => setBreiteInput("")}
                            onChange={(e) => { setBreiteInput(e.target.value); const v = Number(e.target.value); if (!isNaN(v) && v > 0) setBreite(v); }}
                            onBlur={() => { const v = Math.max(breiteRange.min, Math.min(breiteRange.max, Number(breiteInput) || breiteRange.min)); setBreite(v); setBreiteInput(String(v)); }}
                            className={`w-16 bg-transparent pl-2.5 py-1 text-xs font-bold text-right outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${err ? "text-red-500" : "text-[#344148]"}`} />
                          <span className={`pr-2.5 text-xs font-bold ${err ? "text-red-500" : "text-[#344148]"}`}>mm</span>
                        </div>); })()}
                      </div>
                      <input type="range" min={breiteRange.min} max={breiteRange.max} step={breiteRange.step} value={breite} onChange={(e) => { setBreite(Number(e.target.value)); setBreiteInput(e.target.value); }}
                        className="h-1.5 w-full cursor-pointer appearance-none rounded-full [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#344148] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow"
                        style={{ background: `linear-gradient(to right, #82B2CA 0%, #82B2CA ${((breite - breiteRange.min) / (breiteRange.max - breiteRange.min)) * 100}%, #d6d3d1 ${((breite - breiteRange.min) / (breiteRange.max - breiteRange.min)) * 100}%, #d6d3d1 100%)` }}
                      />
                    </div>
                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-[13px] font-semibold text-[#344148]">Höhe</span>
                        {(() => { const err = hoeheInput !== "" && (Number(hoeheInput) > hoeheRange.max || Number(hoeheInput) < hoeheRange.min); return (
                        <div className={`flex items-center rounded-lg bg-white shadow-sm border ${err ? "border-red-400" : "border-stone-200"}`}>
                          <input type="number" value={hoeheInput}
                            onFocus={() => setHoeheInput("")}
                            onChange={(e) => { setHoeheInput(e.target.value); const v = Number(e.target.value); if (!isNaN(v) && v > 0) setHoehe(v); }}
                            onBlur={() => { const v = Math.max(hoeheRange.min, Math.min(hoeheRange.max, Number(hoeheInput) || hoeheRange.min)); setHoehe(v); setHoeheInput(String(v)); }}
                            className={`w-16 bg-transparent pl-2.5 py-1 text-xs font-bold text-right outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${err ? "text-red-500" : "text-[#344148]"}`} />
                          <span className={`pr-2.5 text-xs font-bold ${err ? "text-red-500" : "text-[#344148]"}`}>mm</span>
                        </div>); })()}
                      </div>
                      <input type="range" min={hoeheRange.min} max={hoeheRange.max} step={hoeheRange.step} value={hoehe} onChange={(e) => { setHoehe(Number(e.target.value)); setHoeheInput(e.target.value); }}
                        className="h-1.5 w-full cursor-pointer appearance-none rounded-full [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#344148] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow"
                        style={{ background: `linear-gradient(to right, #82B2CA 0%, #82B2CA ${((hoehe - hoeheRange.min) / (hoeheRange.max - hoeheRange.min)) * 100}%, #d6d3d1 ${((hoehe - hoeheRange.min) / (hoeheRange.max - hoeheRange.min)) * 100}%, #d6d3d1 100%)` }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="mb-2.5 text-xs font-bold uppercase tracking-widest text-zinc-400">Aufbau</p>
                  <div className="grid grid-cols-2 gap-2">
                    {mountOptions.map((m) => (
                      <button key={m.label} type="button" onClick={() => setSelectedMount(m.label)}
                        className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all ${selectedMount === m.label ? "border-[#344148] bg-[#344148]/5" : "border-stone-200 hover:border-zinc-300"}`}>
                        <img src={m.img} alt={m.label} className="h-9 object-contain" />
                        <span className={`text-xs font-semibold ${selectedMount === m.label ? "text-[#344148]" : "text-zinc-600"}`}>{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2.5 text-xs font-bold uppercase tracking-widest text-zinc-400">Seitenelemente</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {sideOptions.map((side) => (
                      <div key={side.key} className="flex flex-col items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 p-2.5">
                        <img src={side.img} alt={side.label} className="h-10 object-contain" />
                        <span className="text-[10px] font-semibold text-zinc-500">{side.label}</span>
                        <select
                          value={sides[side.key]}
                          onChange={(e) => setSides((prev) => ({ ...prev, [side.key]: e.target.value }))}
                          className="w-full rounded-lg border border-stone-200 bg-white px-1.5 py-1 text-[10px] text-zinc-700 focus:border-[#344148] focus:outline-none"
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
                <div>
                  <p className="mb-2.5 text-xs font-bold uppercase tracking-widest text-zinc-400">Optionales Zubehör</p>
                  <div className="flex flex-col gap-3">
                    {accessoryCategories.map((cat) => {
                      const selectedInCat = cat.items.filter(i => selectedAccessories.includes(i.label)).length;
                      return (
                        <div key={cat.key} className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                          <div className="flex items-center gap-2 px-4 py-3" style={{ backgroundColor: '#82B2CA' }}>
                            <span className="flex-1 text-[11px] font-bold text-white tracking-wide">{cat.label}</span>
                            {selectedInCat > 0 && (
                              <span className="rounded-full bg-white/30 px-2 py-0.5 text-[9px] font-bold text-white">{selectedInCat}</span>
                            )}
                          </div>
                          <div className="divide-y divide-stone-100">
                            {cat.items.map((acc) => {
                              const active = selectedAccessories.includes(acc.label);
                              const addonItem = addonItems.find(a => a.title === acc.label);
                              return (
                                <div key={acc.label} className={`flex items-center gap-2.5 px-3 py-2.5 transition-colors ${active ? "bg-[#344148]/5" : ""}`}>
                                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: addonItem ? `${addonItem.color}20` : '#f5f5f4', color: addonItem?.color }}>
                                    <div className="scale-75">{addonItem?.icon}</div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-[13px] font-semibold leading-tight text-zinc-800">{acc.label}</div>
                                    <div className="text-[10px] text-zinc-400">+{formatPrice(acc.price)}</div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => toggleAccessory(acc.label)}
                                    className={`shrink-0 flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold transition-all ${active ? "bg-zinc-800 text-white hover:bg-zinc-700" : "bg-[#344148] text-white hover:bg-[#82B2CA]"}`}
                                  >
                                    {active ? "−" : "+"}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-2 pt-1 lg:sticky lg:bottom-0 lg:bg-white lg:-mx-7 lg:px-7 lg:pb-4 lg:pt-3 lg:border-t lg:border-stone-100 lg:rounded-b-3xl">
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
        <FeatureTicker backgroundColorClass="bg-[#344148]" />
        <section className="bg-zinc-950 py-10 text-center text-white md:py-16 px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#82B2CA]">Über 100.000 zufriedene Kunden weltweit</p>
          <h2 className="mx-auto mt-3 max-w-xl text-2xl font-semibold md:text-4xl">Haben Sie noch Fragen?</h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-white/70">Unser Kundenservice-Team steht Ihnen gerne zur Verfügung. Kontaktieren Sie uns für eine persönliche Beratung.</p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 px-4">
            <Link to="/contact" className="w-full sm:w-auto rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold transition hover:bg-white hover:text-zinc-900 text-center">Kontaktieren Sie uns</Link>
            <a href="tel:+49" className="w-full sm:w-auto rounded-full bg-[#82B2CA] px-6 py-2.5 text-sm font-semibold text-zinc-900 transition hover:opacity-90 text-center">Anrufen</a>
          </div>
        </section>
        <section className="bg-[#344148] py-12 md:py-24">
          <div className="mx-auto max-w-[1440px] px-4 md:px-16">
            <div className="mb-8 md:mb-12 text-center">
              <span className="inline-block rounded-full border border-[#82B2CA]/40 bg-[#82B2CA]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#82B2CA]">
                Optionale Ausstattung
              </span>
              <h2 className="mt-4 text-2xl font-bold text-white md:text-4xl">Gestalten Sie Ihre Pergola</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-white/50">
                Wählen Sie die Ausstattung, die zu Ihrem Stil passt — alles direkt in die Struktur integriert.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {addonItems.map((item) => (
                <div
                  key={item.title}
                  className="group relative flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-xl hover:-translate-y-0.5"
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
        <FeatureTicker backgroundColorClass="bg-[#344148]" />
        <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white">
          <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#82B2CA]/20 blur-[100px]" />
          <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-[#82B2CA]/15 blur-[100px]" />
          <div className="relative max-w-[1440px] mx-auto px-4 py-12 md:px-16 md:py-[100px]">
            <div className="text-center mb-8 md:mb-14">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#82B2CA]/10 border border-[#82B2CA]/30 px-4 py-1.5 mb-4">
                <svg className="h-4 w-4 text-[#82B2CA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
                <span className="text-sm font-semibold text-[#82B2CA]">Häufig gestellte Fragen</span>
              </div>
              <h2 className="text-zinc-900 text-2xl font-bold leading-snug md:text-5xl md:leading-[58px]">
                Hast du noch Fragen?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-zinc-500 text-sm md:text-lg">
                Hier findest du Antworten auf die häufigsten Fragen zur Luxus Pergola.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
              <div className="flex flex-col gap-4">
                {[
                  { q: "Was unterscheidet die Luxus Pergola von der Standard-Pergola?", a: "Bei der Luxus Pergola wählst du Breite und Tiefe frei in cm – deine Pergola wird exakt nach deinen Wunschmaßen gefertigt. Qualität und Material sind identisch mit unseren Serienmodellen." },
                  { q: "Welche Maße sind möglich?", a: "Breite und Tiefe können jeweils zwischen 200 cm und 700 cm in 10-cm-Schritten frei gewählt werden." },
                  { q: "Kann ich die Pergola selbst montieren?", a: "Ja. Auch die Luxus Pergola nutzt das bewährte SnapFIT™-System für einen einfachen Aufbau. Bei Bedarf kannst du einen Montageservice anfragen." },
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
                  { q: "Wie wird der Preis berechnet?", a: "Der Preis berechnet sich nach der gewählten Fläche (m²) plus optionale Extras wie Seitenelemente, Zubehör und Montageart." },
                  { q: "Wie lange dauert die Lieferung?", a: "Die Luxus Pergola wird individuell produziert. Die Lieferzeit beträgt in der Regel 4–6 Wochen. Ab 1.000 € Bestellwert ist die Lieferung kostenlos." },
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
      <div className={`fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white px-4 py-3 shadow-[0_-2px_12px_rgba(0,0,0,.08)] transition-transform lg:hidden ${showStickyBar ? "translate-y-0" : "translate-y-full"}`}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="text-base font-bold text-zinc-950">{formatPrice(finalPrice)}</div>
            <div className="text-xs text-zinc-500">inkl. aller Extras</div>
          </div>
          <button type="button" onClick={handleAddToCart} className="rounded-xl px-5 py-3 text-sm font-bold text-white transition hover:opacity-90" style={{ backgroundColor: '#344148' }}>
            In den Warenkorb
          </button>
        </div>
      </div>
    </div>
  );
};

