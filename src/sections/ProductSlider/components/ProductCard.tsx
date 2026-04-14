import { Link } from "react-router-dom";

export type ColorSwatch = {
  color: string;
  label: string;
};

export type ProductCardProps = {
  productUrl: string;
  productAriaLabel: string;
  imageContainerClass: string;
  imageSrc: string;
  imageAlt: string;
  modelLabel: string;
  productName: string;
  currentPrice: string;
  originalPrice: string;
  savingsText: string;
  priceWrapperClass: string;
  colorSwatches?: ColorSwatch[];
  roofType: string;
  windResistance: string;
  interestedCount: string;
  buyButtonAriaLabel: string;
};

export const ProductCard = (props: ProductCardProps) => {
  return (
    <Link
      to={props.productUrl}
      aria-label={props.productAriaLabel}
      className="group relative block w-full"
    >
      {/* Image container */}
      <div
        className="w-full overflow-hidden rounded-3xl"
        style={{ aspectRatio: "4/5" }}
      >
        <img
          src={props.imageSrc}
          alt={props.imageAlt}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* subtle dark vignette at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Floating label — protrudes below image */}
      <div
        className="absolute -bottom-5 left-3 right-3 flex items-center justify-between rounded-xl bg-white/95 backdrop-blur-sm px-4 py-2.5 shadow-lg"
      >
        <span
          className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#344148]"
          style={{ fontFamily: 'LEMONMILK, sans-serif' }}
        >
          {props.productName}
        </span>
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
          style={{ backgroundColor: "#82B2CA" }}
        >
          <svg
            className="h-3 w-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
};
