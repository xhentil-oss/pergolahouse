import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface CartItemSide {
  key: string;
  label: string;
  type: string;
  price: number;
}

export interface CartItemAccessory {
  label: string;
  price: number;
}

export interface CartItem {
  id: string;
  productName: string;
  image: string;
  color: string;
  size: string;
  mount: string;
  mountSurcharge: number;
  sides: CartItemSide[];
  accessories: CartItemAccessory[];
  basePrice: number;
  totalPrice: number;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "id" | "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((item: Omit<CartItem, "id" | "quantity">) => {
    const id = crypto.randomUUID();
    setItems((prev) => [...prev, { ...item, id, quantity: 1 }]);
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.totalPrice * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartOpen, setCartOpen, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
