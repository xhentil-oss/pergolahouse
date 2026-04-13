

import { useState } from "react";
import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { BrandLogos } from "@/sections/BrandLogos";
import { FeatureTicker } from "@/sections/FeatureTicker";
import { ProductSlider } from "@/sections/ProductSlider";
import { FeatureSlider } from "@/sections/FeatureSlider";
import { DesignServices } from "@/sections/DesignServices";
import { BenefitsGrid } from "@/sections/BenefitsGrid";
import { PermitCheck } from "@/sections/PermitCheck";
import { ReviewsSlider } from "@/sections/ReviewsSlider";
import { FAQ } from "@/sections/FAQ";
import { Footer } from "@/sections/Footer";

export const HomePage = () => {


  return (
    <div className="relative text-neutral-900 bg-white overflow-x-hidden font-inter_tight">
      <Header />
      <main role="main">
        <Hero />
        <FeatureTicker />
        <DesignServices />
        <ProductSlider />
        <FeatureSlider />
        <BenefitsGrid />
        <PermitCheck />
        <ReviewsSlider />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};
