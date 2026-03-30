export type ColorSwatch = {
  src: string;
  alt: string;
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
    <li className="items-center box-border caret-transparent gap-x-6 flex flex-col h-full gap-y-6">
      <div className="box-border caret-transparent gap-x-6 flex flex-col justify-between min-h-[544px] min-w-[auto] gap-y-6 w-full">
        <div className="box-border caret-transparent gap-x-6 flex flex-col min-h-[auto] min-w-[auto] gap-y-6">
          <div className="items-center box-border caret-transparent gap-x-6 flex flex-col justify-center min-h-[auto] min-w-[auto] gap-y-6 w-full">
            <a
              href={props.productUrl}
              aria-label={props.productAriaLabel}
              className="box-border caret-transparent block min-h-[auto] min-w-[auto] w-full overflow-hidden rounded-xl"
            >
              <div
                className={`relative aspect-[272_/_204] bg-cover box-border caret-transparent max-w-[368px] w-full md:aspect-[544_/_408] ${props.imageContainerClass}`}
              >
                <picture className="box-border caret-transparent block h-full max-w-full w-full">
                  <img
                    src={props.imageSrc}
                    alt={props.imageAlt}
                    className="aspect-[auto_375_/_281] box-border caret-transparent h-full max-w-full object-cover w-full"
                  />
                </picture>
              </div>
            </a>
            <div className="items-center box-border caret-transparent gap-x-2 flex flex-col min-h-[auto] min-w-[auto] gap-y-2">
              <div className="box-border caret-transparent min-h-[auto] min-w-[auto] text-center">
                <div className="text-yellow-800 text-sm font-semibold box-border caret-transparent leading-[18px] min-h-[18px]">
                  {props.modelLabel}
                </div>
                <h3 className="text-black text-2xl font-semibold box-border caret-transparent leading-7">
                  {props.productName}
                </h3>
              </div>
              <div className="box-border caret-transparent min-h-[auto] min-w-[auto]">
                <span className={props.priceWrapperClass}>
                  <div className="font-medium items-end box-border caret-transparent gap-x-1 flex leading-5 min-h-[auto] min-w-[auto] gap-y-1 p-1">
                    {props.currentPrice}
                  </div>
                  <span className="text-amber-500 font-medium box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] line-through">
                    {props.originalPrice}
                  </span>
                  <div className="text-green-500 font-medium bg-emerald-100 box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] uppercase p-1 rounded-md">
                    {props.savingsText}
                  </div>
                </span>
              </div>
            </div>
          </div>
          <div className="items-center box-border caret-transparent gap-x-1 flex flex-col justify-center min-h-[auto] min-w-[auto] gap-y-1 text-center">
            <div className="relative box-border caret-transparent gap-x-2 gap-y-2 flex min-h-[auto] min-w-[auto]">
              {props.colorSwatches &&
                props.colorSwatches.map((swatch, index) => (
                  <div
                    key={index}
                    className="relative box-border caret-transparent flex min-h-[auto] min-w-[auto] overflow-hidden rounded-xl after:accent-auto after:shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_0px_0px_0px_inset,rgba(0,0,0,0.48)_0px_0px_2px_0px_inset,rgba(0,0,0,0.02)_0px_-5px_10px_0px_inset] after:box-border after:caret-transparent after:text-neutral-900 after:block after:text-base after:not-italic after:normal-nums after:font-normal after:tracking-[normal] after:leading-6 after:list-outside after:list-none after:pointer-events-auto after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:rounded-xl after:border-separate after:inset-0 after:font-ui_sans_serif"
                  >
                    <img
                      src={swatch.src}
                      alt={swatch.alt}
                      className="aspect-[auto_20_/_20] box-border caret-transparent max-w-full min-h-[auto] min-w-[auto] w-5 rounded-xl"
                    />
                  </div>
                ))}
            </div>
            <div className="text-sm font-semibold box-border caret-transparent leading-[18px] min-h-[auto] min-w-[auto]">
              {props.roofType}
            </div>
            <div className="text-neutral-500 text-sm box-border caret-transparent leading-[18px] min-h-[auto] min-w-[auto]">
              <p className="box-border caret-transparent">
                {props.windResistance}
              </p>
            </div>
          </div>
        </div>
        <div className="box-border caret-transparent gap-x-3 flex flex-col min-h-[auto] min-w-[auto] gap-y-3">
          <div className="box-border caret-transparent block min-h-[auto] min-w-[auto]">
            <div className="box-border caret-transparent">
              <div className="items-center box-border caret-transparent gap-x-1 flex justify-center gap-y-1 text-center">
                <img
                  src="https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-19.svg"
                  alt="Icon"
                  className="box-border caret-transparent h-[13px] w-4"
                />
                <div className="text-neutral-500 text-sm box-border caret-transparent gap-x-0.5 flex leading-[18px] min-h-[auto] min-w-[auto] gap-y-0.5 text-left">
                  <span className="box-border caret-transparent block min-h-[auto] min-w-[auto]">
                    {props.interestedCount}
                  </span>
                  Interessenten online
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="items-center box-border caret-transparent gap-x-2 flex flex-col min-h-[auto] min-w-[auto] gap-y-2 w-full border-neutral-100 pb-6 border-b border-solid">
          <a
            href={props.productUrl}
            aria-label={props.buyButtonAriaLabel}
            className="text-white font-medium items-center bg-green-700 box-border caret-transparent flex justify-center leading-5 max-h-12 min-h-[auto] min-w-[auto] text-center w-full border border-green-800 p-4 rounded-md border-solid"
          >
            Jetzt kaufen →
          </a>
        </div>
      </div>
      <div className="items-center box-border caret-transparent gap-x-6 hidden flex-col justify-center gap-y-6 w-full"></div>
    </li>
  );
};
