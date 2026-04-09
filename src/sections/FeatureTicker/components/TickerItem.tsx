import React from "react";

export type TickerItemProps = {
  icon: React.ReactNode;
  text: string;
};

export const TickerItem = (props: TickerItemProps) => {
  return (
    <span className="items-center gap-x-3 flex shrink-0 text-nowrap px-8 border-r border-white/20">
      {props.icon}
      <span className="font-medium leading-5 text-nowrap">
        {props.text}
      </span>
    </span>
  );
};
