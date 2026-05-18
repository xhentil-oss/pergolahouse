export type PriceConfig = {
  // Base price per sqm (all pergola configurators)
  pergolaPerSqm: number;

  // Side type surcharges (per side)
  screenRollo: number;
  schiebeverglasung: number;
  guillotineVerglasung: number;

  // Mount surcharge
  wandmontage: number;

  // Accessories – Beleuchtung
  warmweissesLicht: number;
  kaltweissLicht: number;
  rgbBeleuchtung: number;
  perimeterBeleuchtung: number;
  spotBeleuchtung: number;

  // Accessories – Sensoren
  windsensor: number;
  regensensor: number;
  schneesensor: number;
  sonnensensor: number;
  solarSystem: number;

  // Accessories – Heizung & Komfort
  infrarotHeizung: number;
  integriertSteckdosen: number;
  soundsystem: number;

  // Promotion base prices & discounts
  elegante_originalPrice: number;
  elegante_discountPercent: number;
  luxus_originalPrice: number;
  luxus_discountPercent: number;
  preiswerte_originalPrice: number;
  preiswerte_discountPercent: number;
  wintergarten_originalPrice: number;
  wintergarten_discountPercent: number;

  // Wintergarten fixed size prices
  wintergarten_3x3: number;
  wintergarten_3x4: number;
  wintergarten_3x5: number;
  wintergarten_3x6: number;
  wintergarten_4x4: number;
  wintergarten_4x5: number;
  wintergarten_4x6: number;
};

export const defaultPrices: PriceConfig = {
  pergolaPerSqm: 445,

  screenRollo: 499,
  schiebeverglasung: 899,
  guillotineVerglasung: 1199,
  wandmontage: 240,

  warmweissesLicht: 329,
  kaltweissLicht: 299,
  rgbBeleuchtung: 449,
  perimeterBeleuchtung: 389,
  spotBeleuchtung: 279,

  windsensor: 249,
  regensensor: 219,
  schneesensor: 239,
  sonnensensor: 229,
  solarSystem: 699,

  infrarotHeizung: 549,
  integriertSteckdosen: 199,
  soundsystem: 599,

  elegante_originalPrice: 3990,
  elegante_discountPercent: 35,
  luxus_originalPrice: 5290,
  luxus_discountPercent: 35,
  preiswerte_originalPrice: 7290,
  preiswerte_discountPercent: 30,
  wintergarten_originalPrice: 9694,
  wintergarten_discountPercent: 30,

  wintergarten_3x3: 6490,
  wintergarten_3x4: 7190,
  wintergarten_3x5: 7890,
  wintergarten_3x6: 8590,
  wintergarten_4x4: 8990,
  wintergarten_4x5: 9690,
  wintergarten_4x6: 10390,
};
