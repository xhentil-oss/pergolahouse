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
    productUrl: `/pergola/elegante-pergola`,
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
    productUrl: `/pergola/luxus-pergola`,
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
    productUrl: `/pergola/preiswerte-pergola`,
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
    productUrl: "/wintergarten",
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
    productUrl: `/carports`,
    productAriaLabel: "Carports",
    imageContainerClass: "",
    imageSrc: photo7,
    imageAlt: "Carports",
    productName: "Carports",
    currentPrice: "3.999 €",
    originalPrice: "5.499 €",
    savingsText: "27% sparen",
    colorSwatches: [
      { color: "#2D3436", label: "Gray 7016 T" },
      { color: "#F1EDE5", label: "White 9016 T" },
      { color: "#0A0A0A", label: "Black 9005 T" },
      { color: "#8E9499", label: "Gray 7046 T" },
      { color: "#D4BC6A", label: "Ivory 1015 T" },
    ],
    roofType: "Aluminium & Stahl",
    windResistance: "Bis zu 100km/h",
    interestedCount: "1500",
    buyButtonAriaLabel: "Jetzt kaufen – Carports",
  },
  {
    productUrl: `/zip-screens`,
    productAriaLabel: "Zip-Screens",
    imageContainerClass: "",
    imageSrc: photo6,
    imageAlt: "Zip-Screens",
    productName: "Zip-Screens",
    currentPrice: "1.299 €",
    originalPrice: "1.799 €",
    savingsText: "28% sparen",
    colorSwatches: [
      { color: "#2D3436", label: "Gray 7016 T" },
      { color: "#F1EDE5", label: "White 9016 T" },
      { color: "#0A0A0A", label: "Black 9005 T" },
      { color: "#8E9499", label: "Gray 7046 T" },
      { color: "#D4BC6A", label: "Ivory 1015 T" },
    ],
    roofType: "Textil & Aluminium",
    windResistance: "Bis zu 80km/h",
    interestedCount: "900",
    buyButtonAriaLabel: "Jetzt kaufen – Zip-Screens",
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

    let autoScrollInterval = setInterval(() => {
      if (!el) return;
      const cardWidth = el.querySelector("li")?.offsetWidth ?? 490;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
      }
    }, 3000);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      clearInterval(autoScrollInterval);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("li")?.offsetWidth ?? 340;
    el.scrollBy({ left: dir === "right" ? cardWidth + 32 : -(cardWidth + 32), behavior: "smooth" });
  };

  return (
    <section className="bg-[#181818] py-20 md:py-28 overflow-hidden border-t border-[#232323]">
      <div className="mx-auto max-w-[1440px] px-4 md:px-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-14">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#82B2CA] mb-3" style={{ fontFamily: 'LEMONMILK, sans-serif', fontWeight: 400 }}>
              Unsere Kollektion
            </p>
            <h2
              className="text-3xl md:text-4xl text-white leading-snug"
              style={{ fontFamily: 'LEMONMILK, sans-serif', fontWeight: 400 }}
            >
              Exklusive{" "}
              <span style={{ color: '#82B2CA' }}>Pergola-Modelle</span>
            </h2>
          </div>
          <div className="flex gap-6 md:gap-8">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`flex h-14 w-14 items-center justify-center bg-[#82B2CA] text-white transition-all duration-200 rotate-45 ${!canScrollLeft ? "opacity-40 cursor-not-allowed" : "hover:bg-[#5fa0b8]"}`}
              aria-label="Zurück scrollen"
              style={{ outline: 'none', border: 'none' }}
            >
              <span className="rotate-[-45deg]">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </span>
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`flex h-14 w-14 items-center justify-center bg-[#82B2CA] text-white transition-all duration-200 rotate-45 ${!canScrollRight ? "opacity-40 cursor-not-allowed" : "hover:bg-[#5fa0b8]"}`}
              aria-label="Weiter scrollen"
              style={{ outline: 'none', border: 'none' }}
            >
              <span className="rotate-[-45deg]">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>
        {/* Scrollable cards */}
        <div ref={scrollRef} className="overflow-x-auto scrollbar-hide scroll-smooth px-0">
          <ul className="flex gap-10 md:gap-14 w-full list-none p-0 m-0 pb-8" style={{ minWidth: '100%' }}>
            {products.map((p) => (
              <li key={p.productName} className="w-[380px] shrink-0 pb-2">
                <ProductCard {...p} priceWrapperClass="items-center gap-x-1.5 flex flex-wrap gap-y-1" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
