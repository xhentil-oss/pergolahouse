import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { FeatureTicker } from "@/sections/FeatureTicker";
import { FAQ } from "@/sections/FAQ";
import photo2 from "@/assets/Photo (2).png";
import photo3 from "@/assets/Photo (3).png";
import photo4 from "@/assets/Photo (4).png";
import photo5 from "@/assets/Photo (5).png";
import photo6 from "@/assets/Photo (6).png";
import photo7 from "@/assets/Photo (7).png";
import photo8 from "@/assets/Photo (8).png";
import photo9 from "@/assets/Photo (9).png";

const products = [
  {
    href: "/products/pergolux-pergola-s3",
    imageSrc: photo2,
    imageAlt: "PERGOLUX Pergola S3",
    badge: "Manuelles Modell",
    name: "Pergola S3",
    currentPrice: "2.589 €",
    originalPrice: "3.990 €",
    savings: "35% sparen",
    roofType: "Manuelles Lamellendach",
    windResistance: "Windfest bis 100km/h",
    stars: 4.8,
    reviews: 1240,
  },
  {
    href: "/products/pergolux-sundream-s3",
    imageSrc: photo3,
    imageAlt: "PERGOLUX Sundream S3",
    badge: "Beliebtestes Modell",
    name: "Sundream S3",
    currentPrice: "3.429 €",
    originalPrice: "5.290 €",
    savings: "35% sparen",
    roofType: "Elektrisches Lamellendach",
    windResistance: "Bis zu 120km/h (Sturm)",
    stars: 4.9,
    reviews: 876,
  },
  {
    href: "/products/pergolux-skydance-s3",
    imageSrc: photo4,
    imageAlt: "PERGOLUX Skydance S3",
    badge: "Unser Premium-Modell",
    name: "Skydance S3",
    currentPrice: "5.099 €",
    originalPrice: "7.290 €",
    savings: "30% sparen",
    roofType: "Elektrische LED-Lamellen",
    windResistance: "Bis zu 140km/h (Orkan)",
    stars: 4.9,
    reviews: 532,
  },
  {
    href: "/products/pergola-custom-design",
    imageSrc: photo5,
    imageAlt: "PERGOLUX Maßanfertigung S3",
    badge: "Individuelle Maße",
    name: "Maßanfertigung S3",
    currentPrice: "6.785 €",
    originalPrice: "9.694 €",
    savings: "30% sparen",
    roofType: "Elektrisches Lamellendach",
    windResistance: "Bis zu 120km/h (Sturm)",
    stars: 4.8,
    reviews: 321,
  },
  {
    href: "/products/pergolux-pergola-s3",
    imageSrc: photo6,
    imageAlt: "PERGOLUX Pergola S3 Anthrazit",
    badge: "Neu",
    name: "Pergola S3 Anthrazit",
    currentPrice: "2.789 €",
    originalPrice: "4.100 €",
    savings: "32% sparen",
    roofType: "Manuelles Lamellendach",
    windResistance: "Windfest bis 100km/h",
    stars: 4.7,
    reviews: 210,
  },
  {
    href: "/products/pergolux-sundream-s3",
    imageSrc: photo7,
    imageAlt: "PERGOLUX Sundream S3 Weiß",
    badge: "Bestseller",
    name: "Sundream S3 Weiß",
    currentPrice: "3.629 €",
    originalPrice: "5.490 €",
    savings: "34% sparen",
    roofType: "Elektrisches Lamellendach",
    windResistance: "Bis zu 120km/h (Sturm)",
    stars: 4.8,
    reviews: 645,
  },
  {
    href: "/products/pergolux-skydance-s3",
    imageSrc: photo8,
    imageAlt: "PERGOLUX Skydance S3 Schwarz",
    badge: "Premium",
    name: "Skydance S3 Schwarz",
    currentPrice: "5.299 €",
    originalPrice: "7.490 €",
    savings: "29% sparen",
    roofType: "Elektrische LED-Lamellen",
    windResistance: "Bis zu 140km/h (Orkan)",
    stars: 5.0,
    reviews: 189,
  },
  {
    href: "/products/pergola-custom-design",
    imageSrc: photo9,
    imageAlt: "PERGOLUX Maßanfertigung Premium",
    badge: "Auf Maß",
    name: "Maßanfertigung Premium",
    currentPrice: "7.185 €",
    originalPrice: "10.200 €",
    savings: "30% sparen",
    roofType: "Elektrisches Lamellendach",
    windResistance: "Bis zu 120km/h (Sturm)",
    stars: 4.9,
    reviews: 98,
  },
];

const StarRating = ({ stars }: { stars: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= Math.round(stars) ? "#f59e0b" : "#d1d5db"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span className="text-neutral-500 text-xs ml-1">({stars.toFixed(1)})</span>
    </div>
  );
};

export const CollectionsPage = () => {
  return (
    <div className="relative text-neutral-900 bg-white overflow-x-hidden font-inter_tight">
      <Header />
      <main role="main">
        {/* Hero Banner */}
        <div className="bg-[#344148] py-14 md:py-20 text-center">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Finaler Abverkauf</p>
          <h1 className="text-white text-4xl md:text-6xl font-semibold leading-tight mb-4">
            Unsere Pergolen
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Serie 3 — Entdecke alle Modelle und finde deine perfekte Pergola.
          </p>
        </div>

        {/* Ticker */}
        <FeatureTicker
          backgroundColorClass="bg-amber-500"
          items={[
            { iconSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-13.svg", iconClassName: "h-5 w-5", text: "Gratis Lieferung" },
            { iconSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-14.svg", iconClassName: "h-5 w-5", text: "iOS und Android App" },
            { iconSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-15.svg", iconClassName: "h-5 w-5", text: "Sicher in extremen Wetterbedingungen" },
            { iconSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-16.svg", iconClassName: "h-5 w-5", text: "Hohe Schneelast" },
            { iconSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-17.svg", iconClassName: "h-5 w-5", text: "Video-Anleitungen" },
            { iconSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-18.svg", iconClassName: "h-5 w-5", text: "Sonnenschutz" },
          ]}
        />

        {/* Product Grid */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-16 py-16 md:py-24">
          {/* Filter bar */}
          <div className="flex items-center justify-between mb-10 border-b border-neutral-200 pb-6">
            <p className="text-neutral-500 text-sm">{products.length} Produkte</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-600 font-medium">Sortieren:</span>
              <select className="text-sm border border-neutral-200 rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-zinc-400">
                <option>Empfohlen</option>
                <option>Preis: aufsteigend</option>
                <option>Preis: absteigend</option>
                <option>Bestseller</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {products.map((p) => (
              <li key={p.name} className="flex flex-col group">
                <a href={p.href} className="block overflow-hidden rounded-2xl mb-4 relative">
                  <img
                    src={p.imageSrc}
                    alt={p.imageAlt}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-white text-zinc-900 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                    {p.badge}
                  </span>
                </a>
                <div className="flex flex-col flex-1 text-center gap-1">
                  <h2 className="text-zinc-900 font-semibold text-lg leading-tight">{p.name}</h2>
                  <StarRating stars={p.stars} />
                  <p className="text-neutral-500 text-sm">{p.roofType}</p>
                  <p className="text-neutral-400 text-xs">{p.windResistance}</p>
                  <div className="flex items-center justify-center gap-2 mt-2 flex-wrap">
                    <span className="text-zinc-900 font-semibold text-base">{p.currentPrice}</span>
                    <span className="text-neutral-400 text-sm line-through">{p.originalPrice}</span>
                    <span className="text-green-600 text-xs font-semibold bg-green-50 px-2 py-0.5 rounded-md uppercase">
                      {p.savings}
                    </span>
                  </div>
                  <a
                    href={p.href}
                    className="mt-3 block text-white bg-green-700 hover:bg-green-800 transition-colors font-medium text-sm py-3 px-4 rounded-xl border border-green-800"
                  >
                    Jetzt kaufen →
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};
