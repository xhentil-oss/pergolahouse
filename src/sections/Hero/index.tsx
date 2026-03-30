import { HeroMedia } from "@/sections/Hero/components/HeroMedia";
import { HeroContent } from "@/sections/Hero/components/HeroContent";

export const Hero = () => {
  return (
    <section className="box-border caret-transparent">
      <div className="box-border caret-transparent">
        <div className="relative bg-black box-border caret-transparent flex flex-col h-full w-full overflow-hidden md:bg-transparent md:flex-row md:h-[673.92px]">
          <HeroMedia />
          <HeroContent />
        </div>
      </div>
    </section>
  );
};
