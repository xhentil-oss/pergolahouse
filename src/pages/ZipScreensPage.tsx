import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { FeatureTicker } from "@/sections/FeatureTicker";
import { useCart } from "@/context/CartContext";

/* ─── image gallery ─── */
const gallery = [
  { src: "https://cdn.shopify.com/s/files/1/0575/2173/3813/files/Sundream_3x4_Screens-4x3.jpg?v=1711543068", alt: "Zip-Screen an Pergola – Hauptansicht" },
  { src: "https://cdn.shopify.com/s/files/1/0575/2173/3813/files/PSC_AC_ANT_600_ZIP_02.jpg?v=1723556288", alt: "Zip-Screen Anthrazit – Detail" },
  { src: "https://cdn.shopify.com/s/files/1/0575/2173/3813/files/ANTRACITE_5mSCREEN_ed7c811d-a98f-4873-b0c1-114f0f566658.png?v=1747734954", alt: "Zip-Screen Anthrazit 5m" },
  { src: "https://cdn.shopify.com/s/files/1/0575/2173/3813/files/BLACK_3mSCREEN_fb9bd088-6469-4520-b7ea-91432e336cbf.png?v=1747734992", alt: "Zip-Screen Schwarz 3m" },
  { src: "https://cdn.shopify.com/s/files/1/0575/2173/3813/files/Group_73.png?v=1749220146", alt: "Zip-Screen Weiß – Seitenansicht" },
  { src: "https://cdn.shopify.com/s/files/1/0575/2173/3813/files/White_5m_f359b606-9a43-43b4-96a4-61f7e9f4e0f4.png?v=1750923131", alt: "Zip-Screen Weiß 5m" },
];

/* ─── color options ─── */
const colorOptions = [
  { label: "Anthrazit", color: "#2E3234", hint: "Anthrazitgrau – zeitlos und elegant" },
  { label: "Weiß", color: "#E8E4DF", hint: "Verkehrsweiß – hell und minimalistisch" },
  { label: "Schwarz", color: "#0A0A0D", hint: "Tiefschwarz – markant und modern" },
];

/* ─── size options ─── */
const sizeOptions = [
  { label: "3m", price: 899, originalPrice: 1390 },
  { label: "4m", price: 1099, originalPrice: 1690 },
  { label: "5m", price: 1549, originalPrice: 2390 },
  { label: "6m", price: 1849, originalPrice: 2850 },
];

/* ─── highlights ─── */
const highlights = [
  { title: "ZIP-Führungssystem", text: "Das Gewebe wird seitlich in Alu-Schienen geführt – kein Flattern, keine Lücken, auch bei Wind." },
  { title: "Motorisiert", text: "Bequeme Bedienung per Fernbedienung oder Smart-Home-Integration – stufenlos hoch- und runterfahrbar." },
  { title: "Sonnen- & Sichtschutz", text: "Blockiert bis zu 95 % der UV-Strahlung und bietet zuverlässigen Sichtschutz von außen." },
  { title: "Windbeständig", text: "Dank ZIP-Technik stabil bei Windgeschwindigkeiten bis 80 km/h – auch bei Böen kein Flattern." },
  { title: "Insektenschutz", text: "Das feinmaschige Gewebe hält Mücken und Insekten fern – für ungestörte Abende im Freien." },
  { title: "Wetterfest & langlebig", text: "Pulverbeschichtetes Aluminium und UV-beständiges Textilgewebe trotzen jedem Wetter." },
];

/* ─── trust badges ─── */
const trustBadges = [
  { icon: "https://pergolux.de/cdn/shop/files/Shield_Check_54616393-e1cb-420b-80ab-1ce83c5de17f.png?crop=center&height=54&v=1752586038&width=54", label: "10 Jahre Garantie" },
  { icon: "https://pergolux.de/cdn/shop/files/Bill_Check.png?crop=center&height=48&v=1753781502&width=48", label: "Rechnungskauf" },
  { icon: "https://pergolux.de/cdn/shop/files/Confetti_198c4952-7307-43f9-8286-78ba45318c28.png?crop=center&height=46&v=1752586038&width=46", label: "+100.000 Kunden" },
  { icon: "https://pergolux.de/cdn/shop/files/Home_cef2a425-ad3f-4844-ae3d-e17d79c3ee77.png?crop=center&height=48&v=1757669933&width=48", label: "Wertsteigerung" },
];

/* ─── reviews ─── */
const reviewCards = [
  { name: "Thomas Ziegenbein", rating: 5, image: "https://pergolux.de/cdn/shop/files/PERGOLUX_Story_6_88a3e853-e322-4f21-ab7a-60175e9204a0.jpg?crop=center&format=pjpg&height=456&v=1741620042&width=289", quote: "Die Zip-Screens sind fantastisch! Kein Flattern bei Wind und die motorisierte Bedienung ist ein Traum." },
  { name: "Gisela Kleber", rating: 5, image: "https://pergolux.de/cdn/shop/files/SCR-20250326-njsp.jpg?crop=center&format=pjpg&height=456&v=1745919383&width=289", quote: "Endlich keine Mücken mehr auf der Terrasse! Die Zip-Screens halten alles draußen und sehen dabei toll aus." },
  { name: "Dieter T.", rating: 5, image: "https://pergolux.de/cdn/shop/files/SCR-20250326-nftx.jpg?crop=center&format=pjpg&height=456&v=1745919383&width=289", quote: "Netter Kontakt, schnelle Lieferung, gute Ware. Die motorisierte Bedienung funktioniert einwandfrei." },
  { name: "Sabine", rating: 4, image: "https://pergolux.de/cdn/shop/files/SCR-20250326-ngon.jpg?crop=center&format=pjpg&height=456&v=1745919382&width=289", quote: "Sehr gute Qualität. Die ZIP-Führung hält das Gewebe wirklich komplett straff – selbst bei stärkerem Wind." },
  { name: "Sven D.", rating: 5, image: "https://pergolux.de/cdn/shop/files/SCR-20250326-nhcv_e75cd03d-8413-4832-ba66-57a9befd2997.jpg?crop=center&format=pjpg&height=456&v=1745919503&width=289", quote: "Top Qualität. Der Sichtschutz ist perfekt und die Fernbedienung macht die Bedienung super bequem." },
  { name: "Martin Bayer", rating: 5, image: "https://pergolux.de/cdn/shop/files/SCR-20250326-nhot.jpg?crop=center&format=pjpg&height=456&v=1745919476&width=289", quote: "Ein sehr gutes Upgrade für unsere Pergola. Die Materialien sind hochwertig und die Verarbeitung tadellos." },
];

/* ─── service cards ─── */
const serviceCards = [
  { icon: "https://pergolux.de/cdn/shop/files/showroom.png?crop=center&height=51&v=1752586038&width=51", title: "Showroom", text: "Finde einen in deiner Nähe" },
  { icon: "https://pergolux.de/cdn/shop/files/Sledgehammer_3984b0e5-e932-44e2-b41b-4719568216c6.png?crop=center&height=72&v=1758108706&width=72", title: "Einfache Montage", text: "Benötigst du Hilfe bei der Installation?" },
  { icon: "https://pergolux.de/cdn/shop/files/delivery_628ce087-8faa-4b89-8d4e-0484def8bf68.png?crop=center&height=74&v=1752586038&width=74", title: "Schnelle Lieferung", text: "Ab 1.000 € kostenlos, verschiedene Optionen." },
  { icon: "https://pergolux.de/cdn/shop/files/expert-advice.png?crop=center&height=74&v=1752586039&width=74", title: "Expertenberatung", text: "Kontaktiere uns jederzeit bei Fragen." },
];

const bottomTrustBadges = [
  { icon: "https://pergolux.de/cdn/shop/files/Confetti_198c4952-7307-43f9-8286-78ba45318c28.png?crop=center&height=46&v=1752586038&width=46", title: "+100.000 zufriedene Kunden", text: "Über 100.000 zufriedene Kunden sprechen für die hohe Qualität." },
  { icon: "https://pergolux.de/cdn/shop/files/Cup_Star_7ee97793-32f0-4e9f-a94d-92c9ffa17b95.png?crop=center&height=66&v=1752586038&width=66", title: "Hochwertige Zip-Screens", text: "Mehrfach ausgezeichnet für Qualität und Langlebigkeit." },
  { icon: "https://pergolux.de/cdn/shop/files/weather.png?crop=center&height=74&v=1752586039&width=74", title: "Für alle Wetterbedingungen", text: "Genießen Sie Ihren Außenbereich das ganze Jahr über." },
];

/* ─── FAQ ─── */
const faqItems = [
  { q: "Was ist der Unterschied zwischen Zip-Screen und Screen-Rollo?", a: "Der Zip-Screen verfügt über ein seitliches ZIP-Führungssystem, das das Gewebe fest in Aluminium-Schienen hält. Dadurch ist er windstabiler, bietet besseren Insektenschutz und lässt sich motorisiert bedienen. Das Screen-Rollo wird manuell per Hand bedient." },
  { q: "Ist der Zip-Screen mit meiner Pergola kompatibel?", a: "Die Zip-Screens sind mit allen Pergola-Modellen der Serien 2 und 3 kompatibel. Bei Pergola-Modellen mit 6 m Länge (mit Mittelpfosten) werden zwei 3-m-Zip-Screens benötigt." },
  { q: "Wie wird der Zip-Screen montiert?", a: "Die Montage erfolgt über das SnapFIT™-System direkt an der Pergola-Konstruktion. Die Führungsschienen werden seitlich befestigt, der motorisierte Antrieb wird angeschlossen – fertig." },
  { q: "Wie wird der Zip-Screen bedient?", a: "Der Zip-Screen wird bequem per Fernbedienung gesteuert. Optional ist eine Integration in Smart-Home-Systeme möglich, sodass Sie den Screen auch per App oder Sprachsteuerung bedienen können." },
  { q: "Ist der Zip-Screen wetterfest?", a: "Ja. Das pulverbeschichtete Aluminiumgestell und das UV-beständige Textilgewebe sind für den ganzjährigen Außeneinsatz konzipiert. Bei extremem Sturm sollte der Screen eingefahren werden." },
  { q: "Schützt der Zip-Screen vor Insekten?", a: "Ja, das feinmaschige Textilgewebe hält Mücken, Fliegen und andere Insekten zuverlässig fern – bei gleichzeitig guter Luftzirkulation und Durchsicht." },
];

/* ─── helpers ─── */
const formatPrice = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

const createTargetDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 6);
  d.setHours(d.getHours() + 10);
  return d;
};

const getRemainingTime = (target: Date) => {
  const diff = Math.max(target.getTime() - Date.now(), 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    days: pad(Math.floor(diff / 864e5)),
    hours: pad(Math.floor((diff / 36e5) % 24)),
    minutes: pad(Math.floor((diff / 6e4) % 60)),
    seconds: pad(Math.floor((diff / 1e3) % 60)),
  };
};

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
  const [saleDeadline] = useState(createTargetDate);
  const [remainingTime, setRemainingTime] = useState(() => getRemainingTime(saleDeadline));
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [reviewPage, setReviewPage] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setRemainingTime(getRemainingTime(saleDeadline)), 1000);
    return () => clearInterval(id);
  }, [saleDeadline]);

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
  const originalPrice = sizeData.originalPrice;
  const savings = originalPrice - finalPrice;

  const handleAddToCart = () => {
    addToCart({
      productName: "Zip-Screen",
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

  const reviewsPerPage = 3;
  const pagedReviews = reviewCards.slice(reviewPage * reviewsPerPage, (reviewPage + 1) * reviewsPerPage);
  const totalReviewPages = Math.ceil(reviewCards.length / reviewsPerPage);

  return (
    <div className="relative overflow-x-hidden bg-white font-inter_tight text-neutral-900">
      <Header />
      <main role="main">

        {/* ── Product hero ── */}
        <section className="bg-white">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 py-4 md:px-16 lg:flex-row lg:items-start lg:gap-12 lg:py-8">
            {/* Gallery */}
            <div className="w-full lg:w-[56%]">
              <div className="mb-3 hidden items-center gap-2 text-sm text-zinc-400 md:flex">
                <Link to="/" className="hover:text-zinc-900">Startseite</Link><span>/</span>
                <Link to="/collections/pergola-zubehoer" className="hover:text-zinc-900">Zubehör</Link><span>/</span>
                <span className="text-zinc-700">Zip-Screen</span>
              </div>

              <div ref={galleryRef} className="relative overflow-hidden rounded-2xl bg-stone-100 md:rounded-3xl">
                <img
                  src={gallery[activeImage].src}
                  alt={gallery[activeImage].alt}
                  className="aspect-square w-full object-cover md:aspect-[4/3] md:h-[520px]"
                />
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 md:hidden">
                  {gallery.map((_, i) => (
                    <button key={i} type="button" onClick={() => setActiveImage(i)} className={`h-2 rounded-full transition-all ${activeImage === i ? "w-5 bg-white" : "w-2 bg-white/50"}`} />
                  ))}
                </div>
              </div>

              <div className="mt-3 hidden gap-2 md:grid md:grid-cols-4">
                {gallery.map((img, i) => (
                  <button key={img.src} type="button" onClick={() => setActiveImage(i)} className={`overflow-hidden rounded-xl border-2 transition ${activeImage === i ? "border-zinc-900" : "border-transparent hover:border-stone-300"}`}>
                    <img src={img.src} alt={img.alt} className="h-24 w-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div key={item.title} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                    <h4 className="text-sm font-bold text-zinc-900">{item.title}</h4>
                    <p className="mt-1.5 line-clamp-3 text-xs leading-5 text-zinc-500">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right column: configurator ── */}
            <div className="w-full lg:sticky lg:top-20 lg:w-[44%]">
              <div className="mb-2 flex items-center gap-2">
                <Stars count={5} />
                <span className="text-sm font-medium text-zinc-600">387 Bewertungen</span>
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">Zip-Screen</h1>
              <h3 className="mt-1 text-lg font-semibold text-zinc-700">Motorisierter Sicht- & Sonnenschutz mit ZIP-Technik.</h3>

              <div className="relative mt-3">
                <p className={`text-sm leading-6 text-zinc-600 ${!descExpanded ? "line-clamp-3" : ""}`}>
                  Der Zip-Screen ist die Premium-Lösung für Sonnen-, Sicht- und Insektenschutz an Ihrer Pergola. Dank des innovativen ZIP-Führungssystems wird das hochwertige Textilgewebe seitlich in Aluminium-Schienen geführt – für maximale Stabilität und einen lückenlosen Abschluss, selbst bei Wind. Die motorisierte Bedienung per Fernbedienung oder Smart-Home-Integration ermöglicht stufenloses Hoch- und Runterfahren. Das UV-beständige Gewebe blockiert bis zu 95 % der Sonnenstrahlung und hält Insekten zuverlässig fern – bei optimaler Luftzirkulation und Durchsicht.
                </p>
                <button type="button" onClick={() => setDescExpanded(!descExpanded)} className="mt-1 text-sm font-semibold text-zinc-900 underline underline-offset-2">
                  {descExpanded ? "Weniger anzeigen" : "Mehr anzeigen"}
                </button>
              </div>

              {/* ── price & sale ── */}
              <div className="mt-5 rounded-2xl bg-zinc-950 p-4 text-white md:p-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-semibold">{formatPrice(finalPrice)}</span>
                  <span className="text-base text-white/50 line-through">{formatPrice(originalPrice)}</span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-[#82B2CA] px-2.5 py-1 text-xs font-bold text-zinc-900">{formatPrice(savings)} SPAREN</span>
                  <span className="text-xs text-white/70">Sale endet in {remainingTime.days}t : {remainingTime.hours}h : {remainingTime.minutes}m : {remainingTime.seconds}s</span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-white/80">
                  <li>• Bis zu 35 % Rabatt auf Zubehör</li>
                  <li>• Kostenlose Lieferung ab 1.000 € Bestellwert</li>
                </ul>
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
                </div>

                {/* Size */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-700">Größe<span className="text-zinc-400">.</span> <span className="font-normal text-zinc-500">Passende Größe auswählen</span></span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {sizeOptions.map((s) => (
                      <button key={s.label} type="button" onClick={() => setSelectedSize(s.label)} className={`flex flex-col items-center gap-1 rounded-xl border-2 py-3 transition ${selectedSize === s.label ? "border-zinc-900 bg-zinc-950 text-white" : "border-stone-200 hover:border-stone-400"}`}>
                        <span className="text-sm font-semibold">{s.label}</span>
                        <span className={`text-xs ${selectedSize === s.label ? "text-white/70" : "text-zinc-500"}`}>{formatPrice(s.price)}</span>
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 rounded-lg bg-[#82B2CA]/10 p-2.5 text-xs leading-5 text-[#344148]">
                    <strong>ACHTUNG:</strong> Zip-Screens sind mit allen Modellen der Serien 2 und 3 kompatibel, jedoch nicht mit den Modellen der Serie 1. Bei Pergola-Modellen mit 6 m Länge (mit Mittelpfosten) werden zwei 3 m Zip-Screens benötigt.
                  </p>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap justify-center gap-4 rounded-xl bg-stone-50 py-3">
                  {trustBadges.map((b, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <img src={b.icon} alt="" className="h-6 w-6 object-contain" />
                      <span className="text-xs font-medium text-zinc-700">{b.label}</span>
                    </div>
                  ))}
                </div>

                {/* CTA buttons */}
                <div ref={ctaRef} className="space-y-3">
                  <button type="button" onClick={handleAddToCart} className="flex w-full items-center justify-center gap-3 rounded-xl bg-zinc-950 py-4 text-base font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.98]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121 0 2.045-.86 2.133-1.977l.615-6.923A1.125 1.125 0 0 0 20.585 4.5H6.75M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
                    In den Warenkorb · {formatPrice(finalPrice)}
                  </button>
                  <Link to="/contact" className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-zinc-200 py-3.5 text-sm font-semibold text-zinc-800 transition hover:border-zinc-400">
                    Beratung anfragen
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeatureTicker />

        {/* ── Social proof ── */}
        <section className="bg-zinc-950 py-10 text-center text-white md:py-14">
          <p className="text-sm uppercase tracking-widest text-white/50">Folge uns</p>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">Inspiration & Erfahrungen</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/60">Entdecke beeindruckende Projekte unserer Kunden auf Instagram und YouTube.</p>
          <div className="mt-6 flex justify-center gap-5">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/20">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
              Instagram
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/20">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              YouTube
            </a>
          </div>
        </section>

        {/* ── Reviews ── */}
        <section className="bg-stone-50 py-12 md:py-16">
          <div className="mx-auto max-w-[1440px] px-4 md:px-16">
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400">Kundenstimmen</p>
              <h2 className="mt-2 text-2xl font-bold text-zinc-900 md:text-3xl">Was unsere Kunden sagen</h2>
              <div className="mt-3 flex items-center justify-center gap-2">
                <Stars count={5} />
                <span className="text-sm font-medium text-zinc-600">4.86 / 5 – basierend auf 387 Bewertungen</span>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {pagedReviews.map((r) => (
                <div key={r.name} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                  <img src={r.image} alt={r.name} className="h-52 w-full object-cover" />
                  <div className="p-5">
                    <Stars count={r.rating} />
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">"{r.quote}"</p>
                    <p className="mt-3 text-xs font-semibold text-zinc-900">{r.name}</p>
                  </div>
                </div>
              ))}
            </div>
            {totalReviewPages > 1 && (
              <div className="mt-6 flex justify-center gap-2">
                {Array.from({ length: totalReviewPages }).map((_, i) => (
                  <button key={i} type="button" onClick={() => setReviewPage(i)} className={`h-2.5 rounded-full transition-all ${reviewPage === i ? "w-6 bg-zinc-900" : "w-2.5 bg-zinc-300"}`} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── "Die beste Wahl" ── */}
        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-[1440px] px-4 md:px-16">
            <h2 className="mb-8 text-center text-2xl font-bold text-zinc-900 md:text-3xl">Die beste Wahl für Ihr Zuhause</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {serviceCards.map((c) => (
                <div key={c.title} className="flex flex-col items-center rounded-2xl border border-stone-200 bg-stone-50 p-6 text-center">
                  <img src={c.icon} alt="" className="mb-3 h-12 w-12 object-contain" />
                  <h3 className="text-sm font-bold text-zinc-900">{c.title}</h3>
                  <p className="mt-1 text-xs text-zinc-500">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom trust badges ── */}
        <section className="bg-stone-50 py-10 md:py-14">
          <div className="mx-auto grid max-w-[1440px] gap-6 px-4 sm:grid-cols-3 md:px-16">
            {bottomTrustBadges.map((b) => (
              <div key={b.title} className="flex flex-col items-center text-center">
                <img src={b.icon} alt="" className="mb-3 h-12 w-12 object-contain" />
                <h3 className="text-sm font-bold text-zinc-900">{b.title}</h3>
                <p className="mt-1 text-xs text-zinc-500">{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        <FeatureTicker />

        {/* ── FAQ ── */}
        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-4 md:px-16">
            <h2 className="mb-8 text-center text-2xl font-bold text-zinc-900 md:text-3xl">Häufig gestellte Fragen</h2>
            <div className="divide-y divide-stone-200">
              {faqItems.map((item, i) => (
                <div key={i}>
                  <button type="button" className="flex w-full items-center justify-between py-4 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="text-sm font-semibold text-zinc-900 md:text-base">{item.q}</span>
                    <svg className={`ml-4 h-5 w-5 shrink-0 text-zinc-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {openFaq === i && <p className="pb-4 text-sm leading-relaxed text-zinc-600">{item.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ── Sticky mobile bar ── */}
      {showStickyBar && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-zinc-900">Zip-Screen</p>
              <p className="text-lg font-bold text-zinc-950">{formatPrice(finalPrice)}</p>
            </div>
            <button type="button" onClick={handleAddToCart} className="rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white">
              In den Warenkorb
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
