import { useState } from "react";
import { useDiscounts } from "@/context/DiscountContext";
import { promotions, getPromotion, formatPromoPrice } from "@/config/promotions";

const ADMIN_PASSWORD = "pergola2026";

export const AdminPage = () => {
  const [input, setInput] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const { discounts, toggle } = useDiscounts();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#344148" }}>
        <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-[#82B2CA] mb-2" style={{ fontFamily: "LEMONMILK, sans-serif" }}>
              Admin
            </p>
            <h1 className="text-2xl text-[#344148]" style={{ fontFamily: "LEMONMILK, sans-serif", fontWeight: 400 }}>
              Anmelden
            </h1>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Passwort"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm text-[#344148] outline-none focus:border-[#82B2CA]"
            />
            {error && (
              <p className="text-xs text-red-500 text-center">Falsches Passwort</p>
            )}
            <button
              type="submit"
              className="w-full rounded-full py-3 text-sm font-semibold text-white transition hover:opacity-85"
              style={{ backgroundColor: "#344148" }}
            >
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
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#82B2CA] mb-1" style={{ fontFamily: "LEMONMILK, sans-serif" }}>
              Admin Panel
            </p>
            <h1 className="text-2xl text-[#344148]" style={{ fontFamily: "LEMONMILK, sans-serif", fontWeight: 400 }}>
              Rabatt-Aktionen
            </h1>
          </div>
          <button
            onClick={() => setLoggedIn(false)}
            className="rounded-full border-2 border-[#344148] px-5 py-2 text-xs font-semibold text-[#344148] hover:bg-[#344148] hover:text-white transition-all"
          >
            Ausloggen
          </button>
        </div>

        {/* Discount toggles */}
        <div className="flex flex-col gap-4">
          {promotions.map((p) => {
            const active = discounts[p.key] ?? false;
            const discountedPrice = Math.round(p.originalPrice * (1 - p.discountPercent / 100));

            return (
              <div
                key={p.key}
                className="flex items-center justify-between rounded-2xl bg-white px-6 py-5 shadow-sm border border-stone-100"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-[#344148]" style={{ fontFamily: "LEMONMILK, sans-serif" }}>
                    {p.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400 line-through">{formatPromoPrice(p.originalPrice)}</span>
                    <span className="text-xs font-bold text-[#344148]">→ {formatPromoPrice(discountedPrice)}</span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[9px] font-bold text-white"
                      style={{ backgroundColor: "#82B2CA" }}
                    >
                      -{p.discountPercent}%
                    </span>
                  </div>
                </div>

                {/* Toggle switch */}
                <button
                  type="button"
                  onClick={() => toggle(p.key)}
                  className="relative inline-flex h-7 w-14 shrink-0 items-center rounded-full transition-colors duration-200"
                  style={{ backgroundColor: active ? "#344148" : "#d1d5db" }}
                  aria-label={`Toggle ${p.label}`}
                >
                  <span
                    className="inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200"
                    style={{ transform: active ? "translateX(30px)" : "translateX(4px)" }}
                  />
                </button>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-neutral-400">
          Änderungen werden sofort auf der Website angezeigt.
        </p>
      </div>
    </div>
  );
};
