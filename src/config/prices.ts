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

  screenRollo: 45,
  faltglasverglasung: 75,
  schiebeverglasung: 85,
  guillotineVerglasung: 115,
  wandmontage: 240,

  warmweissesLicht: 35,
  kaltweissLicht: 32,
  rgbBeleuchtung: 48,
  perimeterBeleuchtung: 42,
  spotBeleuchtung: 30,

  windsensor: 28,
  regensensor: 24,
  schneesensor: 26,
  sonnensensor: 25,
  solarSystem: 75,

  infrarotHeizung: 60,
  integriertSteckdosen: 22,
  soundsystem: 65,
  smartSteuerung: 44,

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
