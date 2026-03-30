export type TickerItemProps = {
  iconSrc: string;
  iconClassName: string;
  text: string;
};

export const TickerItem = (props: TickerItemProps) => {
  return (
    <span className="items-center box-border caret-transparent gap-x-3 flex shrink-0 min-h-[auto] min-w-[auto] gap-y-3 text-nowrap px-8 border-r border-solid border-white/40">
      <img
        src={props.iconSrc}
        alt="Icon"
        className={`text-green-700 box-border caret-transparent text-nowrap ${props.iconClassName}`}
      />
      <div className="font-medium box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] text-nowrap">
        {props.text}
      </div>
    </span>
  );
};
