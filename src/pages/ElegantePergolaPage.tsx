
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { FeatureTicker } from "@/sections/FeatureTicker";
import { useCart } from "@/context/CartContext";
import { getPromotion } from "@/config/promotions";
import { useDiscounts } from "@/context/DiscountContext";
import { usePrices } from "@/context/PriceContext";
import ikonaThjesht from "@/assets/ikona-thjesht.png";
import ikonaMuri from "@/assets/ikona-muri.png";
import ikonaMajtas from "@/assets/ikona-majtas.png";
import ikonaDjathtas from "@/assets/ikona-djathtas.png";
import ikonaPerball from "@/assets/ikona-perball.png";
import ikonaMbrapa from "@/assets/ikona-mbrapa.png";
import ikon1 from "@/assets/1 png.png";
import ikon2 from "@/assets/2 png (1).png";
import ikon3 from "@/assets/3 png.png";
import ikon4 from "@/assets/4 png.png";
import ikon5 from "@/assets/5 png.png";
import ikon6 from "@/assets/6 png.png";
import { Pergola3DViewer } from "@/components/Pergola3DViewer";
import zubehor from "@/assets/zubehor.png";
import permasa from "@/assets/permasat-elegante.png";
import montageVersion from "@/assets/pergola-modele-1.png";
import xhamaElegante from "@/assets/xhama-elegante.png";

import photo1 from "../assets/elegante6.jpg";
import photo2 from "../assets/elegante2.jpg";
import photo3 from "../assets/elegante3.jpg";
import photo4 from "../assets/elegante4.jpg";
import photo5 from "../assets/elegante5.jpg";
import photo6 from "../assets/elegante1.jpg";
import photo7 from "../assets/elegante7.jpg";
import photo8 from "../assets/elegante8.jpg";
import photo9 from "../assets/elegante9.jpg";

const gallery = [
  { src: photo1, alt: "Elegante Pergola 1" },
  { src: photo2, alt: "Elegante Pergola 2" },
  { src: photo3, alt: "Elegante Pergola 3" },
  { src: photo4, alt: "Elegante Pergola 4" },
  { src: photo5, alt: "Elegante Pergola 5" },
  { src: photo6, alt: "Elegante Pergola 6" },
  { src: photo7, alt: "Elegante Pergola 7" },
  { src: photo8, alt: "Elegante Pergola 8" },
  { src: photo9, alt: "Elegante Pergola 9" },
];

const colorOptions = [
  { label: "Gray 7016 T", color: "#2E3234", hint: "Anthrazitgrau – zeitlos und elegant" },
  { label: "Gray 7046 T", color: "#8E9196", hint: "Telegrau – dezent und vielseitig" },
  { label: "Black 9005 T", color: "#0A0A0D", hint: "Tiefschwarz – markant und modern" },
  { label: "Ivory 1015 T", color: "#D9C87A", hint: "Heller Elfenbeinton – warm und einladend" },
  { label: "White 9016 T", color: "#E8E4DF", hint: "Verkehrsweiß – hell und minimalistisch" },
];

const breiteRange = { min: 1000, max: 7000, step: 1 };
const laengeRange = { min: 1000, max: 5500, step: 1 };
const hoeheRange = { min: 1000, max: 3500, step: 1 };

const sideOptions = [
  { key: "left", label: "Links", sizeLabel: "Seite", img: ikonaMajtas },
  { key: "right", label: "Rechts", sizeLabel: "Seite", img: ikonaDjathtas },
  { key: "front", label: "Vorne", sizeLabel: "Seite", img: ikonaPerball },
  { key: "back", label: "Hinten", sizeLabel: "Seite", img: ikonaMbrapa },
];

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

export const ElegantePergolaPage = () => {
  const { addToCart } = useCart();
  const { prices } = usePrices();

  const pricePerSqm = prices.elegante_originalPrice / 9;
  const mountOptions = [
    { label: "Freistehend", img: ikonaThjesht, surcharge: 0 },
    { label: "Wandmontage", img: ikonaMuri, surcharge: prices.wandmontage },
  ];
  const sideTypeChoices = [
    { value: "none", label: "Keine", price: 0 },
    { value: "guillotine", label: "Guillotine-Glassysteme", price: prices.guillotineVerglasung },
    { value: "faltglas", label: "Faltglassysteme", price: prices.schiebeverglasung },
    { value: "schiebeglas", label: "Schiebeglassysteme", price: prices.schiebeverglasung },
    { value: "zip", label: "Zip-Screens", price: prices.screenRollo },
  ];
  const accessoryCategories = [
    { key: "beleuchtung", label: "Beleuchtung", icon: "💡", items: [
      { label: "Warmweißes Licht", description: "Warmes Ambiente-Licht für gemütliche Abende.", price: prices.warmweissesLicht },
      { label: "Kaltweiß Licht", description: "Klares, modernes Kaltweiß-Licht für die Pergola.", price: prices.kaltweissLicht },
      { label: "RGB-Beleuchtung", description: "Farbwechsel-Beleuchtung für individuelle Stimmungen.", price: prices.rgbBeleuchtung },
      { label: "Perimeter-Beleuchtung", description: "Umlaufende Beleuchtung – dekorativer Premium-Effekt.", price: prices.perimeterBeleuchtung },
      { label: "Spot-Beleuchtung", description: "Fokussierte Beleuchtung – integrierte Spots in der Struktur.", price: prices.spotBeleuchtung },
    ]},
    { key: "sensoren", label: "Sensoren", icon: "📡", items: [
      { label: "Windsensor", description: "Schließt die Lamellen automatisch bei starkem Wind.", price: prices.windsensor },
      { label: "Schneesensor", description: "Automatischer Schutz gegen Schnee und Lasteinwirkungen.", price: prices.schneesensor },
      { label: "Sonnensensor", description: "Regelt die Lamellen automatisch je nach Sonneneinstrahlung.", price: prices.sonnensensor },
    ]},
    { key: "heizung", label: "Heizung & Komfort", icon: "🔥", items: [
      { label: "Infrarot-Heizung", description: "Infrarot-Wärmestrahler für behagliche Wärme an kühlen Tagen.", price: prices.infrarotHeizung },
      { label: "Integrierte Steckdosen", description: "Elektrische Steckdosen, integriert in die Pergola-Pfosten.", price: prices.integriertSteckdosen },
      { label: "Soundsystem", description: "Integrierbares Soundsystem – Musik überall unter der Pergola.", price: prices.soundsystem },
    ]},
  ];
  const accessoryOptions = accessoryCategories.flatMap((c) => c.items);

  const [activeImage, setActiveImage] = useState(0);
  const [louversOpen] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [selectedColor, setSelectedColor] = useState("Gray 7016 T");
  const [breite, setBreite] = useState(3000);
  const [laenge, setLaenge] = useState(3000);
  const [hoehe, setHoehe] = useState(2800);
  const [laengeInput, setLaengeInput] = useState("3000");
  const [breiteInput, setBreiteInput] = useState("3000");
  const [hoeheInput, setHoeheInput] = useState("2800");
  const [selectedMount, setSelectedMount] = useState("Freistehend");
  const [sides, setSides] = useState<Record<string, string>>({ left: "none", right: "none", front: "none", back: "none" });
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  /* sticky bar on mobile: show once user scrolls past the CTA section */
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
  const sqm = (breite / 1000) * (laenge / 1000);
  const basePrice = Math.round(sqm * pricePerSqm);
  const mountData = mountOptions.find((o) => o.label === selectedMount) ?? mountOptions[0];
  const sideWallArea = (key: string) =>
    (key === "left" || key === "right")
      ? (laenge / 1000) * (hoehe / 1000)
      : (breite / 1000) * (hoehe / 1000);
  const sideTotal = Object.entries(sides).reduce((sum, [key, v]) => {
    const choice = sideTypeChoices.find((c) => c.value === v);
    return sum + Math.round((choice?.price ?? 0) * sideWallArea(key));
  }, 0);
  const accTotal = accessoryOptions.filter((o) => selectedAccessories.includes(o.label)).reduce((s, o) => s + Math.round(o.price * sqm), 0);
  const { isActive } = useDiscounts();
  const elegantePromo = getPromotion("elegante-pergola");
  const discountFactor = (elegantePromo && isActive("elegante-pergola")) ? (1 - prices.elegante_discountPercent / 100) : 1;
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
        return { key: s.key, label: s.label, type: choice.label, price: Math.round(choice.price * sideWallArea(s.key)) };
      });
    const cartAccessories = accessoryOptions
      .filter((o) => selectedAccessories.includes(o.label))
      .map((o) => ({ label: o.label, price: Math.round(o.price * sqm) }));

    addToCart({
      productName: "Elegante Pergola",
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
    <div className="relative overflow-x-hidden bg-white text-neutral-900">
      <Header />
      <main role="main">

        {/* ── Product hero ── */}
        <section style={{ backgroundColor: '#344148' }}>
          {/* breadcrumb */}
          <div className="mx-auto max-w-[1440px] px-5 pt-6 md:px-12 lg:px-16">
            <div className="hidden items-center gap-2 text-sm text-white/40 md:flex">
              <Link to="/" className="hover:text-white transition-colors">Startseite</Link>
              <span>/</span>
              <span className="text-white/70">Elegante Pergola</span>
            </div>
          </div>

          <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 pb-10 pt-4 md:px-12 lg:grid lg:grid-cols-[58fr_42fr] lg:items-start lg:gap-8 lg:px-16 lg:pb-16">

            {/* ── LEFT: Gallery ── */}
            <div className="w-full">
              <div ref={galleryRef} className="relative overflow-hidden rounded-2xl">
                {activeImage === 0 ? (
                  <div className="aspect-[4/3] w-full md:h-[480px]">
                    <Pergola3DViewer breite={breite} laenge={laenge} hoehe={hoehe} color={selectedColor} louversOpen={louversOpen} showRetract={false} leftPanel={sides.left} rightPanel={sides.right} frontPanel={sides.front} backPanel={sides.back} />
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

              {/* ── Photo grid ── */}
              <div className="mt-3 grid grid-cols-3 gap-1">
                {/* 3D thumbnail */}
                <button
                  type="button"
                  onClick={() => setActiveImage(0)}
                  className={`aspect-square overflow-hidden rounded-lg flex flex-col items-center justify-center gap-1 transition-all ${activeImage === 0 ? "ring-2 ring-[#82B2CA]" : "opacity-70 hover:opacity-100"}`}
                  style={{ backgroundColor: '#d1d5db' }}
                >
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                  <span className="text-[10px] font-bold text-white/80 tracking-widest">3D</span>
                </button>
                {/* Photo thumbnails */}
                {[
                  { src: photo8, idx: 8 },
                  { src: photo2, idx: 2 },
                  { src: photo3, idx: 3 },
                  { src: photo4, idx: 4 },
                  { src: photo5, idx: 5 },
                ].map(({ src, idx }) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(idx)}
                    className={`aspect-square overflow-hidden rounded-lg transition-all ${activeImage === idx ? "ring-2 ring-[#82B2CA]" : "opacity-80 hover:opacity-100"}`}
                  >
                    <img src={src} alt={`Elegante Pergola ${idx}`} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
                  </button>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Configurator card ── */}
            <div className="w-full lg:max-h-[calc(100vh+130px)] lg:overflow-y-auto lg:pb-6 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
              <div className="rounded-3xl bg-white p-6 shadow-2xl md:p-7">

                {/* title */}
                <h1 className="font-lemonmilk text-2xl font-bold leading-tight text-[#344148] md:text-3xl">
                  Elegante Pergola
                </h1>
                <p className="mt-1 text-sm text-zinc-500">Unser Original, jetzt noch besser!</p>

                {/* description */}
                <div className="mt-3 border-t border-stone-100 pt-3">
                  <p className={`text-sm leading-5 text-zinc-500 ${!descExpanded ? "line-clamp-2" : ""}`}>
                    Die elegante Pergola ist ein exklusives Aluminium-Pergolasystem mit drehbaren Lamellen, integriertem Wasserablauf und hoher Widerstandsfähigkeit gegenüber Witterungseinflüssen. Sie vereint modernes Design, eine präzise Licht- und Belüftungssteuerung sowie zuverlässigen Schutz vor Sonne, Regen und Schnee zu einer stilvollen Lösung für anspruchsvolle Außenbereiche. Optional ist sie mit LED-Beleuchtung, Regen- und Windsensoren, Smartphone-Steuerung sowie seitlichen Glas- oder Zip-Systemen erhältlich.
                  </p>
                  <button type="button" onClick={() => setDescExpanded(!descExpanded)} className="mt-0.5 text-xs font-semibold text-[#344148] underline underline-offset-2">
                    {descExpanded ? "Weniger" : "Mehr anzeigen"}
                  </button>
                </div>

                {/* price */}
                <div ref={ctaRef} className="mt-4 flex items-center justify-between rounded-2xl px-4 py-3" style={{ backgroundColor: '#344148' }}>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-white/50">Gesamtpreis</p>
                      {elegantePromo?.active && (
                        <span className="rounded-full px-2 py-0.5 text-[9px] font-bold text-white" style={{ backgroundColor: "#82B2CA" }}>
                          -{prices.elegante_discountPercent}%
                        </span>
                      )}
                    </div>
                    {elegantePromo?.active && (
                      <span className="text-xs text-white/40 line-through">{formatPrice(originalFinalPrice)}</span>
                    )}
                    <span className="font-lemonmilk text-2xl font-bold text-white">{formatPrice(finalPrice)}</span>
                  </div>
                </div>

                {/* ── Configurator sections ── */}
                <div className="mt-5 space-y-5">

                  {/* Color */}
                  <div>
                    <p className="mb-2.5 text-xs font-bold uppercase tracking-widest text-zinc-400">Farbe</p>
                    <div className="flex flex-wrap gap-2">
                      {colorOptions.map((c) => (
                        <button
                          key={c.label}
                          type="button"
                          onClick={() => setSelectedColor(c.label)}
                          className={`flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-sm font-medium transition-all ${selectedColor === c.label ? "border-[#344148] bg-[#344148] text-white" : "border-stone-200 text-zinc-600 hover:border-zinc-400"}`}
                        >
                          <div className="h-4 w-4 rounded-full border border-white/30 shadow-sm" style={{ backgroundColor: c.color }} />
                          {c.label}
                        </button>
                      ))}
                    </div>
                    <p className="mt-1.5 text-sm text-zinc-400">{colorOptions.find((c) => c.label === selectedColor)?.hint}</p>
                  </div>

                  {/* Size */}
                  <div>
                    <p className="mb-2.5 text-xs font-bold uppercase tracking-widest text-zinc-400">Größe</p>
                    <div className="space-y-4 rounded-2xl bg-[#344148]/5 p-4">
                      {/* Länge */}
                      <div>
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="text-sm font-medium text-[#344148]">Länge</span>
                          {(() => { const err = laengeInput !== "" && (Number(laengeInput) > laengeRange.max || Number(laengeInput) < laengeRange.min); return (
                          <div className={`flex items-center rounded-lg bg-white shadow-sm border ${err ? "border-red-400" : "border-stone-200"}`}>
                            <input type="number" value={laengeInput}
                              onFocus={() => setLaengeInput("")}
                              onChange={(e) => { setLaengeInput(e.target.value); const v = Number(e.target.value); if (!isNaN(v) && v > 0) setLaenge(v); }}
                              onBlur={() => { const v = Math.max(laengeRange.min, Math.min(laengeRange.max, Number(laengeInput) || laengeRange.min)); setLaenge(v); setLaengeInput(String(v)); }}
                              className={`w-20 bg-transparent pl-2.5 py-1 text-sm font-bold text-right outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${err ? "text-red-500" : "text-[#344148]"}`} />
                            <span className={`pr-2.5 text-sm font-bold ${err ? "text-red-500" : "text-[#344148]"}`}>mm</span>
                          </div>); })()}
                        </div>
                        <input type="range" min={laengeRange.min} max={laengeRange.max} step={laengeRange.step} value={laenge} onChange={(e) => { setLaenge(Number(e.target.value)); setLaengeInput(e.target.value); }}
                          className="h-1.5 w-full cursor-pointer appearance-none rounded-full [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#344148] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow"
                          style={{ background: `linear-gradient(to right, #82B2CA 0%, #82B2CA ${((laenge - laengeRange.min) / (laengeRange.max - laengeRange.min)) * 100}%, #d6d3d1 ${((laenge - laengeRange.min) / (laengeRange.max - laengeRange.min)) * 100}%, #d6d3d1 100%)` }}
                        />
                      </div>
                      {/* Breite */}
                      <div>
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="text-sm font-medium text-[#344148]">Breite</span>
                          {(() => { const err = breiteInput !== "" && (Number(breiteInput) > breiteRange.max || Number(breiteInput) < breiteRange.min); return (
                          <div className={`flex items-center rounded-lg bg-white shadow-sm border ${err ? "border-red-400" : "border-stone-200"}`}>
                            <input type="number" value={breiteInput}
                              onFocus={() => setBreiteInput("")}
                              onChange={(e) => { setBreiteInput(e.target.value); const v = Number(e.target.value); if (!isNaN(v) && v > 0) setBreite(v); }}
                              onBlur={() => { const v = Math.max(breiteRange.min, Math.min(breiteRange.max, Number(breiteInput) || breiteRange.min)); setBreite(v); setBreiteInput(String(v)); }}
                              className={`w-20 bg-transparent pl-2.5 py-1 text-sm font-bold text-right outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${err ? "text-red-500" : "text-[#344148]"}`} />
                            <span className={`pr-2.5 text-sm font-bold ${err ? "text-red-500" : "text-[#344148]"}`}>mm</span>
                          </div>); })()}
                        </div>
                        <input type="range" min={breiteRange.min} max={breiteRange.max} step={breiteRange.step} value={breite} onChange={(e) => { setBreite(Number(e.target.value)); setBreiteInput(e.target.value); }}
                          className="h-1.5 w-full cursor-pointer appearance-none rounded-full [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#344148] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow"
                          style={{ background: `linear-gradient(to right, #82B2CA 0%, #82B2CA ${((breite - breiteRange.min) / (breiteRange.max - breiteRange.min)) * 100}%, #d6d3d1 ${((breite - breiteRange.min) / (breiteRange.max - breiteRange.min)) * 100}%, #d6d3d1 100%)` }}
                        />
                      </div>
                      {/* Höhe */}
                      <div>
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="text-sm font-medium text-[#344148]">Höhe</span>
                          {(() => { const err = hoeheInput !== "" && (Number(hoeheInput) > hoeheRange.max || Number(hoeheInput) < hoeheRange.min); return (
                          <div className={`flex items-center rounded-lg bg-white shadow-sm border ${err ? "border-red-400" : "border-stone-200"}`}>
                            <input type="number" value={hoeheInput}
                              onFocus={() => setHoeheInput("")}
                              onChange={(e) => { setHoeheInput(e.target.value); const v = Number(e.target.value); if (!isNaN(v) && v > 0) setHoehe(v); }}
                              onBlur={() => { const v = Math.max(hoeheRange.min, Math.min(hoeheRange.max, Number(hoeheInput) || hoeheRange.min)); setHoehe(v); setHoeheInput(String(v)); }}
                              className={`w-20 bg-transparent pl-2.5 py-1 text-sm font-bold text-right outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${err ? "text-red-500" : "text-[#344148]"}`} />
                            <span className={`pr-2.5 text-sm font-bold ${err ? "text-red-500" : "text-[#344148]"}`}>mm</span>
                          </div>); })()}
                        </div>
                        <input type="range" min={hoeheRange.min} max={hoeheRange.max} step={hoeheRange.step} value={hoehe} onChange={(e) => { setHoehe(Number(e.target.value)); setHoeheInput(e.target.value); }}
                          className="h-1.5 w-full cursor-pointer appearance-none rounded-full [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#344148] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow"
                          style={{ background: `linear-gradient(to right, #82B2CA 0%, #82B2CA ${((hoehe - hoeheRange.min) / (hoeheRange.max - hoeheRange.min)) * 100}%, #d6d3d1 ${((hoehe - hoeheRange.min) / (hoeheRange.max - hoeheRange.min)) * 100}%, #d6d3d1 100%)` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mount */}
                  <div>
                    <p className="mb-2.5 text-xs font-bold uppercase tracking-widest text-zinc-400">Aufbau</p>
                    <div className="grid grid-cols-2 gap-2">
                      {mountOptions.map((m) => (
                        <button key={m.label} type="button" onClick={() => setSelectedMount(m.label)}
                          className={`flex flex-col items-center gap-2 rounded-3xl border-2 p-3 transition-all ${selectedMount === m.label ? "border-[#344148] bg-[#344148]/5" : "border-stone-200 hover:border-zinc-300"}`}>
                          <img src={m.img} alt={m.label} className="h-9 object-contain" />
                          <span className={`text-sm font-medium ${selectedMount === m.label ? "text-[#344148]" : "text-zinc-600"}`}>{m.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Side elements */}
                  <div>
                    <p className="mb-2.5 text-xs font-bold uppercase tracking-widest text-zinc-400">Seitenelemente</p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {sideOptions.map((side) => (
                        <div key={side.key} className="flex flex-col items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 p-2.5">
                          <img src={side.img} alt={side.label} className="h-10 object-contain" />
                          <span className="text-xs font-semibold text-zinc-500">{side.label}</span>
                          <select value={sides[side.key]} onChange={(e) => setSides((prev) => ({ ...prev, [side.key]: e.target.value }))}
                            className="w-full rounded-lg border border-stone-200 bg-white px-1.5 py-1 text-xs text-zinc-700 focus:border-[#344148] focus:outline-none">
                            {sideTypeChoices.map((choice) => (
                              <option key={choice.value} value={choice.value}>
                                {choice.label}{choice.price ? ` (${choice.price} €/m²)` : ""}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Accessories */}
                  <div>
                    <div className="mb-2.5 flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Optionales Zubehör</p>
                      {selectedAccessories.length > 0 && (
                        <span className="rounded-full bg-[#82B2CA] px-2 py-0.5 text-[10px] font-bold text-white">{selectedAccessories.length} gewählt</span>
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      {accessoryCategories.map((cat) => {
                        const selectedInCat = cat.items.filter(i => selectedAccessories.includes(i.label)).length;
                        return (
                          <div key={cat.key} className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                            {/* Category header */}
                            <div className="flex items-center gap-2 px-4 py-3" style={{ backgroundColor: '#82B2CA' }}>
                              <span className="flex-1 text-xs font-bold text-white tracking-wide">{cat.label}</span>
                              {selectedInCat > 0 && (
                                <span className="rounded-full bg-white/30 px-2 py-0.5 text-[9px] font-bold text-white">{selectedInCat}</span>
                              )}
                            </div>
                            {/* Items */}
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
                                      <div className="text-sm font-medium leading-tight text-zinc-800">{acc.label}</div>
                                      <div className="text-xs text-zinc-400">{acc.price} €</div>
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

                  {/* CTA */}
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


        {/* ── Premium Outdoor-Living ── */}
        <section className="bg-white overflow-hidden md:min-h-[400px] flex flex-col justify-center">
          <div className="mx-auto max-w-[1440px] px-6 md:px-16 w-full py-2">
            <div className="flex flex-col gap-10 md:flex-row md:gap-16 md:items-stretch">

              {/* Text */}
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-bold text-[#344148] md:text-3xl mb-5">
                  Premium Outdoor-Living für das ganze Jahr
                </h2>
                <p className="text-sm leading-relaxed text-[#344148]" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
                  Elegant Pergola steht für modernes Outdoor-Living auf höchstem Niveau. Die hochwertige Aluminiumkonstruktion mit drehbaren Lamellen verbindet zeitloses Design, zuverlässigen Wetterschutz und maximalen Komfort. Ob Sonne, Regen oder Schnee – durch das integrierte Entwässerungssystem, die flexible Lamellenausrichtung und optionale Ausstattung wie LED-Beleuchtung, Sensoren und Motorisierung entsteht ein exklusiver Außenbereich, der das ganze Jahr über nutzbar bleibt. Ideal für stilvolle Terrassen, Gärten, Hotels, Restaurants und Cafés.
                </p>
              </div>

              {/* Image */}
              <div className="w-full md:w-1/2 overflow-hidden rounded-2xl">
                <img src={photo6} alt="Elegant Pergola" className="w-full h-full object-cover" />
              </div>

            </div>
          </div>
        </section>

        {/* ── Ausstattung & Funktionen ── */}
        <section className="bg-[#f2f2f2] overflow-hidden md:min-h-[400px]">
          <div className="mx-auto max-w-[1440px] px-6 md:px-16 w-full">
            <div className="flex flex-col gap-8 md:flex-row md:gap-12 md:items-start">

              {/* Image - LEFT */}
              <div className="w-full md:w-1/2 flex-shrink-0 flex justify-center">
                <img src={zubehor} alt="Ausstattung" className="w-[75%] object-contain max-h-[360px]" />
              </div>

              {/* Features - RIGHT */}
              <div className="w-full md:w-1/2 flex flex-col mt-2">
                <h2 className="text-2xl font-bold text-[#344148] md:text-3xl mb-5">
                  Ausstattung &amp; Funktionen der Elegant Pergola
                </h2>
                <ul className="flex flex-col gap-0.5">
                  {[
                    "Stabile Aluminiumkonstruktion",
                    "Drehbare Lamellen bis 120°",
                    "Schutz vor Sonne, Regen und Schnee",
                    "Integrierte Entwässerung",
                    "Motorisierte Bedienung",
                    "LED-Beleuchtung optional",
                    "Automatische Sensoren optional",
                    "Smart-System/Smartphone-Steuerung optional",
                    "Infrarotheizung optional",
                    "230V-Steckdosen optional",
                    "Audiosystem optional",
                    "Solarsystem für den Motor optional",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#344148]" />
                      <span className="text-sm text-[#344148]" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>
        {/* ── Maximale Abmessungen ── */}
        <section className="bg-white overflow-hidden md:min-h-[400px]">
          <div className="mx-auto max-w-[1440px] px-6 md:px-16 w-full">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">

              {/* Left — content */}
              <div className="w-full md:w-1/2 flex flex-col mt-2">
                <h2 className="text-2xl font-bold text-[#344148] md:text-3xl mb-5">Maximale Abmessungen</h2>
                <ul className="flex flex-col gap-0.5">
                  {[
                    "Tiefe: bis ca. 5,5 m",
                    "Breite: bis ca. 7,0 m",
                    "Höhe: bis ca. 3,5 m",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#344148]" />
                      <span className="text-sm text-[#344148]" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — image */}
              <div className="w-full md:w-1/2 flex-shrink-0 mt-2">
                <img src={permasa} alt="Maximale Abmessungen" className="w-full object-contain max-h-[360px]" />
              </div>

            </div>
          </div>
        </section>

        {/* ── Montagevarianten ── */}
        <section className="bg-[#f2f2f2] overflow-hidden md:min-h-[400px]">
          <div className="mx-auto max-w-[1440px] px-6 md:px-16 w-full">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">

              {/* Left — image */}
              <div className="w-full md:w-1/2 flex-shrink-0 mt-2">
                <img src={montageVersion} alt="Montagevarianten" className="w-[80%] object-contain max-h-[360px]" />
              </div>

              {/* Right — text */}
              <div className="w-full md:w-1/2 flex flex-col mt-2">
                <h2 className="text-2xl font-bold text-[#344148] md:text-3xl mb-5">Montagevarianten</h2>
                <ul className="flex flex-col gap-0.5">
                  {[
                    "Freitragende Montage ohne Stützen",
                    "Montage mit 2 Stützen",
                    "Montage mit 3 Stützen",
                    "Montage mit 4 Stützen",
                    "Kombination mehrerer Module möglich",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#344148]" />
                      <span className="text-sm text-[#344148]" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ── Seitensysteme ── */}
        <section className="bg-white overflow-hidden md:min-h-[400px]">
          <div className="mx-auto max-w-[1440px] px-6 md:px-16">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">

              {/* Left — content */}
              <div className="w-full md:w-1/2 flex flex-col my-2">
                <h2 className="text-2xl font-bold text-[#344148] md:text-3xl mb-5">Seitensysteme</h2>
                <ul className="flex flex-col gap-0.5">
                  {[
                    "Guillotine-Glassysteme",
                    "Faltglassysteme",
                    "Schiebeglassysteme",
                    "Zip-Screens",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#344148]" />
                      <span className="text-sm text-[#344148]" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — image */}
              <div className="w-full md:w-1/2 flex-shrink-0 my-2">
                <img src={xhamaElegante} alt="Seitensysteme" className="w-full object-contain ml-16 max-h-[360px]" />
              </div>

            </div>
          </div>
        </section>

        {/* ── Ticker bottom ── */}
        <FeatureTicker backgroundColorClass="bg-[#344148]" textColorClass="text-white" />

        {/* ── FAQ ── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white">
          {/* decorative blobs */}
          <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#82B2CA]/20 blur-[100px]" />
          <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-[#82B2CA]/15 blur-[100px]" />

          <div className="relative max-w-[1440px] mx-auto px-4 py-12 md:px-16 md:py-[100px]">
            {/* header */}
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
                Hier findest du Antworten auf die häufigsten Fragen zur Eleganten Pergola.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
              <div className="flex flex-col gap-4">
                {[
                  { q: "Ist die Elegante Pergola für ganzjährige Nutzung geeignet?", a: "Ja. Die Konstruktion aus 6063-T5 Aluminium ist auf dauerhafte Nutzung im Außenbereich ausgelegt und widersteht Wind, Regen und hoher Schneelast." },
                  { q: "Kann ich die Pergola selbst montieren?", a: "Ja. Die Serie 3 ist für einen unkomplizierten Aufbau konzipiert. Wenn du möchtest, kannst du zusätzlich einen Montageservice anfragen." },
                  { q: "Wie funktioniert die Bedienung des Dachs?", a: "Die Lamellen werden manuell über eine leichtgängige Handkurbel verstellt. So regelst du Sonne, Schatten und Belüftung flexibel." },
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
                  { q: "Kann ich später Zubehör hinzufügen?", a: "Ja. Screen Rollos, Glaswände, LED-Beleuchtung und Wärmelampen lassen sich je nach Konfiguration passend ergänzen." },
                  { q: "Wie wird die Pergola geliefert?", a: "Die Pergola wird per Spedition in mehreren Paketen geliefert. Ab 1.000 € Bestellwert ist die Lieferung kostenlos." },
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
