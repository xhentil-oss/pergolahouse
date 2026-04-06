import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { FeatureTicker } from "@/sections/FeatureTicker";
import { useCart } from "@/context/CartContext";

/* ─── image gallery ─── */
const gallery = [
  { src: "https://cdn.shopify.com/s/files/1/0575/2173/3813/files/Frame216_4.jpg?v=1732886081", alt: "Comfort Wärmelampe – Anthrazit" },
  { src: "https://cdn.shopify.com/s/files/1/0575/2173/3813/files/PERGOLUXPergola-Series3-Image50.jpg?v=1743751555", alt: "Wärmelampe – Detailansicht" },
  { src: "https://cdn.shopify.com/s/files/1/0575/2173/3813/files/whatsinthebox.png?v=1743751555", alt: "Wärmelampe – Lieferumfang" },
  { src: "https://cdn.shopify.com/s/files/1/0575/2173/3813/files/Frame216_3_6f45b2b0-f280-4cb7-87bf-a053f77b280c.jpg?v=1746194015", alt: "Comfort Wärmelampe – Weiß" },
];


/* ─── Farbe ─── */
const colorOptions = [
  { label: "Anthrazit", color: "#2E3234", img: "https://pergolux.de/cdn/shop/files/black.png?crop=center&height=38&v=1747228886&width=38", hint: "Anthrazitgrau – zeitlos und elegant" },
  { label: "Weiß", color: "#E8E4DF", img: "https://pergolux.de/cdn/shop/files/white.png?crop=center&height=38&v=1747228887&width=38", hint: "Verkehrsweiß – hell und minimalistisch" },
];

/* ─── highlights ─── */
const highlights = [
  { title: "Sofortige & direkte Wärme", text: "Infrarot-Technologie liefert effiziente Wärme – genau dort, wo du sie brauchst." },
  { title: "SnapFIT™ – Einfache Montage", text: "Einfach in die Regenrinne einklicken, ausrichten, fertig. Bei Bedarf flexibel umpositionierbar." },
  { title: "Angenehmes Licht", text: "Das speziell entwickelte warmgelbe Licht sorgt für eine entspannte, gemütliche Atmosphäre – ganz ohne grelle Helligkeit." },
  { title: "Nahtlose Integration", text: "Wählbar in Weiß oder Anthrazitgrau – perfekt abgestimmt auf deine Pergola." },
  { title: "Langlebige Leistung", text: "Für bis zu 5.000 Heizstunden ausgelegt – für viele Jahre zuverlässige Wärme." },
  { title: "Wetterfest & IPX5", text: "Ideal für den ganzjährigen Einsatz im Freien – wetterbeständig und robust." },
];

/* ─── trust badges ─── */
const trustBadges = [
  { icon: "https://pergolux.de/cdn/shop/files/Shield_Check_54616393-e1cb-420b-80ab-1ce83c5de17f.png?crop=center&height=54&v=1752586038&width=54", label: "10 Jahre Garantie" },
  { icon: "https://pergolux.de/cdn/shop/files/Bill_Check.png?crop=center&height=48&v=1753781502&width=48", label: "Rechnungskauf" },
  { icon: "https://pergolux.de/cdn/shop/files/Confetti_198c4952-7307-43f9-8286-78ba45318c28.png?crop=center&height=46&v=1752586038&width=46", label: "+100.000 Kunden" },
  { icon: "https://pergolux.de/cdn/shop/files/Home_cef2a425-ad3f-4844-ae3d-e17d79c3ee77.png?crop=center&height=48&v=1757669933&width=48", label: "Wertsteigerung" },
];

/* ─── service cards ─── */
const serviceCards = [
  { icon: "star", title: "Premium Qualität", text: "Hochwertige Materialien und Verarbeitung für langfristige Zufriedenheit" },
  { icon: "shield", title: "10 Jahre Garantie", text: "Umfassender Schutz und volle Sicherheit für Ihre Investition" },
  { icon: "lock", title: "Sichere Produkte", text: "Geprüftes Handwerk und zertifizierte Sicherheitsstandards" },
  { icon: "sparkle", title: "Modernes Design", text: "Zeitlose Ästhetik und innovative Technologie vereint" },
];

/* ─── FAQ ─── */
const faqItems = [
  { q: "Wie wird die Wärmelampe montiert?", a: "Dank des SnapFIT™-Systems wird die Wärmelampe einfach in die Regenrinne der Pergola eingeklickt. Sie ist flexibel positionierbar und kann bei Bedarf umgestellt werden – ganz ohne Werkzeug." },
  { q: "Ist die Wärmelampe wetterfest?", a: "Ja, die Wärmelampe ist IPX5-zertifiziert und für den ganzjährigen Einsatz im Freien entwickelt. Sie trotzt Regen, Wind und Temperaturschwankungen." },
  { q: "Welche Leistung hat der Heizstrahler?", a: "Der Heizstrahler hat eine Leistung von 1500 Watt und liefert sofortige Infrarotwärme. Er ist für bis zu 5.000 Heizstunden ausgelegt." },
  { q: "Welche Farben sind verfügbar?", a: "Die Wärmelampe ist in zwei Farben erhältlich: Anthrazitgrau und Weiß – für eine nahtlose Integration in das Design Ihrer Pergola." },
  { q: "Wie lang ist das Kabel?", a: "Das Kabel ist 6 m lang und verfügt über einen Standard-220V-Stecker für handelsübliche Haushaltssteckdosen." },
  { q: "Blendet das Licht der Wärmelampe?", a: "Nein, das speziell entwickelte warmgelbe Licht sorgt für eine angenehme, entspannte Atmosphäre – ganz ohne Blendwirkung oder grelle Helligkeit." },
];

/* ─── helpers ─── */
const PRICE = 360;

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
export const WaermelampePage = () => {
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [descExpanded, setDescExpanded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].label);
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

  const handleAddToCart = () => {
    addToCart({
      productName: "Comfort Wärmelampe",
      image: gallery[0].src,
      color: selectedColor,
      size: "Einheitsgröße",
      mount: "",
      mountSurcharge: 0,
      sides: [],
      accessories: [],
      basePrice: PRICE,
      totalPrice: PRICE,
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
              <div className="mb-3 hidden items-center gap-2 text-sm text-zinc-400 md:flex">
                <Link to="/" className="hover:text-zinc-900">Startseite</Link><span>/</span>
                <Link to="/collections/pergola-zubehoer" className="hover:text-zinc-900">Zubehör</Link><span>/</span>
                <span className="text-zinc-700">Comfort Wärmelampe</span>
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
                    <img src={img.src} alt={img.alt} className="h-20 w-full object-cover" />
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
                <span className="text-sm font-medium text-zinc-600">186 Bewertungen</span>
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">Comfort Wärmelampe</h1>
              <h3 className="mt-1 text-lg font-semibold text-zinc-700">Wärme – genau dann, wenn du sie brauchst.</h3>

              <div className="relative mt-3">
                <p className={`text-sm leading-6 text-zinc-600 ${!descExpanded ? "line-clamp-3" : ""}`}>
                  Verlängere deine Outdoor-Saison mit dem Heizstrahler, der sofortige Infrarotwärme genau dorthin bringt, wo du sie benötigst. Dank SnapFIT™-System lässt sich der Heizstrahler ganz einfach in die Regenrinne deiner Pergola einklicken – flexibel positionierbar, für optimalen Komfort. Erhältlich in Weiß oder Anthrazitgrau, fügt er sich nahtlos in das Design deiner Pergola ein und sorgt für eine stilvolle, integrierte Wärmequelle – das ganze Jahr über.
                </p>
                <button type="button" onClick={() => setDescExpanded(!descExpanded)} className="mt-1 text-sm font-semibold text-zinc-900 underline underline-offset-2">
                  {descExpanded ? "Weniger anzeigen" : "Mehr anzeigen"}
                </button>
              </div>

              {/* ── price ── */}
              <div className="mt-5 rounded-2xl bg-zinc-950 p-4 text-white md:p-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-semibold">{formatPrice(PRICE)}</span>
                </div>
                <p className="mt-3 text-sm text-white/70">Kostenlose Lieferung ab 1.000 € Bestellwert</p>
              </div>

              {/* ── Configurator sections ── */}
              <div className="mt-5 space-y-5">
                {/* Farbe */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-700">Farbe<span className="text-zinc-400">.</span> <span className="font-normal text-zinc-500">Gewünschte Farbe auswählen</span></span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map((c) => (
                      <button key={c.label} type="button" onClick={() => setSelectedColor(c.label)} className={`flex items-center gap-2 rounded-xl border-2 px-5 py-2.5 text-sm font-semibold transition ${selectedColor === c.label ? "border-zinc-900 bg-zinc-950 text-white" : "border-stone-200 hover:border-stone-400"}`}>
                        <span className="h-4 w-4 rounded-full border border-stone-300" style={{ backgroundColor: c.color }} />
                        {c.label}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-zinc-500">{colorOptions.find((c) => c.label === selectedColor)?.hint}</p>
                </div>

                {/* Spezifikationen */}
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                  <h4 className="mb-2 text-sm font-bold text-zinc-900">Spezifikationen</h4>
                  <ul className="space-y-1 text-xs text-zinc-600">
                    <li>• 1500 Watt Leistung</li>
                    <li>• Speziell entwickeltes gelbes Licht für stimmungsvolle Atmosphäre</li>
                    <li>• 6 m Kabel mit Standard 220V Stecker</li>
                    <li>• IPX5-zertifiziert – wetterfest</li>
                    <li>• Bis zu 5.000 Heizstunden</li>
                  </ul>
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
                    In den Warenkorb · {formatPrice(PRICE)}
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

        {/* ── "Die beste Wahl" ── */}
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

        <FeatureTicker />

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
                Hier findest du Antworten auf die häufigsten Fragen zur Comfort Wärmelampe.
              </p>
            </div>

            {/* FAQ grid – 2 columns on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
              <div className="flex flex-col gap-4">
                {faqItems.slice(0, 3).map((item, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <button key={i} type="button" onClick={() => setOpenFaq(isOpen ? null : i)} className="text-left">
                      <div className="rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300">
                        <div className="flex items-start gap-4">
                          <span className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl text-sm font-bold transition-all bg-[#344148] text-white">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="flex-1">
                            <h3 className={`text-base font-semibold transition-colors ${
                              isOpen ? "text-zinc-900" : "text-zinc-700"
                            }`}>
                              {item.q}
                            </h3>
                            {isOpen && (
                              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                                {item.a}
                              </p>
                            )}
                          </div>
                          <span className={`mt-1 text-xl transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}>
                            ▼
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-col gap-4">
                {faqItems.slice(3).map((item, i) => {
                  const idx = i + 3;
                  const isOpen = openFaq === idx;
                  return (
                    <button key={idx} type="button" onClick={() => setOpenFaq(isOpen ? null : idx)} className="text-left">
                      <div className="rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300">
                        <div className="flex items-start gap-4">
                          <span className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl text-sm font-bold transition-all bg-[#344148] text-white">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <div className="flex-1">
                            <h3 className={`text-base font-semibold transition-colors ${
                              isOpen ? "text-zinc-900" : "text-zinc-700"
                            }`}>
                              {item.q}
                            </h3>
                            {isOpen && (
                              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                                {item.a}
                              </p>
                            )}
                          </div>
                          <span className={`mt-1 text-xl transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}>
                            ▼
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
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
              <p className="text-xs font-semibold text-zinc-900">Comfort Wärmelampe</p>
              <p className="text-lg font-bold text-zinc-950">{formatPrice(PRICE)}</p>
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
