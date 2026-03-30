import { HeroCountdown } from "@/sections/Hero/components/HeroCountdown";
import { HeroText } from "@/sections/Hero/components/HeroText";
import { HeroButtons } from "@/sections/Hero/components/HeroButtons";
import { HeroTrailer } from "@/sections/Hero/components/HeroTrailer";

export const HeroContent = () => {
  return (
    <div className="relative text-white items-center bg-none box-border caret-transparent gap-x-6 flex flex-col shrink-0 h-max justify-center min-h-[auto] min-w-[auto] gap-y-6 text-center -translate-y-24 w-full z-10 -mb-24 pt-0 pb-[72px] px-4 md:items-start md:bg-[linear-gradient(rgb(0,0,0)_37.24%,rgb(43,43,43)_101.62%)] md:h-auto md:text-start md:transform-none md:w-6/12 md:mb-0 md:pt-[72px] md:px-[72px]">
      <HeroCountdown />
      <HeroText />
      <HeroButtons />
      <HeroTrailer />
    </div>
  );
};
