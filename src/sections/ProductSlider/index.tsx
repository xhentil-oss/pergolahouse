import { ProductCard } from "@/sections/ProductSlider/components/ProductCard";
import { useRef, useState, useEffect } from "react";
import photo2 from "@/assets/Photo (2).png";
import photo3 from "@/assets/Photo (3).png";
import photo4 from "@/assets/Photo (4).png";
import photo5 from "@/assets/Photo (5).png";
import photo6 from "@/assets/Photo (6).png";
import photo7 from "@/assets/Photo (7).png";

const products = [
  {
    productUrl: "/products/pergola-s3",
    productAriaLabel: "Elegante Pergola",
    imageContainerClass: "",
    imageSrc: photo2,
    imageAlt: "Elegante Pergola",
    modelLabel: "Manuelles Modell",
    productName: "Elegante Pergola",
    currentPrice: "2.589 €",
    originalPrice: "3.990 €",
    savingsText: "35% sparen",
    colorSwatches: [
      { src: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/129.png", alt: "anthrazit" },
      { src: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/107.png", alt: "weiss" },
      { src: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/131.png", alt: "schwarz" },
    ],
    roofType: "Manuelles Lamellendach",
    windResistance: "Windfest bis 100km/h",
    interestedCount: "5030",
    buyButtonAriaLabel: "Jetzt kaufen – Elegante Pergola",
  },
  {
    productUrl: "/products/pergola-custom-design",
    productAriaLabel: "Luxus-Pergola",
    imageContainerClass: "",
    imageSrc: photo3,
    imageAlt: "Luxus-Pergola",
    modelLabel: "Beliebtestes Modell",
    productName: "Luxus-Pergola",
    currentPrice: "3.429 €",
    originalPrice: "5.290 €",
    savingsText: "35% sparen",
    colorSwatches: [
      { src: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/129.png", alt: "anthrazit" },
      { src: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/107.png", alt: "weiss" },
      { src: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/131.png", alt: "schwarz" },
    ],
    roofType: "Elektrisches Lamellendach",
    windResistance: "Bis zu 120km/h (Sturm)",
    interestedCount: "3270",
    buyButtonAriaLabel: "Jetzt kaufen – Luxus-Pergola",
  },
  {
    productUrl: "/products/preiswerte-pergola",
    productAriaLabel: "Preiswerte Pergola",
    imageContainerClass: "",
    imageSrc: photo4,
    imageAlt: "Preiswerte Pergola",
    modelLabel: "Unser Premium-Modell",
    productName: "Preiswerte Pergola",
    currentPrice: "5.099 €",
    originalPrice: "7.290 €",
    savingsText: "30% sparen",
    colorSwatches: [
      { src: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/129.png", alt: "anthrazit" },
      { src: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/107.png", alt: "weiss" },
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
    modelLabel: "Individuelle Maße",
    productName: "Wintergärten",
    currentPrice: "6.785 €",
    originalPrice: "9.694 €",
    savingsText: "30% sparen",
    colorSwatches: [],
    roofType: "Elektrisches Lamellendach",
    windResistance: "Bis zu 120km/h (Sturm)",
    interestedCount: "2232",
    buyButtonAriaLabel: "Jetzt kaufen – Wintergärten",
  },
  {
    productUrl: "/collections/carports",
    productAriaLabel: "Carports",
    imageContainerClass: "",
    imageSrc: photo6,
    imageAlt: "Carports",
    modelLabel: "Wetterschutz",
    productName: "Carports",
    currentPrice: "4.299 €",
    originalPrice: "6.150 €",
    savingsText: "30% sparen",
    colorSwatches: [
      { src: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/129.png", alt: "anthrazit" },
      { src: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/131.png", alt: "schwarz" },
    ],
    roofType: "Robustes Aluminium-Dach",
    windResistance: "Bis zu 120km/h (Sturm)",
    interestedCount: "1845",
    buyButtonAriaLabel: "Jetzt kaufen – Carports",
  },
  {
    productUrl: "/collections/zip-screens",
    productAriaLabel: "Zip-Screens",
    imageContainerClass: "",
    imageSrc: photo7,
    imageAlt: "Zip-Screens",
    modelLabel: "Sonnenschutz",
    productName: "Zip-Screens",
    currentPrice: "1.299 €",
    originalPrice: "1.890 €",
    savingsText: "31% sparen",
    colorSwatches: [
      { src: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/129.png", alt: "anthrazit" },
      { src: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/107.png", alt: "weiss" },
    ],
    roofType: "Elektrisches Zip-System",
    windResistance: "Windfest bis 80km/h",
    interestedCount: "1567",
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
    <div className="bg-white">
      <div className="py-16 md:py-[120px]">
        <div className="flex flex-col gap-10">
          {/* Header row */}
          <div className="max-w-[1440px] mx-auto px-4 md:px-16 w-full flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <h2 className="text-zinc-900 text-[32px] font-semibold leading-10 md:text-5xl md:leading-[58px]">
              Pergola Modelle
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full overflow-hidden shrink-0">
                  <img src="https://c.animaapp.com/mnd7yb7cX3zmke/assets/103.png" alt="" className="h-full w-full object-cover" />
                </div>
                <div className="text-zinc-900 font-medium flex flex-col leading-5">
                  <span>Finde deine Pergola</span>
                  <a href="/collections/unsere-pergolen" className="text-blue-800 font-semibold text-sm hover:underline">
                    Modelle vergleichen →
                  </a>
                </div>
              </div>
              {/* Arrow buttons */}
              <div className="hidden md:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  disabled={!canScrollLeft}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 transition ${canScrollLeft ? "bg-white hover:bg-stone-50 text-zinc-900" : "bg-stone-100 text-zinc-300 cursor-not-allowed"}`}
                  aria-label="Zurück scrollen"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                  type="button"
                  onClick={() => scroll("right")}
                  disabled={!canScrollRight}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 transition ${canScrollRight ? "bg-white hover:bg-stone-50 text-zinc-900" : "bg-stone-100 text-zinc-300 cursor-not-allowed"}`}
                  aria-label="Weiter scrollen"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Scrollable grid */}
          <div className="max-w-[1440px] mx-auto px-4 md:px-16 w-full relative">
            <div ref={scrollRef} className="overflow-x-auto scrollbar-hide scroll-smooth">
              <ul className="flex gap-6 md:w-max">
                {products.map((p) => (
                  <li key={p.productName} className="w-[calc(50vw-2rem)] min-w-[160px] max-w-[320px] shrink-0 md:w-[calc((1440px-8rem-4.5rem)/4)]">
                    <ProductCard {...p} priceWrapperClass="items-center gap-x-1 flex flex-wrap justify-center gap-y-1" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
