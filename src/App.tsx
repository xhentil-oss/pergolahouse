import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HomePage } from "@/pages/HomePage";
import { UeberUnsPage } from "@/pages/UeberUnsPage";
import { ContactPage } from "./pages/ContactPage";
import { ElegantePergolaPage } from "@/pages/ElegantePergolaPage";
import { LuxusPergolaPage } from "@/pages/LuxusPergolaPage";
import { PreiswertePergolaPage } from "@/pages/PreiswertePergolaPage";
import { PergolaManfertigungPage } from "@/pages/PergolaManfertigungPage";
import { WintergartenPage } from "@/pages/WintergartenPage";
import { CarportsPage } from "@/pages/CarportsPage";
import { ZipScreensPage } from "@/pages/ZipScreensPage";
import { CartProvider } from "@/context/CartContext";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

export const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pergola/elegante-pergola" element={<ElegantePergolaPage />} />
          <Route path="/pergola/luxus-pergola" element={<LuxusPergolaPage />} />
          <Route path="/pergola/preiswerte-pergola" element={<PreiswertePergolaPage />} />
          <Route path="/pergola/massanfertigung" element={<PergolaManfertigungPage />} />
          <Route path="/wintergarten" element={<WintergartenPage />} />
          <Route path="/carports" element={<CarportsPage />} />
          <Route path="/zip-screens" element={<ZipScreensPage />} />
          <Route path="/ueber-uns" element={<UeberUnsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};
