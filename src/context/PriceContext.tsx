import { createContext, useContext, useState } from "react";
import { defaultPrices, PriceConfig } from "@/config/prices";

const STORAGE_KEY = "pergola_admin_prices";

const loadPrices = (): PriceConfig => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaultPrices, ...JSON.parse(stored) } : defaultPrices;
  } catch {
    return defaultPrices;
  }
};

type PriceContextType = {
  prices: PriceConfig;
  updatePrices: (updates: Partial<PriceConfig>) => void;
  resetPrices: () => void;
};

const PriceContext = createContext<PriceContextType>({
  prices: defaultPrices,
  updatePrices: () => {},
  resetPrices: () => {},
});

export const PriceProvider = ({ children }: { children: React.ReactNode }) => {
  const [prices, setPrices] = useState<PriceConfig>(loadPrices);

  const updatePrices = (updates: Partial<PriceConfig>) => {
    setPrices((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const resetPrices = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPrices(defaultPrices);
  };

  return (
    <PriceContext.Provider value={{ prices, updatePrices, resetPrices }}>
      {children}
    </PriceContext.Provider>
  );
};

export const usePrices = () => useContext(PriceContext);
