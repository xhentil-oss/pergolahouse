import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { FeatureTicker } from "@/sections/FeatureTicker";
import { useCart } from "@/context/CartContext";
import pergolaImg from "@/assets/pergola.png";
import photo18 from "@/assets/Photo (18).png";
import photo26 from "@/assets/Photo (26).png";

/* ─── image gallery ─── */
const gallery = [
  { src: pergolaImg, alt: "Preiswerte Pergola" },
  { src: photo18, alt: "Preiswerte Pergola – Ansicht 2" },
  { src: photo26, alt: "Preiswerte Pergola – Ansicht 3" },
  { src: "https://pergolux.de/cdn/shop/files/Background_2925695b-1454-42a8-a462-afa20b8f07be.png?crop=center&height=900&v=1746170598&width=1200", alt: "Preiswerte Pergola – Outdoor-Bereich" },
  { src: "https://pergolux.de/cdn/shop/files/S3_Stronger_than_ever5.png?crop=center&height=900&v=1745831741&width=1200", alt: "Aluminium-Detailansicht" },
  { src: "https://pergolux.de/cdn/shop/files/effortless-assembly_a659fcec-e1e2-42e3-8b42-98495d7574a5.png?crop=center&height=900&v=1742387411&width=1200", alt: "Montage mit App-Anleitung" },
  { src: "https://pergolux.de/cdn/shop/files/norway.png?crop=center&height=900&v=1742387411&width=1200", alt: "Norwegisches Design" },
];

/* ─── variants ─── */
const colorOptions = [
  { label: "White 9016 T", color: "#E8E4DF", hint: "Verkehrsweiß – hell und minimalistisch" },
  { label: "Ivory 1015 T", color: "#D9C87A", hint: "Heller Elfenbeinton – warm und einladend" },
  { label: "Gray 7046 T", color: "#8E9196", hint: "Telegrau – dezent und vielseitig" },
  { label: "Gray 7016 T", color: "#2E3234", hint: "Anthrazitgrau – zeitlos und elegant" },
  { label: "Black 9005 T", color: "#0A0A0D", hint: "Tiefschwarz – markant und modern" },
];

const sizeOptions = [
  { label: "3x3m", price: 2589, originalPrice: 3990 },
  { label: "3x4m", price: 2899, originalPrice: 4390 },
  { label: "3x5m", price: 3199, originalPrice: 4790 },
  { label: "3x6m", price: 3499, originalPrice: 5190 },
  { label: "4x4m", price: 3599, originalPrice: 5390 },
  { label: "4x5m", price: 3899, originalPrice: 5790 },
  { label: "4x6m", price: 4199, originalPrice: 6190 },
];

const mountOptions = [
  { label: "Freistehend", img: "https://pergolux.de/cdn/shop/files/freestanding_3957b877-f36f-45a0-986e-6f439f8f5f9c.png?crop=center&height=49&v=1746194687&width=66", surcharge: 0 },
  { label: "Wandmontage", img: "https://pergolux.de/cdn/shop/files/wallmounted.png?crop=center&height=49&v=1746193904&width=66", surcharge: 240 },
];

const sideOptions = [
  { key: "left", label: "Links", sizeLabel: "3m Seite", img: "https://pergolux.de/cdn/shop/files/sm-left.png?crop=center&height=68&v=1752586042&width=109" },
  { key: "right", label: "Rechts", sizeLabel: "3m Seite", img: "https://pergolux.de/cdn/shop/files/sm-right.png?crop=center&height=68&v=1752586042&width=109" },
  { key: "front", label: "Vorne", sizeLabel: "3m Seite", img: "https://pergolux.de/cdn/shop/files/sm-front.png?crop=center&height=68&v=1752586042&width=109" },
  { key: "back", label: "Hinten", sizeLabel: "3m Seite", img: "https://pergolux.de/cdn/shop/files/sm-back.png?crop=center&height=68&v=1752586043&width=109" },
];

const sideTypeChoices = [
  { value: "none", label: "Keine", price: 0 },
  { value: "screen", label: "Screen Rollo", price: 499 },
  { value: "schiebeglas", label: "Schiebeverglasung", price: 899 },
  { value: "guillotine", label: "Guillotine-Verglasung", price: 1199 },
];

const accessoryOptions = [
  { label: "LED Warmweiß", description: "Warmweißes Licht für gemütliche Abende unter der Pergola.", price: 329 },
  { label: "LED RGB", description: "Farbwechsel-Beleuchtung für individuelle Stimmungen und Akzente.", price: 449 },
  { label: "Heizung", description: "Infrarot-Wärmestrahler für behagliche Wärme an kühleren Tagen.", price: 549 },
  { label: "Smart Steuerung", description: "Intelligente Steuerung per App – Lamellen, Licht und Heizung.", price: 399 },
];

/* ─── trust badges ─── */
const trustBadges = [
  { icon: "https://pergolux.de/cdn/shop/files/Shield_Check_54616393-e1cb-420b-80ab-1ce83c5de17f.png?crop=center&height=54&v=1752586038&width=54", label: "10 Jahre Garantie" },
  { icon: "https://pergolux.de/cdn/shop/files/Bill_Check.png?crop=center&height=48&v=1753781502&width=48", label: "Rechnungskauf" },
  { icon: "https://pergolux.de/cdn/shop/files/Confetti_198c4952-7307-43f9-8286-78ba45318c28.png?crop=center&height=46&v=1752586038&width=46", label: "+100.000 Kunden" },
  { icon: "https://pergolux.de/cdn/shop/files/Home_cef2a425-ad3f-4844-ae3d-e17d79c3ee77.png?crop=center&height=48&v=1757669933&width=48", label: "Wertsteigerung" },
];


/* ─── feature story ─── */
const featureStory = [
  { title: "Federleichte Handkurbel", text: "Stelle deine Pergola mühelos mit der leichtgängigen Handkurbel ein – die Lamellen regulieren Sonne und Schatten flexibel, sorgen im Sommer für angenehme Kühle und halten Schneelasten bis 100 kg stand.", image: gallery[2].src },
  { title: "Schnellster Aufbau aller Zeiten", text: "Die Pergola Serie 3 ist dank des bewährten SnapFIT™-Systems besonders einfach zu montieren – inspiriert von IKEA, mit weniger Bauteilen und einem benutzerfreundlichen Design.", image: "https://pergolux.de/cdn/shop/files/PERGOLUX_Story_6_88a3e853-e322-4f21-ab7a-60175e9204a0.jpg?crop=center&format=pjpg&height=900&v=1741620042&width=1200" },
  { title: "Unsere preiswerteste Pergola", text: "Gefertigt nach den gleichen hohen Standards wie unsere Premium-Modelle und TÜV-zertifiziert. Aus robustem 6063-T5 Aluminium, sturmfest bis 100 km/h.", image: gallery[1].src },
  { title: "Stabiler als je zuvor", text: "Die Pergola der Serie 3 ist dafür konzipiert, extremen Wetterbedingungen standzuhalten. Außergewöhnliche Haltbarkeit sowie zuverlässiger Betrieb – Tag für Tag.", image: gallery[0].src },
  { title: "Norwegisches Design", text: "Minimalistisch, funktional und hochwertig bis ins Detail – von der Materialwahl bis zur Ausführung steht alles für echte skandinavische Handwerkskunst.", image: gallery[3].src },
  { title: "Großartiger Kundenservice", text: "Genieße die deutsche Qualitätsgarantie mit einer 10-Jahres-Garantie und einem Kundenservice, der immer für dich da ist. Mit über 100.000 zufriedenen Kunden.", image: gallery[0].src },
];

/* ─── reviews ─── */
const reviewCards = [
  { name: "Stefanie Groß", rating: 5, image: "https://pergolux.de/cdn/shop/files/PERGOLUX_Story_6_88a3e853-e322-4f21-ab7a-60175e9204a0.jpg?crop=center&format=pjpg&height=456&v=1741620042&width=289", quote: "Wir sind sehr zufrieden mit unserer Pergola! Die Bestellung war unkompliziert, und der Support war fantastisch." },
  { name: "Markus Hoppe", rating: 5, image: "https://pergolux.de/cdn/shop/files/SCR-20250326-njsp.jpg?crop=center&format=pjpg&height=456&v=1745919383&width=289", quote: "Wir haben unsere Pergola heute aufgebaut! Es hat alles wunderbar funktioniert! Ein Rundum perfektes Produkt!" },
  { name: "Rainer Stuhlberger", rating: 5, image: "https://pergolux.de/cdn/shop/files/SCR-20250326-nftx.jpg?crop=center&format=pjpg&height=456&v=1745919383&width=289", quote: "Eine der hochwertigsten, durchdachtesten und schönsten Sachen, die ich aufgebaut habe. Einfach top!" },
  { name: "Kirsten Güther", rating: 5, image: "https://pergolux.de/cdn/shop/files/SCR-20250326-ngon.jpg?crop=center&format=pjpg&height=456&v=1745919382&width=289", quote: "Kein Vergleich zu unserer Pergola davor!! Sieht super aus und ist auch noch gut verarbeitet! MEEEGA!!" },
  { name: "Silvia Renner", rating: 5, image: "https://pergolux.de/cdn/shop/files/SCR-20250326-nhcv_e75cd03d-8413-4832-ba66-57a9befd2997.jpg?crop=center&format=pjpg&height=456&v=1745919503&width=289", quote: "Die Farbe passt perfekt zum Haus! Lieferzeit war top, Kundenservice sehr nett! Ein sehr gutes Produkt." },
  { name: "Hoffmann", rating: 4, image: "https://pergolux.de/cdn/shop/files/SCR-20250326-nhot.jpg?crop=center&format=pjpg&height=456&v=1745919476&width=289", quote: "Die Pergola hat alle Erwartungen erfüllt. Der Zeitansatz von 5 Stunden ist realistisch." },
  { name: "Andreas Wolf", rating: 5, image: "https://pergolux.de/cdn/shop/files/SCR-20250326-nitw.jpg?crop=center&format=pjpg&height=456&v=1745919475&width=289", quote: "Sehr zufrieden mit unserer maßgefertigten Pergola. Hochwertig, toll verarbeitet, ohne einen einzigen Kratzer." },
];

/* ─── service cards ─── */
const serviceCards = [
  { icon: "https://pergolux.de/cdn/shop/files/showroom.png?crop=center&height=51&v=1752586038&width=51", title: "Showroom", text: "Finde einen in deiner Nähe", link: "/pages/showroom-3-0" },
  { icon: "https://pergolux.de/cdn/shop/files/Sledgehammer_3984b0e5-e932-44e2-b41b-4719568216c6.png?crop=center&height=72&v=1758108706&width=72", title: "Einfache Montage", text: "Benötigst du Hilfe bei der Installation?" },
  { icon: "https://pergolux.de/cdn/shop/files/delivery_628ce087-8faa-4b89-8d4e-0484def8bf68.png?crop=center&height=74&v=1752586038&width=74", title: "Schnelle Lieferung", text: "Ab 1.000 € kostenlos, verschiedene Optionen." },
  { icon: "https://pergolux.de/cdn/shop/files/expert-advice.png?crop=center&height=74&v=1752586039&width=74", title: "Expertenberatung", text: "Kontaktiere uns jederzeit bei Fragen." },
];

const bottomTrustBadges = [
  { icon: "https://pergolux.de/cdn/shop/files/Confetti_198c4952-7307-43f9-8286-78ba45318c28.png?crop=center&height=46&v=1752586038&width=46", title: "+100.000 zufriedene Kunden", text: "Über 100.000 zufriedene Kunden sprechen für die hohe Qualität." },
  { icon: "https://pergolux.de/cdn/shop/files/Cup_Star_7ee97793-32f0-4e9f-a94d-92c9ffa17b95.png?crop=center&height=66&v=1752586038&width=66", title: "Hochwertige Pergolen", text: "Mehrfach ausgezeichnet für Qualität und Langlebigkeit." },
  { icon: "https://pergolux.de/cdn/shop/files/weather.png?crop=center&height=74&v=1752586039&width=74", title: "Für alle Wetterbedingungen", text: "Genieße deinen Außenbereich das ganze Jahr über." },
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
export const PreiswertePergolaPage = () => {
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
  const [saleDeadline] = useState(createTargetDate);
  const [remainingTime, setRemainingTime] = useState(() => getRemainingTime(saleDeadline));
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [reviewPage, setReviewPage] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  /* countdown */
  useEffect(() => {
    const id = setInterval(() => setRemainingTime(getRemainingTime(saleDeadline)), 1000);
    return () => clearInterval(id);
  }, [saleDeadline]);

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
  const sizeData = sizeOptions.find((o) => o.label === selectedSize) ?? sizeOptions[0];
  const mountData = mountOptions.find((o) => o.label === selectedMount) ?? mountOptions[0];
  const sideTotal = Object.values(sides).reduce((sum, v) => {
    const choice = sideTypeChoices.find((c) => c.value === v);
    return sum + (choice?.price ?? 0);
  }, 0);
  const accTotal = accessoryOptions.filter((o) => selectedAccessories.includes(o.label)).reduce((s, o) => s + o.price, 0);
  const finalPrice = sizeData.price + mountData.surcharge + sideTotal + accTotal;
  const originalPrice = sizeData.originalPrice + mountData.surcharge + sideTotal + accTotal;
  const savings = originalPrice - finalPrice;

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
      productName: "Preiswerte Pergola",
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
              {/* breadcrumb */}
              <div className="mb-3 hidden items-center gap-2 text-sm text-zinc-400 md:flex">
                <Link to="/" className="hover:text-zinc-900">Startseite</Link><span>/</span>
                <Link to="/collections/unsere-pergolen" className="hover:text-zinc-900">Pergolen</Link><span>/</span>
                <span className="text-zinc-700">Preiswerte Pergola</span>
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
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {featureStory.map((item) => (
                  <div key={item.title} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                    <h4 className="text-sm font-bold text-zinc-900">{item.title}</h4>
                    <p className="mt-1.5 line-clamp-3 text-xs leading-5 text-zinc-500">{item.text}</p>
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

              <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">Preiswerte Pergola</h1>
              <h3 className="mt-1 text-lg font-semibold text-zinc-700">Unser Original, jetzt noch besser!</h3>

              {/* expandable description */}
              <div className="relative mt-3">
                <p className={`text-sm leading-6 text-zinc-600 ${!descExpanded ? "line-clamp-3" : ""}`}>
                  Die preiswerte Pergola ist ein exklusives Aluminium-Pergolasystem mit drehbaren Lamellen, integriertem Wasserablauf und hoher Widerstandsfähigkeit gegenüber Witterungseinflüssen. Sie vereint modernes Design, eine präzise Licht- und Belüftungssteuerung sowie zuverlässigen Schutz vor Sonne, Regen und Schnee zu einer stilvollen Lösung für anspruchsvolle Außenbereiche. Optional ist sie mit LED-Beleuchtung, Regen- und Windsensoren, Smartphone-Steuerung sowie seitlichen Glas- oder Zip-Systemen erhältlich.
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
                  <li>• Bis zu 35 % Rabatt auf Pergolen</li>
                  <li>• Bis zu 35 % Rabatt auf Seitenwände</li>
                  <li>• Bis zu 35 % Rabatt auf zusätzliches Zubehör</li>
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

                {/* ── Trust badges row ── */}
                <div className="grid grid-cols-4 gap-2">
                  {trustBadges.map((b) => (
                    <div key={b.label} className="flex flex-col items-center gap-1.5 rounded-xl border border-stone-200 p-3 text-center">
                      <img src={b.icon} alt={b.label} className="h-8 w-8 object-contain" />
                      <span className="text-[11px] font-semibold leading-tight text-zinc-700">{b.label}</span>
                    </div>
                  ))}
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

        {/* ── Social proof ── */}
        <section className="bg-zinc-950 py-12 text-center text-white md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#82B2CA]">Über 100.000 zufriedene Kunden weltweit</p>
          <h2 className="mx-auto mt-3 max-w-xl text-3xl font-semibold md:text-4xl">Folge uns für mehr</h2>
          <div className="mt-5 flex items-center justify-center gap-4">
            <a href="#" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold transition hover:bg-white hover:text-zinc-900">Instagram</a>
            <a href="https://www.youtube.com/channel/UChFl3vWUBB0M5y4egNpDvsw" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold transition hover:bg-white hover:text-zinc-900">YouTube</a>
          </div>
        </section>

        {/* ── Reviews slider ── */}
        <section className="bg-stone-50 py-12 md:py-20">
          <div className="mx-auto max-w-[1440px] px-4 md:px-16">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Kundenbewertungen</p>
                <h2 className="mt-2 text-2xl font-semibold text-zinc-950 md:text-3xl">Was Kundinnen und Kunden sagen</h2>
              </div>
              <div className="text-right">
                <span className="text-2xl font-semibold text-zinc-950">4.85</span><span className="text-sm text-zinc-500"> von 5</span>
                <div className="mt-0.5 text-xs text-zinc-500">Basierend auf 919 Bewertungen</div>
              </div>
            </div>

            {/* star distribution */}
            <div className="mb-8 flex flex-wrap gap-3">
              {[{ s: 5, n: 785 }, { s: 4, n: 127 }, { s: 3, n: 6 }, { s: 2, n: 1 }, { s: 1, n: 0 }].map((row) => (
                <div key={row.s} className="flex items-center gap-2">
                  <Stars count={row.s} />
                  <div className="h-2 w-20 overflow-hidden rounded-full bg-stone-200"><div className="h-full rounded-full bg-[#82B2CA]" style={{ width: `${(row.n / 919) * 100}%` }} /></div>
                  <span className="text-xs text-zinc-500">{row.n}</span>
                </div>
              ))}
            </div>

            {/* cards */}
            <div className="grid gap-4 md:grid-cols-3">
              {pagedReviews.map((r) => (
                <article key={r.name} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                  <img src={r.image} alt={r.name} className="aspect-[5/3] w-full object-cover" />
                  <div className="p-5">
                    <Stars count={r.rating} />
                    <p className="mt-3 text-sm leading-6 text-zinc-700">{r.quote}</p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                      <span className="font-semibold text-zinc-800">{r.name}</span>
                      <span className="rounded bg-[#82B2CA]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#82B2CA]">Verifiziert</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {/* pagination */}
            {totalReviewPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                {Array.from({ length: totalReviewPages }, (_, i) => (
                  <button key={i} type="button" onClick={() => setReviewPage(i)} className={`h-8 w-8 rounded-full text-sm font-semibold transition ${reviewPage === i ? "bg-[#344148] text-white" : "bg-stone-200 text-zinc-600 hover:bg-stone-300"}`}>{i + 1}</button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Die beste Wahl ── */}
        <section className="bg-white py-10 md:py-16">
          <div className="mx-auto max-w-[1440px] px-4 md:px-16">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold text-zinc-950 md:text-3xl">Die beste Wahl für deine Pergola</h2>
              <p className="mt-2 text-sm text-zinc-500">Hast du Fragen? <Link to="/contact" className="font-semibold text-zinc-900 underline underline-offset-2">Kundenservice kontaktieren</Link></p>
            </div>
            {/* service cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {serviceCards.map((card) => (
                <div key={card.title} className="flex flex-col items-center rounded-2xl border border-stone-200 p-6 text-center">
                  <img src={card.icon} alt={card.title} className="mb-3 h-12 w-12 object-contain" />
                  <h3 className="text-sm font-bold text-zinc-900">{card.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-zinc-500">{card.text}</p>
                  {card.link && <Link to={card.link} className="mt-2 text-xs font-semibold text-[#82B2CA] underline underline-offset-2">Mehr erfahren</Link>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom trust badges ── */}
        <section className="border-t border-stone-200 bg-stone-50 py-10 md:py-16">
          <div className="mx-auto grid max-w-[1440px] gap-4 px-4 sm:grid-cols-3 md:px-16">
            {bottomTrustBadges.map((b) => (
              <div key={b.title} className="flex flex-col items-center rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-sm">
                <img src={b.icon} alt={b.title} className="mb-3 h-12 w-12 object-contain" />
                <h3 className="text-sm font-bold text-zinc-900">{b.title}</h3>
                <p className="mt-1 text-xs leading-5 text-zinc-500">{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Ticker bottom ── */}
        <FeatureTicker backgroundColorClass="bg-[#344148]" />

        {/* ── FAQ ── */}
        <section className="border-t border-stone-200 bg-stone-50 py-12 md:py-20">
          <div className="mx-auto max-w-[900px] px-4 md:px-16">
            <h2 className="mb-6 text-2xl font-semibold text-zinc-950 md:text-3xl">Häufige Fragen</h2>
            <div className="space-y-2">
              {[
                { q: "Ist die Preiswerte Pergola für ganzjährige Nutzung geeignet?", a: "Ja. Die Konstruktion aus 6063-T5 Aluminium ist auf dauerhafte Nutzung im Außenbereich ausgelegt und widersteht Wind, Regen und hoher Schneelast." },
                { q: "Kann ich die Pergola selbst montieren?", a: "Ja. Die Serie 3 ist für einen unkomplizierten Aufbau konzipiert. Wenn du möchtest, kannst du zusätzlich einen Montageservice anfragen." },
                { q: "Wie funktioniert die Bedienung des Dachs?", a: "Die Lamellen werden manuell über eine leichtgängige Handkurbel verstellt. So regelst du Sonne, Schatten und Belüftung flexibel." },
                { q: "Kann ich später Zubehör hinzufügen?", a: "Ja. Screen Rollos, Glaswände, LED-Beleuchtung und Wärmelampen lassen sich je nach Konfiguration passend ergänzen." },
                { q: "Wie wird die Pergola geliefert?", a: "Die Pergola wird per Spedition in mehreren Paketen geliefert. Ab 1.000 € Bestellwert ist die Lieferung kostenlos." },
                { q: "Ist eine Baugenehmigung erforderlich?", a: "Das hängt vom Bundesland und der Größe ab. Nutze unseren Baugenehmigungscheck, um die Anforderungen für deinen Standort zu prüfen." },
              ].map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={item.q} className="rounded-xl border border-stone-200 bg-white">
                    <button type="button" onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                      <span className="text-sm font-semibold text-zinc-900">{item.q}</span>
                      <span className="text-lg text-zinc-400">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && <p className="px-5 pb-4 text-sm leading-6 text-zinc-600">{item.a}</p>}
                  </div>
                );
              })}
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
            <div className="text-xs text-zinc-500 line-through">{formatPrice(originalPrice)}</div>
          </div>
          <button type="button" onClick={handleAddToCart} className="rounded-xl px-6 py-3 text-sm font-bold text-white transition hover:opacity-90" style={{ backgroundColor: '#344148' }}>
            In den Warenkorb
          </button>
        </div>
      </div>
    </div>
  );
};
