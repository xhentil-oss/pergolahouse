import { ProductCard } from "@/sections/ProductSlider/components/ProductCard";
import { useRef, useState, useEffect } from "react";
import photo2 from "@/assets/Photo (2).png";
import photo3 from "@/assets/Photo (3).png";
import photo4 from "@/assets/Photo (4).png";
import photo5 from "@/assets/Photo (5).png";
import photo6 from "@/assets/Photo (6).png";
import photo7 from "@/assets/Photo (7).png";

const toKebab = (str) => str.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const products = [
  {
    productUrl: `/products/${toKebab("Elegante Pergola")}`,
    productAriaLabel: "Elegante Pergola",
    imageContainerClass: "",
    imageSrc: photo2,
    imageAlt: "Elegante Pergola",
    productName: "Elegante Pergola",
    currentPrice: "2.589 €",
    originalPrice: "3.990 €",
    savingsText: "35% sparen",
    colorSwatches: [
      { color: "#2D3436", label: "Gray 7016 T" },
      { color: "#F1EDE5", label: "White 9016 T" },
      { color: "#0A0A0A", label: "Black 9005 T" },
      { color: "#8E9499", label: "Gray 7046 T" },
      { color: "#D4BC6A", label: "Ivory 1015 T" },
    ],
    roofType: "Manuelles Lamellendach",
    windResistance: "Windfest bis 100km/h",
    interestedCount: "5030",
    buyButtonAriaLabel: "Mehr sehen – Elegante Pergola",
  },
  {
    productUrl: `/products/${toKebab("Luxus-Pergola")}`,
    productAriaLabel: "Luxus-Pergola",
    imageContainerClass: "",
    imageSrc: photo3,
    imageAlt: "Luxus-Pergola",
    productName: "Luxus-Pergola",
    currentPrice: "3.429 €",
    originalPrice: "5.290 €",
    savingsText: "35% sparen",
    colorSwatches: [
      { color: "#2D3436", label: "Gray 7016 T" },
      { color: "#F1EDE5", label: "White 9016 T" },
      { color: "#0A0A0A", label: "Black 9005 T" },
      { color: "#8E9499", label: "Gray 7046 T" },
      { color: "#D4BC6A", label: "Ivory 1015 T" },
    ],
    roofType: "Elektrisches Lamellendach",
    windResistance: "Bis zu 120km/h (Sturm)",
    interestedCount: "3270",
    buyButtonAriaLabel: "Jetzt kaufen – Luxus-Pergola",
  },
  {
    productUrl: `/products/${toKebab("Preiswerte Pergola")}`,
    productAriaLabel: "Preiswerte Pergola",
    imageContainerClass: "",
    imageSrc: photo4,
    imageAlt: "Preiswerte Pergola",
    productName: "Preiswerte Pergola",
    currentPrice: "5.099 €",
    originalPrice: "7.290 €",
    savingsText: "30% sparen",
    colorSwatches: [
      { color: "#2D3436", label: "Gray 7016 T" },
      { color: "#F1EDE5", label: "White 9016 T" },
      { color: "#0A0A0A", label: "Black 9005 T" },
      { color: "#8E9499", label: "Gray 7046 T" },
      { color: "#D4BC6A", label: "Ivory 1015 T" },
    ],
    roofType: "Elektrische LED-Lamellen",
    windResistance: "Bis zu 140km/h (Orkan)",
    interestedCount: "2399",
    buyButtonAriaLabel: "Jetzt kaufen – Preiswerte Pergola",
  },
  {
    productUrl: "/collections/wintergarten-1",
    productAriaLabel: "Wintergärten",
    imageContainerClass: "",
    imageSrc: photo5,
    imageAlt: "Wintergärten",
    productName: "Wintergärten",
    currentPrice: "6.785 €",
    originalPrice: "9.694 €",
    savingsText: "30% sparen",
    colorSwatches: [
      { color: "#2D3436", label: "Gray 7016 T" },
      { color: "#F1EDE5", label: "White 9016 T" },
      { color: "#0A0A0A", label: "Black 9005 T" },
      { color: "#8E9499", label: "Gray 7046 T" },
      { color: "#D4BC6A", label: "Ivory 1015 T" },
    ],
    roofType: "Elektrisches Lamellendach",
    windResistance: "Bis zu 120km/h (Sturm)",
    interestedCount: "2232",
    buyButtonAriaLabel: "Jetzt kaufen – Wintergärten",
  },
  {
    productUrl: "/products/pergola-massanfertigung",
    productAriaLabel: "Pergola Maßanfertigung",
    imageContainerClass: "",
    imageSrc: photo6,
    imageAlt: "Pergola Maßanfertigung",
    productName: "Pergola Maßanfertigung",
    currentPrice: "4.899 €",
    originalPrice: "6.990 €",
    savingsText: "30% sparen",
    colorSwatches: [
      { color: "#2D3436", label: "Gray 7016 T" },
      { color: "#F1EDE5", label: "White 9016 T" },
      { color: "#0A0A0A", label: "Black 9005 T" },
      { color: "#8E9499", label: "Gray 7046 T" },
      { color: "#D4BC6A", label: "Ivory 1015 T" },
    ],
    roofType: "Individuelle Maße & Ausstattung",
    windResistance: "Bis zu 120km/h (Sturm)",
    interestedCount: "1120",
    buyButtonAriaLabel: "Jetzt kaufen – Pergola Maßanfertigung",
  },
];

export const ProductSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("li")?.offsetWidth ?? 300;
    el.scrollBy({ left: dir === "right" ? cardWidth + 24 : -(cardWidth + 24), behavior: "smooth" });
  };

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-4 md:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#82B2CA] mb-2">
              Unsere Kollektion
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#344148]">
              Pergola Modelle
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/collections/unsere-pergolen"
              className="text-sm font-semibold text-[#344148] hover:text-[#82B2CA] transition-colors"
            >
              Alle Modelle ansehen &rarr;
            </a>
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ${canScrollLeft ? "border-[#344148]/20 bg-white hover:bg-[#344148] hover:text-white hover:border-[#344148] text-[#344148]" : "border-stone-200 bg-stone-100 text-stone-300 cursor-not-allowed"}`}
                aria-label="Zurück scrollen"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ${canScrollRight ? "border-[#344148]/20 bg-white hover:bg-[#344148] hover:text-white hover:border-[#344148] text-[#344148]" : "border-stone-200 bg-stone-100 text-stone-300 cursor-not-allowed"}`}
                aria-label="Weiter scrollen"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable cards */}
        <div ref={scrollRef} className="overflow-x-auto scrollbar-hide scroll-smooth -mx-4 px-4 md:-mx-0 md:px-0">
          <ul className="flex gap-5 md:gap-6 w-max list-none p-0 m-0">
            {products.map((p) => (
              <li key={p.productName} className="w-[280px] md:w-[310px] shrink-0">
                <ProductCard {...p} priceWrapperClass="items-center gap-x-1.5 flex flex-wrap gap-y-1" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
