import { useState } from "react";
import { useDiscounts } from "@/context/DiscountContext";
import { promotions, formatPromoPrice } from "@/config/promotions";
import { usePrices } from "@/context/PriceContext";
import { PriceConfig } from "@/config/prices";

const ADMIN_PASSWORD = "pergola2026";

type Tab = "rabatt" | "preise";

const PriceInput = ({
  label,
  fieldKey,
  value,
  onChange,
  suffix = "€",
}: {
  label: string;
  fieldKey: keyof PriceConfig;
  value: number;
  onChange: (key: keyof PriceConfig, val: number) => void;
  suffix?: string;
}) => (
  <div className="flex items-center justify-between gap-3 py-2.5 border-b border-stone-100 last:border-0">
    <span className="text-sm text-[#344148]">{label}</span>
    <div className="flex items-center gap-1">
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(fieldKey, Number(e.target.value))}
        className="w-24 rounded-lg border border-stone-200 px-2.5 py-1.5 text-sm text-right text-[#344148] outline-none focus:border-[#82B2CA]"
      />
      <span className="text-xs text-neutral-400 w-4">{suffix}</span>
    </div>
  </div>
);

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl bg-white px-6 py-5 shadow-sm border border-stone-100">
    <h3 className="text-xs font-semibold uppercase tracking-widest text-[#82B2CA] mb-4" style={{ fontFamily: "LEMONMILK, sans-serif" }}>
      {title}
    </h3>
    {children}
  </div>
);

export const AdminPage = () => {
  const [input, setInput] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState<Tab>("rabatt");
  const { discounts, toggle } = useDiscounts();
  const { prices, updatePrices, resetPrices } = usePrices();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) { setLoggedIn(true); setError(false); }
    else { setError(true); }
  };

  const set = (key: keyof PriceConfig, val: number) => updatePrices({ [key]: val });

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#344148" }}>
        <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-[#82B2CA] mb-2" style={{ fontFamily: "LEMONMILK, sans-serif" }}>Admin</p>
            <h1 className="text-2xl text-[#344148]" style={{ fontFamily: "LEMONMILK, sans-serif", fontWeight: 400 }}>Anmelden</h1>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Passwort"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm text-[#344148] outline-none focus:border-[#82B2CA]"
            />
            {error && <p className="text-xs text-red-500 text-center">Falsches Passwort</p>}
            <button type="submit" className="w-full rounded-full py-3 text-sm font-semibold text-white transition hover:opacity-85" style={{ backgroundColor: "#344148" }}>
              Einloggen
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4" style={{ backgroundColor: "#f8f7f5" }}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#82B2CA] mb-1" style={{ fontFamily: "LEMONMILK, sans-serif" }}>Admin Panel</p>
            <h1 className="text-2xl text-[#344148]" style={{ fontFamily: "LEMONMILK, sans-serif", fontWeight: 400 }}>Verwaltung</h1>
          </div>
          <button
            onClick={() => setLoggedIn(false)}
            className="rounded-full border-2 border-[#344148] px-5 py-2 text-xs font-semibold text-[#344148] hover:bg-[#344148] hover:text-white transition-all"
          >
            Ausloggen
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white rounded-2xl p-1.5 shadow-sm border border-stone-100">
          {([["rabatt", "Rabatt-Aktionen"], ["preise", "Preise bearbeiten"]] as [Tab, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all"
              style={{
                backgroundColor: tab === key ? "#344148" : "transparent",
                color: tab === key ? "#fff" : "#344148",
                fontFamily: "LEMONMILK, sans-serif",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── TAB: Rabatt-Aktionen ── */}
        {tab === "rabatt" && (
          <div className="flex flex-col gap-4">
            {promotions.map((p) => {
              const active = discounts[p.key] ?? false;
              const promoData: Record<string, { origKey: keyof PriceConfig; discKey: keyof PriceConfig }> = {
                "elegante-pergola":  { origKey: "elegante_originalPrice",   discKey: "elegante_discountPercent" },
                "luxus-pergola":     { origKey: "luxus_originalPrice",      discKey: "luxus_discountPercent" },
                "preiswerte-pergola":{ origKey: "preiswerte_originalPrice", discKey: "preiswerte_discountPercent" },
                "wintergarten":      { origKey: "wintergarten_originalPrice",discKey: "wintergarten_discountPercent" },
              };
              const { origKey, discKey } = promoData[p.key] ?? { origKey: "luxus_originalPrice", discKey: "luxus_discountPercent" };
              const originalPrice = (prices[origKey] as number) ?? p.originalPrice;
              const discountPercent = (prices[discKey] as number) ?? p.discountPercent;
              const discountedPrice = Math.round(originalPrice * (1 - discountPercent / 100));
              return (
                <div key={p.key} className="flex items-center justify-between rounded-2xl bg-white px-6 py-5 shadow-sm border border-stone-100">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-[#344148]" style={{ fontFamily: "LEMONMILK, sans-serif" }}>{p.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neutral-400 line-through">{formatPromoPrice(originalPrice)}</span>
                      <span className="text-xs font-bold text-[#344148]">→ {formatPromoPrice(discountedPrice)}</span>
                      <span className="rounded-full px-2 py-0.5 text-[9px] font-bold text-white" style={{ backgroundColor: "#82B2CA" }}>
                        -{discountPercent}%
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggle(p.key)}
                    className="relative inline-flex h-7 w-14 shrink-0 items-center rounded-full transition-colors duration-200"
                    style={{ backgroundColor: active ? "#344148" : "#d1d5db" }}
                  >
                    <span className="inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200" style={{ transform: active ? "translateX(30px)" : "translateX(4px)" }} />
                  </button>
                </div>
              );
            })}
            <p className="mt-4 text-center text-xs text-neutral-400">Änderungen werden sofort auf der Website angezeigt.</p>
          </div>
        )}

        {/* ── TAB: Preise bearbeiten ── */}
        {tab === "preise" && (
          <div className="flex flex-col gap-4">

            <SectionCard title="Aktionspreise – Startpreis & Rabatt (Homepage-Anzeige)">
              <p className="text-[11px] text-zinc-400 mb-3 -mt-1">Diese Preise erscheinen auf der Startseite und in den Rabatt-Aktionen oben.</p>
              <PriceInput label="Elegante Pergola – Startpreis" fieldKey="elegante_originalPrice" value={prices.elegante_originalPrice} onChange={set} />
              <PriceInput label="Elegante Pergola – Rabatt %" fieldKey="elegante_discountPercent" value={prices.elegante_discountPercent} onChange={set} suffix="%" />
              <PriceInput label="Luxus-Pergola – Startpreis" fieldKey="luxus_originalPrice" value={prices.luxus_originalPrice} onChange={set} />
              <PriceInput label="Luxus-Pergola – Rabatt %" fieldKey="luxus_discountPercent" value={prices.luxus_discountPercent} onChange={set} suffix="%" />
              <PriceInput label="Preiswerte Pergola – Startpreis" fieldKey="preiswerte_originalPrice" value={prices.preiswerte_originalPrice} onChange={set} />
              <PriceInput label="Preiswerte Pergola – Rabatt %" fieldKey="preiswerte_discountPercent" value={prices.preiswerte_discountPercent} onChange={set} suffix="%" />
              <PriceInput label="Wintergärten – Startpreis" fieldKey="wintergarten_originalPrice" value={prices.wintergarten_originalPrice} onChange={set} />
              <PriceInput label="Wintergärten – Rabatt %" fieldKey="wintergarten_discountPercent" value={prices.wintergarten_discountPercent} onChange={set} suffix="%" />
            </SectionCard>

            <SectionCard title="Konfigurator – Grundpreis (Produktseiten)">
              <p className="text-[11px] text-zinc-400 mb-3 -mt-1">Diese Preise berechnen den Gesamtpreis direkt auf den Produktseiten.</p>
              <PriceInput label="Preis pro m² (alle Pergolen)" fieldKey="pergolaPerSqm" value={prices.pergolaPerSqm} onChange={set} />
              <PriceInput label="Wandmontage – Aufpreis" fieldKey="wandmontage" value={prices.wandmontage} onChange={set} />
            </SectionCard>

            <SectionCard title="Seitenwände (€/m²)">
              <p className="text-[11px] text-zinc-400 mb-3 -mt-1">Preis pro m² der jeweiligen Wandfläche (Breite oder Tiefe × Höhe).</p>
              <PriceInput label="Zip-Screen / Screen Rollo" fieldKey="screenRollo" value={prices.screenRollo} onChange={set} suffix="€/m²" />
              <PriceInput label="Faltglasverglasung" fieldKey="faltglasverglasung" value={prices.faltglasverglasung} onChange={set} suffix="€/m²" />
              <PriceInput label="Schiebeverglasung" fieldKey="schiebeverglasung" value={prices.schiebeverglasung} onChange={set} suffix="€/m²" />
              <PriceInput label="Guillotine-Verglasung" fieldKey="guillotineVerglasung" value={prices.guillotineVerglasung} onChange={set} suffix="€/m²" />
            </SectionCard>

            <SectionCard title="Zubehör – Beleuchtung (€/m²)">
              <p className="text-[11px] text-zinc-400 mb-3 -mt-1">Diese Preise werden mit der gewählten Fläche (Breite × Tiefe) multipliziert.</p>
              <PriceInput label="Warmweißes Licht" fieldKey="warmweissesLicht" value={prices.warmweissesLicht} onChange={set} suffix="€/m²" />
              <PriceInput label="Kaltweiß Licht" fieldKey="kaltweissLicht" value={prices.kaltweissLicht} onChange={set} suffix="€/m²" />
              <PriceInput label="RGB-Beleuchtung" fieldKey="rgbBeleuchtung" value={prices.rgbBeleuchtung} onChange={set} suffix="€/m²" />
              <PriceInput label="Perimeter-Beleuchtung" fieldKey="perimeterBeleuchtung" value={prices.perimeterBeleuchtung} onChange={set} suffix="€/m²" />
              <PriceInput label="Spot-Beleuchtung" fieldKey="spotBeleuchtung" value={prices.spotBeleuchtung} onChange={set} suffix="€/m²" />
            </SectionCard>

            <SectionCard title="Zubehör – Sensoren (€/m²)">
              <p className="text-[11px] text-zinc-400 mb-3 -mt-1">Diese Preise werden mit der gewählten Fläche (Breite × Tiefe) multipliziert.</p>
              <PriceInput label="Windsensor" fieldKey="windsensor" value={prices.windsensor} onChange={set} suffix="€/m²" />
              <PriceInput label="Regensensor" fieldKey="regensensor" value={prices.regensensor} onChange={set} suffix="€/m²" />
              <PriceInput label="Schneesensor" fieldKey="schneesensor" value={prices.schneesensor} onChange={set} suffix="€/m²" />
              <PriceInput label="Sonnensensor" fieldKey="sonnensensor" value={prices.sonnensensor} onChange={set} suffix="€/m²" />
              <PriceInput label="Solar-System" fieldKey="solarSystem" value={prices.solarSystem} onChange={set} suffix="€/m²" />
            </SectionCard>

            <SectionCard title="Zubehör – Heizung & Komfort (€/m²)">
              <p className="text-[11px] text-zinc-400 mb-3 -mt-1">Diese Preise werden mit der gewählten Fläche (Breite × Tiefe) multipliziert.</p>
              <PriceInput label="Infrarot-Heizung" fieldKey="infrarotHeizung" value={prices.infrarotHeizung} onChange={set} suffix="€/m²" />
              <PriceInput label="Integrierte Steckdosen" fieldKey="integriertSteckdosen" value={prices.integriertSteckdosen} onChange={set} suffix="€/m²" />
              <PriceInput label="Soundsystem" fieldKey="soundsystem" value={prices.soundsystem} onChange={set} suffix="€/m²" />
            </SectionCard>

            <SectionCard title="Wintergarten – Konfigurator">
              <p className="text-[11px] text-zinc-400 mb-3 -mt-1">Der Preis wird je nach eingegebener Fläche (Breite × Länge) automatisch berechnet.</p>
              <PriceInput label="Preis pro m² (Wintergarten)" fieldKey="wintergarten_perSqm" value={prices.wintergarten_perSqm} onChange={set} />
              <PriceInput label="Smart Steuerung" fieldKey="smartSteuerung" value={prices.smartSteuerung} onChange={set} />
            </SectionCard>

            <SectionCard title="Preiswerte Pergola – Modelle PH1–PH6">
              <p className="text-[11px] text-zinc-400 mb-3 -mt-1">Grundpreise der einzelnen Komplettsets auf der Produktseite.</p>
              <PriceInput label="PH1 – 3×4 m, manuell, 4 Pfosten" fieldKey="preiswerte_ph1" value={prices.preiswerte_ph1} onChange={set} />
              <PriceInput label="PH2 – 4×4 m, Motor + LED, 4 Pfosten" fieldKey="preiswerte_ph2" value={prices.preiswerte_ph2} onChange={set} />
              <PriceInput label="PH3 – 3×4 m, Motorantrieb, 4 Pfosten" fieldKey="preiswerte_ph3" value={prices.preiswerte_ph3} onChange={set} />
              <PriceInput label="PH4 – 4×5 m, Motorantrieb, 4 Pfosten" fieldKey="preiswerte_ph4" value={prices.preiswerte_ph4} onChange={set} />
              <PriceInput label="PH5 – 4×4 m, Motor + LED, 2 Pfosten wandmontiert" fieldKey="preiswerte_ph5" value={prices.preiswerte_ph5} onChange={set} />
              <PriceInput label="PH6 – 4×5 m, Motorantrieb, 2 Pfosten wandmontiert" fieldKey="preiswerte_ph6" value={prices.preiswerte_ph6} onChange={set} />
            </SectionCard>

            <div className="flex justify-center pt-2 pb-6">
              <button
                onClick={() => { if (confirm("Alle Preise auf Standardwerte zurücksetzen?")) resetPrices(); }}
                className="rounded-full border-2 border-red-300 px-6 py-2 text-xs font-semibold text-red-400 hover:bg-red-50 transition-all"
              >
                Preise zurücksetzen
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
