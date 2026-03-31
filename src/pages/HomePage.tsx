import { useState } from "react";
import { CookieBanner } from "@/components/CookieBanner";
import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { FeatureTicker } from "@/sections/FeatureTicker";
import { BrandLogos } from "@/sections/BrandLogos";
import { ProductSlider } from "@/sections/ProductSlider";
import { FeatureSlider } from "@/sections/FeatureSlider";
import { VideoSlider } from "@/sections/VideoSlider";
import { BenefitsGrid } from "@/sections/BenefitsGrid";
import { PermitCheck } from "@/sections/PermitCheck";
import { ReviewsSlider } from "@/sections/ReviewsSlider";
import { FAQ } from "@/sections/FAQ";
import { Footer } from "@/sections/Footer";
import { TrustBadge } from "@/components/TrustBadge";

export const HomePage = () => {
  const [cookieAccepted, setCookieAccepted] = useState(false);

  return (
    <div className="relative text-neutral-900 bg-white overflow-x-hidden font-inter_tight">
      {!cookieAccepted && <CookieBanner onAccept={() => setCookieAccepted(true)} />}
      <Header />
      <main role="main">
        <Hero />
        <FeatureTicker />
        <BrandLogos />
        <ProductSlider />
        <FeatureSlider />
        <VideoSlider />
        <BenefitsGrid />
        <PermitCheck />
        <ReviewsSlider />
        <FAQ />
        <FeatureTicker
          backgroundColorClass="bg-zinc-900"
          items={[
            { iconSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-13.svg", iconClassName: "h-6 w-6", text: "Sicher in extremen Wetterbedingungen" },
            { iconSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-14.svg", iconClassName: "h-[23px] w-6", text: "Gratis Lieferung ab 1.000 €" },
            { iconSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-15.svg", iconClassName: "h-4 w-5", text: "Video-Anleitungen" },
            { iconSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-16.svg", iconClassName: "h-[18px] w-[15px]", text: "iOS und Android App" },
            { iconSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-17.svg", iconClassName: "h-[21px] w-[22px]", text: "Sonnenschutz" },
            { iconSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-18.svg", iconClassName: "h-[21px] w-[22px]", text: "Hohe Schneelast" },
          ]}
        />
      </main>
      <Footer />
      <TrustBadge />
    </div>
  );
};
