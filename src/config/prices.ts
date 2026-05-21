export type PriceConfig = {
  // Base price per sqm (pergola configurators)
  pergolaPerSqm: number;

  // Wintergarten configurator – price per sqm
  wintergarten_perSqm: number;

  // Side type surcharges (per side)
  screenRollo: number;
  faltglasverglasung: number;
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
  smartSteuerung: number;

  // Promotion base prices & discounts
  elegante_originalPrice: number;
  elegante_discountPercent: number;
  luxus_originalPrice: number;
  luxus_discountPercent: number;
  preiswerte_originalPrice: number;
  preiswerte_discountPercent: number;
  wintergarten_originalPrice: number;
  wintergarten_discountPercent: number;

  // Preiswerte Pergola – Modelle PH1–PH6
  preiswerte_ph1: number;
  preiswerte_ph2: number;
  preiswerte_ph3: number;
  preiswerte_ph4: number;
  preiswerte_ph5: number;
  preiswerte_ph6: number;
};

export const defaultPrices: PriceConfig = {
  pergolaPerSqm: 445,
  wintergarten_perSqm: 721,

  screenRollo: 499,
  faltglasverglasung: 799,
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
  smartSteuerung: 399,

  elegante_originalPrice: 3990,
  elegante_discountPercent: 35,
  luxus_originalPrice: 5290,
  luxus_discountPercent: 35,
  preiswerte_originalPrice: 7290,
  preiswerte_discountPercent: 30,
  wintergarten_originalPrice: 9694,
  wintergarten_discountPercent: 30,

  preiswerte_ph1: 3990,
  preiswerte_ph2: 4390,
  preiswerte_ph3: 4790,
  preiswerte_ph4: 5190,
  preiswerte_ph5: 5790,
  preiswerte_ph6: 6390,
};
