import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { CollectionsPage } from "@/pages/CollectionsPage";
import { UeberUnsPage } from "@/pages/UeberUnsPage";
import { ContactPage } from "./pages/ContactPage";
import { ElegantePergolaPage } from "@/pages/ElegantePergolaPage";
import { LuxusPergolaPage } from "@/pages/LuxusPergolaPage";
import { PreiswertePergolaPage } from "@/pages/PreiswertePergolaPage";
import { PergolaManfertigungPage } from "@/pages/PergolaManfertigungPage";
import { WintergartenPage } from "@/pages/WintergartenPage";
import { CarportsPage } from "@/pages/CarportsPage";
import { ZipScreensPage } from "@/pages/ZipScreensPage";
import { ScreenRolloPage } from "@/pages/ScreenRolloPage";
import { GlaswandePage } from "@/pages/GlaswandePage";
import { LEDStripesPage } from "@/pages/LEDStripesPage";
import { WaermelampePage } from "@/pages/WaermelampePage";
import { CartProvider } from "@/context/CartContext";

export const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections/unsere-pergolen" element={<CollectionsPage />} />
        <Route path="/products/pergola-s3" element={<ElegantePergolaPage />} />
        <Route path="/products/pergola-custom-design" element={<LuxusPergolaPage />} />
        <Route path="/products/preiswerte-pergola" element={<PreiswertePergolaPage />} />
        <Route path="/products/pergola-massanfertigung" element={<PergolaManfertigungPage />} />
        <Route path="/collections/wintergarten-1" element={<WintergartenPage />} />
        <Route path="/collections/carports" element={<CarportsPage />} />
        <Route path="/collections/zip-screens" element={<ZipScreensPage />} />
        <Route path="/products/screen-rollo" element={<ScreenRolloPage />} />
        <Route path="/products/glaswande" element={<GlaswandePage />} />
        <Route path="/products/led-stripes" element={<LEDStripesPage />} />
        <Route path="/products/waermelampe" element={<WaermelampePage />} />
        <Route path="/pages/ueber-uns" element={<UeberUnsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};
