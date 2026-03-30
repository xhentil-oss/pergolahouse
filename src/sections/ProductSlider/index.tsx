import { useRef } from "react";
import { ProductCard } from "@/sections/ProductSlider/components/ProductCard";

const products = [
  {
    productUrl: "/products/pergolux-pergola-s3",
    productAriaLabel: "Pergola S3",
    imageContainerClass: "",
    imageSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/85.jpg",
    imageAlt: "PERGOLUX Pergola S3",
    modelLabel: "Manuelles Modell",
    productName: "Pergola S3",
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
    buyButtonAriaLabel: "Jetzt kaufen – Pergola S3",
  },
  {
    productUrl: "/products/pergolux-sundream-s3",
    productAriaLabel: "Sundream S3",
    imageContainerClass: "",
    imageSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/121.jpg",
    imageAlt: "PERGOLUX Sundream S3",
    modelLabel: "Beliebtestes Modell",
    productName: "Sundream S3",
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
    buyButtonAriaLabel: "Jetzt kaufen – Sundream S3",
  },
  {
    productUrl: "/products/pergolux-skydance-s3",
    productAriaLabel: "Skydance S3",
    imageContainerClass: "",
    imageSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/91.jpg",
    imageAlt: "PERGOLUX Skydance S3",
    modelLabel: "Unser Premium-Modell",
    productName: "Skydance S3",
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
    buyButtonAriaLabel: "Jetzt kaufen – Skydance S3",
  },
  {
    productUrl: "/products/pergola-custom-design",
    productAriaLabel: "Maßanfertigung S3",
    imageContainerClass: "",
    imageSrc: "https://c.animaapp.com/mnd2jbm7kw8tP/assets/87.jpg",
    imageAlt: "PERGOLUX Maßanfertigung S3",
    modelLabel: "Individuelle Maße",
    productName: "Maßanfertigung S3",
    currentPrice: "6.785 €",
    originalPrice: "9.694 €",
    savingsText: "30% sparen",
    colorSwatches: [],
    roofType: "Elektrisches Lamellendach",
    windResistance: "Bis zu 120km/h (Sturm)",
    interestedCount: "2232",
    buyButtonAriaLabel: "Jetzt kaufen – Maßanfertigung S3",
  },
];

export const ProductSlider = () => {
  const scrollRef = useRef<HTMLUListElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 380;
    scrollRef.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <div className="bg-neutral-100">
      <div className="py-16 md:py-[120px]">
        <div className="flex flex-col gap-10">
          {/* Header row */}
          <div className="max-w-[1440px] mx-auto px-4 md:px-16 w-full flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <h2 className="text-zinc-900 text-[32px] font-semibold leading-10 md:text-5xl md:leading-[58px]">
              Serie 3 Modelle
            </h2>
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
          </div>

          {/* Slider */}
          <div className="relative">
            <ul
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scroll-smooth px-4 md:px-16 pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none" }}
            >
              {products.map((p) => (
                <li key={p.productName} className="shrink-0 snap-start w-[280px] md:w-[340px]">
                  <ProductCard {...p} priceWrapperClass="items-center gap-x-1 flex flex-wrap justify-center gap-y-1" />
                </li>
              ))}
            </ul>

            {/* Nav buttons */}
            <div className="hidden md:flex justify-end gap-3 pt-8 pr-16">
              <button
                onClick={() => scroll("left")}
                aria-label="Previous"
                className="bg-zinc-200 hover:bg-zinc-300 p-3 rounded-full transition-colors"
              >
                <svg width="10" height="17" viewBox="0 0 10 17" fill="none"><path d="M8.5 1L1.5 8.5L8.5 16" stroke="#666" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Next"
                className="bg-zinc-200 hover:bg-zinc-300 p-3 rounded-full transition-colors"
              >
                <svg width="10" height="17" viewBox="0 0 10 17" fill="none"><path d="M1.5 1L8.5 8.5L1.5 16" stroke="#666" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
