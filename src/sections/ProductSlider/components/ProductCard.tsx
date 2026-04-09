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
    <div className="group h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200/80 hover:border-[#82B2CA]/30 hover:shadow-xl hover:shadow-[#82B2CA]/5 transition-all duration-300">
      {/* Image */}
      <a href={props.productUrl} aria-label={props.productAriaLabel} className="relative block overflow-hidden">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={props.imageSrc}
            alt={props.imageAlt}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        {/* Model badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#344148] text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
          {props.modelLabel}
        </span>
        {/* Savings badge */}
        <span className="absolute top-3 right-3 bg-[#344148] text-white text-[11px] font-bold uppercase px-2.5 py-1.5 rounded-full">
          {props.savingsText}
        </span>
      </a>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Name + Price */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-[#344148] mb-1.5">{props.productName}</h3>
          <div className={props.priceWrapperClass}>
            <span className="text-lg font-bold text-[#344148]">{props.currentPrice}</span>
            <span className="text-sm text-neutral-400 line-through">{props.originalPrice}</span>
          </div>
        </div>

        {/* Specs */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <svg className="h-3.5 w-3.5 text-[#82B2CA] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {props.roofType}
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <svg className="h-3.5 w-3.5 text-[#82B2CA] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {props.windResistance}
          </div>
        </div>

        {/* Color swatches */}
        {props.colorSwatches && props.colorSwatches.length > 0 && (
          <div className="flex items-center gap-1.5 mb-4">
            {props.colorSwatches.map((swatch, i) => (
              <div
                key={i}
                title={swatch.label}
                className="h-5 w-5 rounded-full ring-1 ring-stone-300/60 shadow-sm"
                style={{ backgroundColor: swatch.color }}
              />
            ))}
            <span className="text-xs text-neutral-400 ml-1">{props.colorSwatches.length} Farben</span>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA */}
        <a
          href={props.productUrl}
          aria-label={props.buyButtonAriaLabel}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 bg-[#344148] text-white hover:bg-[#2a353b]"
        >
          Jetzt entdecken
          <svg className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};
