import { ProductCard } from "@/sections/ProductSlider/components/ProductCard";
import photo2 from "@/assets/Photo (2).png";
import photo3 from "@/assets/Photo (3).png";
import photo4 from "@/assets/Photo (4).png";
import photo5 from "@/assets/Photo (5).png";

const products = [
  {
    productUrl: "/products/pergolux-pergola-s3",
    productAriaLabel: "Pergola S3",
    imageContainerClass: "",
    imageSrc: photo2,
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
    imageSrc: photo3,
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
    imageSrc: photo4,
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
    imageSrc: photo5,
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
  return (
    <div className="bg-white">
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

          {/* Grid */}
          <div className="max-w-[1440px] mx-auto px-4 md:px-16 w-full">
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
              {products.map((p) => (
                <li key={p.productName} className="w-full">
                  <ProductCard {...p} priceWrapperClass="items-center gap-x-1 flex flex-wrap justify-center gap-y-1" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
