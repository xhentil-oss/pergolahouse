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
    <div className="group h-full flex flex-col bg-transparent relative w-full max-w-full">
      {/* Image */}
      <a href={props.productUrl} aria-label={props.productAriaLabel} className="block w-full">
        <div
          className="w-full h-[340px] md:h-[400px] bg-black relative"
          style={{
            borderRadius: 0,
            overflow: 'hidden',
          }}
        >
          <img
            src={props.imageSrc}
            alt={props.imageAlt}
            className="w-full h-full object-cover"
            style={{ borderRadius: 0, boxShadow: 'none' }}
          />
        </div>
      </a>
      {/* Title and Button */}
      <div className="relative bg-white flex items-center h-[80px] pl-6 pr-24 w-full" style={{ borderTop: 'none', borderRadius: 0 }}>
        <span className="text-lg font-bold text-[#181818] font-lemonmilk-medium tracking-wide">{props.productName}</span>
        <a
          href={props.productUrl}
          aria-label={props.buyButtonAriaLabel}
          className="absolute right-7 bottom-5 z-10"
        >
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#82B2CA] shadow-lg hover:bg-[#5fa0b8] transition-colors">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  );
};
