import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { FeatureTicker } from "@/sections/FeatureTicker";
import { useCart } from "@/context/CartContext";
import { getPromotion } from "@/config/promotions";
import { useDiscounts } from "@/context/DiscountContext";
import { usePrices } from "@/context/PriceContext";
import { Wintergarten3DViewer, SideSystem } from "@/components/Wintergarten3DViewer";
import photo1 from "../assets/wintergarden1.png";
import photo2 from "../assets/wintergarden2.png";
import photo3 from "../assets/wintergarden3.png";
import photo4 from "../assets/wintergarden4.png";
import photo5 from "../assets/wintergarden5.png";
import photo6 from "../assets/wintergarden6.png";
import photo7 from "../assets/wintergarden7.png";
import photo8 from "../assets/wintergarden8.png";
import photo9 from "../assets/wintergarden9.png";
import ikon1 from "@/assets/1 png.png";
import ikon2 from "@/assets/2 png (1).png";
import ikon3 from "@/assets/3 png.png";
import ikon4 from "@/assets/4 png.png";
import ikon5 from "@/assets/5 png.png";
import ikon6 from "@/assets/6 png.png";
import ikonaThjesht from "@/assets/ikona-thjesht.png";
import ikonaMuri from "@/assets/ikona-muri.png";
import ikonaMajtas from "@/assets/ikona-majtas.png";
import ikonaDjathtas from "@/assets/ikona-djathtas.png";
import ikonaPerball from "@/assets/ikona-perball.png";
import ikonaMbrapa from "@/assets/ikona-mbrapa.png";

const gallery = [
  { src: photo1, alt: "Wintergarten 1" },
  { src: photo2, alt: "Wintergarten 9" },
  { src: photo3, alt: "Wintergarten 3" },
  { src: photo4, alt: "Wintergarten 4" },
  { src: photo5, alt: "Wintergarten 5" },
  { src: photo6, alt: "Wintergarten 6" },
  { src: photo7, alt: "Wintergarten 7" },
  { src: photo8, alt: "Wintergarten 8" },
  { src: photo9, alt: "Wintergarten 2" },
];

const colorOptions = [
  { label: "7016 T", color: "#2E3234", hint: "Anthrazitgrau – zeitlos und elegant" },
  { label: "9016 T", color: "#F0EDE8", hint: "Verkehrsweiß – hell und minimalistisch" },
];

const breiteRange = { min: 1000, max: 20000, step: 1 };
const laengeRange = { min: 1000, max: 4500,  step: 1 };
const hoeheRange  = { min: 2000, max: 7300,  step: 1 };

const sideOptions = [
  { key: "left", label: "Links", img: ikonaMajtas },
  { key: "right", label: "Rechts", img: ikonaDjathtas },
  { key: "front", label: "Vorne", img: ikonaPerball },
  { key: "back", label: "Hinten", img: ikonaMbrapa },
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
  { title: "Warmweißes Licht", subtitle: "Warmes Ambiente-Licht", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>), color: "#F59E0B" },
  { title: "Kaltweiß Licht", subtitle: "Klares weißes Licht", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>), color: "#E2E8F0" },
  { title: "RGB-Beleuchtung", subtitle: "Farbwechsel & Stimmungslicht", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>), color: "#8B5CF6" },
  { title: "Perimeter-Beleuchtung", subtitle: "Umlaufende Randbeleuchtung", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18M3 3v18M3 21h18M21 3v18" /></svg>), color: "#82B2CA" },
  { title: "Spot-Beleuchtung", subtitle: "Integrierte Spots", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m1.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>), color: "#FCD34D" },
  { title: "Infrarot-Heizung", subtitle: "Wärme für kühle Tage", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>), color: "#EF4444" },
  { title: "Integrierte Steckdosen", subtitle: "Strom direkt am Wintergarten", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>), color: "#10B981" },
  { title: "Soundsystem", subtitle: "Musik im Wintergarten", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>), color: "#6366F1" },
  { title: "Windsensor", subtitle: "Automatisch bei Windstärke", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" /></svg>), color: "#06B6D4" },
  { title: "Regensensor", subtitle: "Automatisch bei Regen", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>), color: "#3B82F6" },
  { title: "Schneesensor", subtitle: "Schutz bei Schneefall", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364" /></svg>), color: "#BAE6FD" },
  { title: "Sonnensensor", subtitle: "Automatisch bei Sonneneinstrahlung", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>), color: "#F59E0B" },
  { title: "Solar-System", subtitle: "Für Standorte ohne Stromanschluss", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>), color: "#84CC16" },
  { title: "Smart Steuerung", subtitle: "Intelligente App-Steuerung", icon: (<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 15.75h3" /></svg>), color: "#82B2CA" },
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
export const WintergartenPage = () => {
  const { addToCart } = useCart();
  const { prices } = usePrices();

  const pricePerSqm = prices.wintergarten_perSqm;
  const mountOptions = [
    { label: "Freistehend", img: ikonaThjesht, surcharge: 0 },
    { label: "Wandmontage", img: ikonaMuri, surcharge: prices.wandmontage },
  ];
  const sideTypeChoices = [
    { value: "none", label: "Keine", price: 0 },
    { value: "guillotine", label: "Guillotine-Glassysteme", price: prices.guillotineVerglasung },
    { value: "faltglas", label: "Faltglassysteme", price: prices.faltglasverglasung },
    { value: "schiebeglas", label: "Schiebeglassysteme", price: prices.schiebeverglasung },
    { value: "zip", label: "Zip-Screens", price: prices.screenRollo },
  ];
  const accessoryCategories = [
    { key: "beleuchtung", label: "Beleuchtung", items: [
      { label: "Warmweißes Licht", description: "Warmweißes Licht für gemütliche Abende im Wintergarten.", price: prices.warmweissesLicht },
      { label: "Kaltweiß Licht", description: "Klares, modernes Kaltweiß-Licht.", price: prices.kaltweissLicht },
      { label: "RGB-Beleuchtung", description: "Farbwechsel-Beleuchtung für individuelle Stimmungen.", price: prices.rgbBeleuchtung },
      { label: "Perimeter-Beleuchtung", description: "Umlaufende Beleuchtung – dekorativer Premium-Effekt.", price: prices.perimeterBeleuchtung },
      { label: "Spot-Beleuchtung", description: "Integrierte Spots für gezielte Ausleuchtung.", price: prices.spotBeleuchtung },
    ]},
    { key: "sensoren", label: "Sensoren", items: [
      { label: "Windsensor", description: "Automatische Reaktion bei starkem Wind.", price: prices.windsensor },
      { label: "Regensensor", description: "Automatischer Schutz bei Regen.", price: prices.regensensor },
      { label: "Schneesensor", description: "Schutz bei Schneefall.", price: prices.schneesensor },
      { label: "Sonnensensor", description: "Automatisch bei starker Sonneneinstrahlung.", price: prices.sonnensensor },
      { label: "Solar-System", description: "Für Standorte ohne Stromanschluss.", price: prices.solarSystem },
    ]},
    { key: "komfort", label: "Heizung & Komfort", items: [
      { label: "Infrarot-Heizung", description: "Infrarot-Wärmestrahler für behagliche Wärme.", price: prices.infrarotHeizung },
      { label: "Integrierte Steckdosen", description: "Elektrische Steckdosen, integriert in die Pfosten.", price: prices.integriertSteckdosen },
      { label: "Soundsystem", description: "Integrierbares Soundsystem für Musik im Wintergarten.", price: prices.soundsystem },
      { label: "Smart Steuerung", description: "Intelligente Steuerung per App – Lamellen, Licht und Heizung.", price: prices.smartSteuerung },
    ]},
  ];
  const accessoryOptions = accessoryCategories.flatMap((c) => c.items);

  const [activeImage, setActiveImage] = useState(0);
  const [descExpanded, setDescExpanded] = useState(false);
  const [selectedColor, setSelectedColor] = useState("7016 T");
  const [breite, setBreite] = useState(3000);
  const [laenge, setLaenge] = useState(3000);
  const [hoehe, setHoehe] = useState(2800);
  const [breiteInput, setBreiteInput] = useState("3000");
  const [laengeInput, setLaengeInput] = useState("3000");
  const [hoeheInput, setHoeheInput] = useState("2800");
  const [selectedMount, setSelectedMount] = useState("Freistehend");
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
          if (diff > 0) return Math.min(prev + 1, gallery.length);
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
  const sizeLabel = `${breite}x${laenge}x${hoehe}mm`;
  const mountData = mountOptions.find((o) => o.label === selectedMount) ?? mountOptions[0];
  const sideTotal = Object.values(sides).reduce((sum, v) => {
    const choice = sideTypeChoices.find((c) => c.value === v);
    return sum + (choice?.price ?? 0);
  }, 0);
  const accTotal = accessoryOptions.filter((o) => selectedAccessories.includes(o.label)).reduce((s, o) => s + o.price, 0);
  const { isActive } = useDiscounts();
  const winterPromo = getPromotion("wintergarten");
  const discountFactor = (winterPromo && isActive("wintergarten")) ? (1 - prices.wintergarten_discountPercent / 100) : 1;
  const discountedBase = Math.round(basePrice * discountFactor);
  const finalPrice = discountedBase + mountData.surcharge + sideTotal + accTotal;
  const originalFinalPrice = basePrice + mountData.surcharge + sideTotal + accTotal;

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
              <span className="text-white/70">Wintergarten</span>
            </div>
          </div>

          <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 pb-10 pt-4 md:px-12 lg:grid lg:grid-cols-[58fr_42fr] lg:items-stretch lg:gap-8 lg:px-16 lg:pb-16">
            {/* LEFT: Gallery */}
            <div className="w-full">
              <div className="flex gap-3">
                {/* Vertical thumbnail strip */}
                <div className="hidden flex-col gap-2 md:flex">
                  {/* 3D view thumbnail */}
                  <button
                    type="button"
                    onClick={() => setActiveImage(0)}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all flex items-center justify-center ${activeImage === 0 ? "border-[#82B2CA] opacity-100 bg-[#344148]" : "border-transparent opacity-50 hover:opacity-80 bg-zinc-700"}`}
                  >
                    <span className="text-[10px] font-bold text-white tracking-wide">3D</span>
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
                        <Wintergarten3DViewer
                          breite={breite}
                          tiefe={laenge}
                          hoehe={hoehe}
                          color={selectedColor}
                          leftSystem={sides.left as SideSystem}
                          rightSystem={sides.right as SideSystem}
                          frontSystem={sides.front as SideSystem}
                        />
                      </div>
                    ) : (
                      <img
                        src={gallery[activeImage - 1].src}
                        alt={gallery[activeImage - 1].alt}
                        className="w-full object-contain"
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

                </div>
              </div>
            </div>

            {/* RIGHT: Configurator card */}
            <div className="w-full lg:max-h-[calc(100vh+130px)] lg:overflow-y-auto lg:pb-6 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
              <div className="rounded-3xl bg-white p-6 shadow-2xl md:p-7">

                <h1 className="font-lemonmilk text-2xl font-bold leading-tight text-[#344148] md:text-3xl">Wintergarten</h1>
                <p className="mt-1 text-sm text-zinc-500">Ganzjährig nutzbar, stilvoll geschützt</p>

                {/* description */}
                <div className="mt-3 border-t border-stone-100 pt-3">
                  <p className={`text-sm leading-5 text-zinc-500 ${!descExpanded ? "line-clamp-2" : ""}`}>
                    Der Wintergarten ist ein hochwertiges Aluminium- und Glassystem mit festem Glasdach, integrierter Wasserableitung und moderner, klarer Formensprache. Er schafft helle, offene Räume mit viel Tageslicht und bietet gleichzeitig zuverlässigen Schutz vor Witterungseinflüssen. Optional ist er mit Schiebe-, Guillotine- oder Zip-Systemen sowie weiteren Komfort- und Automatisierungslösungen erhältlich.
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
                      {winterPromo?.active && (
                        <span className="rounded-full px-2 py-0.5 text-[9px] font-bold text-white" style={{ backgroundColor: "#82B2CA" }}>
                          -{prices.wintergarten_discountPercent}%
                        </span>
                      )}
                    </div>
                    {winterPromo?.active && (
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
                        <button key={c.label} type="button" onClick={() => setSelectedColor(c.label)}
                          className={`flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-sm font-medium transition-all ${selectedColor === c.label ? "border-[#344148] bg-[#344148] text-white" : "border-stone-200 text-zinc-600 hover:border-zinc-400"}`}>
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
                          <span className="text-sm font-semibold text-[#344148]">Länge</span>
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
                          <span className="text-sm font-semibold text-[#344148]">Breite</span>
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
                          <span className="text-sm font-semibold text-[#344148]">Höhe</span>
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
                      {/* Dachneigung — fixed */}
                      <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2 border border-stone-200">
                        <span className="text-sm font-semibold text-[#344148]">Wasserabfluss (Dachneigung)</span>
                        <span className="rounded-md bg-[#344148] px-2 py-0.5 text-[11px] font-bold text-white">8°</span>
                      </div>
                    </div>
                  </div>

                  {/* Mount type */}
                  <div>
                    <p className="mb-2.5 text-xs font-bold uppercase tracking-widest text-zinc-400">Aufbau</p>
                    <div className="grid grid-cols-2 gap-2">
                      {mountOptions.map((m) => (
                        <button key={m.label} type="button" onClick={() => setSelectedMount(m.label)}
                          className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all ${selectedMount === m.label ? "border-[#344148] bg-[#344148]/5" : "border-stone-200 hover:border-zinc-300"}`}>
                          <img src={m.img} alt={m.label} className="h-9 object-contain" />
                          <span className={`text-sm font-semibold ${selectedMount === m.label ? "text-[#344148]" : "text-zinc-600"}`}>{m.label}</span>
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
                          <select
                            value={sides[side.key]}
                            onChange={(e) => setSides((prev) => ({ ...prev, [side.key]: e.target.value }))}
                            className="w-full rounded-lg border border-stone-200 bg-white px-1.5 py-1 text-xs text-zinc-700 focus:border-[#344148] focus:outline-none"
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

                  {/* Accessories */}
                  <div>
                    <p className="mb-2.5 text-xs font-bold uppercase tracking-widest text-zinc-400">Optionales Zubehör</p>
                    <div className="flex flex-col gap-3">
                      {accessoryCategories.map((cat) => {
                        const selectedInCat = cat.items.filter(i => selectedAccessories.includes(i.label)).length;
                        return (
                          <div key={cat.key} className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                            <div className="flex items-center gap-2 px-4 py-3" style={{ backgroundColor: '#82B2CA' }}>
                              <span className="flex-1 text-xs font-bold text-white tracking-wide">{cat.label}</span>
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
                                      <div className="text-sm font-semibold leading-tight text-zinc-800">{acc.label}</div>
                                      <div className="text-xs text-zinc-400">+{formatPrice(acc.price)}</div>
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

                  {/* CTA buttons */}
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

        {/* ── Contact CTA ── */}
        <section className="bg-zinc-950 py-10 md:py-16 px-4 text-center text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#82B2CA]">Über 100.000 zufriedene Kunden weltweit</p>
          <h2 className="mx-auto mt-3 max-w-xl text-2xl md:text-4xl font-semibold">Haben Sie noch Fragen?</h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-white/70">Unser Kundenservice-Team steht Ihnen gerne zur Verfügung. Kontaktieren Sie uns für eine persönliche Beratung.</p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link to="/contact" className="w-full sm:w-auto rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold transition hover:bg-white hover:text-zinc-900">Kontaktieren Sie uns</Link>
            <a href="tel:+49" className="w-full sm:w-auto rounded-full bg-[#82B2CA] px-6 py-2.5 text-sm font-semibold text-zinc-900 transition hover:opacity-90">Anrufen</a>
          </div>
        </section>

        {/* ── Optionale Ausstattung ── */}
        <section className="bg-[#344148] py-12 md:py-24">
          <div className="mx-auto max-w-[1440px] px-4 md:px-16">
            <div className="mb-8 md:mb-12 text-center">
              <span className="inline-block rounded-full border border-[#82B2CA]/40 bg-[#82B2CA]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#82B2CA]">
                Optionale Ausstattung
              </span>
              <h2 className="mt-4 text-2xl md:text-4xl font-bold text-white">Gestalten Sie Ihren Wintergarten</h2>
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

        {/* ── Produktinformation ── */}
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-4 md:px-16">
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full border border-[#82B2CA]/40 bg-[#82B2CA]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#82B2CA]">
                Einleitung
              </span>
              <h2 className="mt-4 text-2xl font-bold text-[#344148] md:text-4xl">Der Wintergarten</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base">
                Ein modernes, transparentes Glasdachsystem, das Wohn- und Gewerbeflächen mit natürlichem Licht, ganzjährigem Komfort und einem freien Panoramablick aufwertet.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3 mb-6">
              <div className="rounded-2xl border border-stone-100 bg-stone-50 p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#344148]">
                  <svg className="h-6 w-6 text-[#82B2CA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
                </div>
                <h3 className="mb-2 text-base font-bold text-[#344148]">Natürliches Licht & Panoramablick</h3>
                <p className="text-sm leading-relaxed text-zinc-500">Das transparente Glasdach sorgt für viel Tageslicht, ein helles offenes Ambiente und einen ungestörten Panoramablick — als harmonischer Übergang zwischen innen und außen.</p>
              </div>
              <div className="rounded-2xl border border-stone-100 bg-stone-50 p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#344148]">
                  <svg className="h-6 w-6 text-[#82B2CA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                </div>
                <h3 className="mb-2 text-base font-bold text-[#344148]">Energieeffizienz & Komfort</h3>
                <p className="text-sm leading-relaxed text-zinc-500">Gute Wärmedämmung und optionale intelligente Ausstattung wie LED-Beleuchtung sowie Regen-, Wind- und Schneesensoren verbessern das Raumklima und reduzieren den Energiebedarf.</p>
              </div>
              <div className="rounded-2xl border border-stone-100 bg-stone-50 p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#344148]">
                  <svg className="h-6 w-6 text-[#82B2CA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>
                </div>
                <h3 className="mb-2 text-base font-bold text-[#344148]">Vielseitigkeit & modernes Design</h3>
                <p className="text-sm leading-relaxed text-zinc-500">Erhältlich in verschiedenen Farben und Konfigurationen — mit Schiebesystemen, Automatisierung und integrierter Beleuchtung. Ideal für Wohnbereiche, Terrassen, Restaurants und Hotels.</p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-stone-100 bg-stone-50 p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#344148]">
                  <svg className="h-6 w-6 text-[#82B2CA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                </div>
                <h3 className="mb-2 text-base font-bold text-[#344148]">Integriertes Entwässerungssystem</h3>
                <p className="text-sm leading-relaxed text-zinc-500">Feste Sicherheitsglas-Paneele mit dezenter Neigung leiten Regenwasser zuverlässig ab. Die kontrollierte Entwässerung erfolgt unauffällig über die vorderen Stützen.</p>
              </div>
              <div className="rounded-2xl border border-stone-100 bg-stone-50 p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#344148]">
                  <svg className="h-6 w-6 text-[#82B2CA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                </div>
                <h3 className="mb-2 text-base font-bold text-[#344148]">Hochwertige Verarbeitung</h3>
                <p className="text-sm leading-relaxed text-zinc-500">Keine sichtbaren Schrauben, schmal gestaltete Zwischenprofile und hochwertige Oberflächen ergeben ein harmonisches, minimalistisches Erscheinungsbild.</p>
              </div>
              <div className="rounded-2xl border border-stone-100 bg-stone-50 p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#344148]">
                  <svg className="h-6 w-6 text-[#82B2CA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" /></svg>
                </div>
                <h3 className="mb-2 text-base font-bold text-[#344148]">Individuell erweiterbar</h3>
                <p className="text-sm leading-relaxed text-zinc-500">Flexibel anpassbar mit Guillotine-Systemen, Schiebesystemen oder Zip-Screens — für zusätzlichen Komfort, Wind- und Sichtschutz sowie ein modernes Gesamtbild.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Ticker bottom ── */}
        <FeatureTicker backgroundColorClass="bg-[#344148]" textColorClass="text-white" />

        {/* ── FAQ ── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white">
          <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#82B2CA]/20 blur-[100px]" />
          <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-[#82B2CA]/15 blur-[100px]" />

          <div className="relative max-w-[1440px] mx-auto px-4 py-12 md:px-16 md:py-[100px]">
            <div className="text-center mb-8 md:mb-14">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#82B2CA]/10 border border-[#82B2CA]/30 px-4 py-1.5 mb-5">
                <svg className="h-4 w-4 text-[#82B2CA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
                <span className="text-sm font-semibold text-[#82B2CA]">Häufig gestellte Fragen</span>
              </div>
              <h2 className="text-zinc-900 text-2xl md:text-5xl font-bold leading-snug">
                Hast du noch Fragen?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-zinc-500 text-sm md:text-lg">
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
                {[
                  { q: "Kann ich später Zubehör hinzufügen?", a: "Ja. LED-Beleuchtung, Heizung, Smart Steuerung und weitere Seitenelemente lassen sich jederzeit ergänzen." },
                  { q: "Wie wird der Wintergarten geliefert?", a: "Der Wintergarten wird per Spedition in mehreren Paketen geliefert. Ab 1.000 € Bestellwert ist die Lieferung kostenlos." },
                  { q: "Ist eine Baugenehmigung erforderlich?", a: "Das hängt vom Bundesland und der Größe ab. Nutze unseren Baugenehmigungscheck, um die Anforderungen für deinen Standort zu prüfen." },
                ].map((item, i) => {
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
      <div className={`fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white px-5 py-3 shadow-[0_-2px_12px_rgba(0,0,0,.08)] transition-transform lg:hidden ${showStickyBar ? "translate-y-0" : "translate-y-full"}`}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="text-base font-bold text-zinc-950">{formatPrice(finalPrice)}</div>
            <div className="text-xs text-zinc-400">inkl. aller Extras</div>
          </div>
          <button type="button" onClick={handleAddToCart} className="rounded-xl px-6 py-3 text-sm font-bold text-white transition hover:opacity-90" style={{ backgroundColor: '#344148' }}>
            In den Warenkorb
          </button>
        </div>
      </div>
    </div>
  );
};
