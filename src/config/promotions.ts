/**
 * ─────────────────────────────────────────────
 *  PROMOTIONS CONFIG
 *  Vendos `active: true` për të aktivizuar uljen.
 *  Çmimi i ri llogaritet automatikisht në gjithë website.
 * ─────────────────────────────────────────────
 */

export type Promotion = {
  key: string;
  label: string;
  href: string;
  originalPrice: number;   // çmimi pa ulje (€)
  discountPercent: number; // % e uljes
  active: boolean;         // true = aktive, false = joaktive
};

export const promotions: Promotion[] = [
  {
    key: "elegante-pergola",
    label: "Elegante Pergola",
    href: "/pergola/elegante-pergola",
    originalPrice: 3990,
    discountPercent: 35,
    active: true,
  },
  {
    key: "luxus-pergola",
    label: "Luxus-Pergola",
    href: "/pergola/luxus-pergola",
    originalPrice: 5290,
    discountPercent: 35,
    active: true,
  },
  {
    key: "preiswerte-pergola",
    label: "Preiswerte Pergola",
    href: "/pergola/preiswerte-pergola",
    originalPrice: 7290,
    discountPercent: 30,
    active: true,
  },
  {
    key: "wintergarten",
    label: "Wintergärten",
    href: "/wintergarten",
    originalPrice: 9694,
    discountPercent: 30,
    active: true,
  },
];

/** Kthe çmimin aktual (me ulje nëse aktive, pa ulje nëse jo) */
export const getPrice = (key: string): number => {
  const p = promotions.find((x) => x.key === key);
  if (!p) return 0;
  if (!p.active) return p.originalPrice;
  return Math.round(p.originalPrice * (1 - p.discountPercent / 100));
};

/**
 * Apliko uljen mbi çfarëdo çmimi bazë.
 * Nëse promocioni nuk është aktiv, kthen çmimin origjinal.
 */
export const applyDiscount = (key: string, basePrice: number): number => {
  const p = promotions.find((x) => x.key === key);
  if (!p || !p.active) return basePrice;
  return Math.round(basePrice * (1 - p.discountPercent / 100));
};

/** Kthe promocionin e plotë për një produkt */
export const getPromotion = (key: string): Promotion | undefined =>
  promotions.find((x) => x.key === key);

/** Formatim çmimi: 3.429 € */
export const formatPromoPrice = (n: number): string =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
