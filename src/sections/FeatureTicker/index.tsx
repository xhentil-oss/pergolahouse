export type TickerItemData = {
  iconSrc: string;
  iconClassName: string;
  text: string;
};

export type FeatureTickerProps = {
  backgroundColorClass?: string;
  items?: TickerItemData[];
};

const defaultItems: TickerItemData[] = [
  { iconSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-13.svg", iconClassName: "h-6 w-6", text: "Sicher in extremen Wetterbedingungen" },
  { iconSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-14.svg", iconClassName: "h-[23px] w-6", text: "Kostenlose Lieferung ab 1.000 € Bestellwert" },
  { iconSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-15.svg", iconClassName: "h-4 w-5", text: "Video-Anleitungen" },
  { iconSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-16.svg", iconClassName: "h-[18px] w-[15px]", text: "iOS- und Android-App" },
  { iconSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-17.svg", iconClassName: "h-[21px] w-[22px]", text: "Sonnenschutz" },
  { iconSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-18.svg", iconClassName: "h-[21px] w-[22px]", text: "Hohe Schneelast" },
];

export const FeatureTicker = (props: FeatureTickerProps) => {
  const { backgroundColorClass = "bg-neutral-900", items = defaultItems } = props;
  // Triplicate for seamless loop
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className={`relative text-white ${backgroundColorClass} w-full overflow-hidden py-4`}>
      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.3333%); }
        }
        .ticker-track { animation: ticker-scroll 30s linear infinite; }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="ticker-track flex w-max">
        {repeated.map((item, index) => (
          <span
            key={index}
            className="items-center gap-x-3 flex shrink-0 text-nowrap px-8 border-r border-white/20"
          >
            <img src={item.iconSrc} alt="" className={`shrink-0 ${item.iconClassName}`} />
            <span className="font-medium leading-5 text-nowrap">{item.text}</span>
          </span>
        ))}
      </div>
    </div>
  );
};
