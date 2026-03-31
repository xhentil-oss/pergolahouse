import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { CollectionsPage } from "@/pages/CollectionsPage";
import { UeberUnsPage } from "@/pages/UeberUnsPage";
import { ContactPage } from "./pages/ContactPage";
import { PergolaS3Page } from "@/pages/PergolaS3Page";
import { MassanfertigungPage } from "@/pages/MassanfertigungPage";
import { CartProvider } from "@/context/CartContext";

export const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections/unsere-pergolen" element={<CollectionsPage />} />
        <Route path="/products/pergola-s3" element={<PergolaS3Page />} />
        <Route path="/products/pergola-custom-design" element={<MassanfertigungPage />} />
        <Route path="/pages/ueber-uns" element={<UeberUnsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};
