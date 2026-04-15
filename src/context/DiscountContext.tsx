import { createContext, useContext, useState } from "react";
import { promotions } from "@/config/promotions";

type DiscountState = Record<string, boolean>;

const STORAGE_KEY = "pergola_admin_discounts";

const defaultState = (): DiscountState => {
  const obj: DiscountState = {};
  promotions.forEach((p) => { obj[p.key] = p.active; });
  return obj;
};

const loadState = (): DiscountState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaultState(), ...JSON.parse(stored) } : defaultState();
  } catch {
    return defaultState();
  }
};

type DiscountContextType = {
  isActive: (key: string) => boolean;
  toggle: (key: string) => void;
  discounts: DiscountState;
};

const DiscountContext = createContext<DiscountContextType>({
  isActive: (key) => promotions.find((p) => p.key === key)?.active ?? false,
  toggle: () => {},
  discounts: defaultState(),
});

export const DiscountProvider = ({ children }: { children: React.ReactNode }) => {
  const [discounts, setDiscounts] = useState<DiscountState>(loadState);

  const toggle = (key: string) => {
    setDiscounts((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const isActive = (key: string) => discounts[key] ?? false;

  return (
    <DiscountContext.Provider value={{ discounts, toggle, isActive }}>
      {children}
    </DiscountContext.Provider>
  );
};

export const useDiscounts = () => useContext(DiscountContext);
