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
          backgroundColorClass="bg-[#344148]"
        />
      </main>
      <Footer />
    </div>
  );
};
