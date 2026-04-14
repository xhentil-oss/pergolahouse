import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import photo2 from "@/assets/Photo (2).png";
import photo3 from "@/assets/Photo (3).png";
import photo4 from "@/assets/Photo (4).png";
import photo5 from "@/assets/Photo (5).png";
import photo6 from "@/assets/Photo (6).png";

const modelCards = [
  { url: "/pergola/elegante-pergola", img: photo2, savings: "35% sparen", name: "Elegante Pergola", price: "2.589 €", oldPrice: "3.990 €", spec1: "Manuelles Lamellendach", spec2: "Windfest bis 100km/h", colors: ["#2D3436","#F1EDE5","#0A0A0A","#8E9499","#D4BC6A"] },
  { url: "/pergola/luxus-pergola", img: photo3, savings: "35% sparen", name: "Luxus-Pergola", price: "3.429 €", oldPrice: "5.290 €", spec1: "Elektrisches Lamellendach", spec2: "Bis zu 120km/h (Sturm)", colors: ["#2D3436","#F1EDE5","#0A0A0A","#8E9499","#D4BC6A"] },
  { url: "/pergola/preiswerte-pergola", img: photo4, savings: "30% sparen", name: "Preiswerte Pergola", price: "5.099 €", oldPrice: "7.290 €", spec1: "Elektrische LED-Lamellen", spec2: "Bis zu 140km/h (Orkan)", colors: ["#2D3436","#F1EDE5","#0A0A0A","#8E9499","#D4BC6A"] },
  { url: "/wintergarten", img: photo5, savings: "30% sparen", name: "Wintergärten", price: "6.785 €", oldPrice: "9.694 €", spec1: "Elektrisches Lamellendach", spec2: "Bis zu 120km/h (Sturm)", colors: ["#2D3436","#F1EDE5","#0A0A0A","#8E9499","#D4BC6A"] },
  { url: "/pergola/massanfertigung", img: photo6, savings: "30% sparen", name: "Pergola Maßanfertigung", price: "4.899 €", oldPrice: "6.990 €", spec1: "Individuelle Maße & Ausstattung", spec2: "Bis zu 120km/h (Sturm)", colors: ["#2D3436","#F1EDE5","#0A0A0A","#8E9499","#D4BC6A"] },
];

const FREE_SHIPPING_THRESHOLD = 5000;

const formatPrice = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export const HeaderActions = () => {
  const { items, removeFromCart, updateQuantity, cartOpen, setCartOpen, totalItems, totalPrice } = useCart();
  const [modelsOpen, setModelsOpen] = useState(false);
  const modelsRef = useRef<HTMLDivElement>(null);

  const shippingProgress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - totalPrice, 0);

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = "hidden";
    } else if (!modelsOpen) {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen, modelsOpen]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modelsRef.current && !modelsRef.current.contains(e.target as Node)) {
        setModelsOpen(false);
      }
    };
    if (modelsOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [modelsOpen]);

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Models button */}
        <div ref={modelsRef} className="relative hidden md:block">
          <button
            type="button"
            onClick={() => setModelsOpen(!modelsOpen)}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: "#82B2CA" }}
          >
            <span>Modelle entdecken</span>
            <svg className={`h-3.5 w-3.5 transition-transform duration-200 ${modelsOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {modelsOpen && (
            <div
              className="fixed inset-x-0 z-[100] border-t border-stone-200 bg-white shadow-2xl"
              style={{ top: modelsRef.current?.getBoundingClientRect().bottom ?? 0 }}
            >
              <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-16">
                <div className="mb-6 flex items-end justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#82B2CA]">Unsere Kollektion</span>
                    <h3 className="mt-1 text-2xl font-semibold text-[#344148]">Pergola Modelle</h3>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-5 xl:grid-cols-6">
                  {modelCards.map((m) => (
                    <Link
                      key={m.url}
                      to={m.url}
                      onClick={() => setModelsOpen(false)}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white transition-all hover:border-[#82B2CA]/30 hover:shadow-xl hover:shadow-[#82B2CA]/5"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img src={m.img} alt={m.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <span className="absolute right-2 top-2 rounded-full bg-[#344148] px-2 py-1 text-[10px] font-bold uppercase text-white">{m.savings}</span>
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <h4 className="text-sm font-semibold text-[#344148] mb-1">{m.name}</h4>
                        <div className="flex items-baseline gap-1.5 mb-2">
                          <span className="text-sm font-bold text-[#344148]">{m.price}</span>
                          <span className="text-xs text-neutral-400 line-through">{m.oldPrice}</span>
                        </div>
                        <div className="space-y-1 mb-3">
                          <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                            <svg className="h-3 w-3 shrink-0 text-[#82B2CA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {m.spec1}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                            <svg className="h-3 w-3 shrink-0 text-[#82B2CA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {m.spec2}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mb-3">
                          {m.colors.map((c, i) => (
                            <div key={i} className="h-4 w-4 rounded-full ring-1 ring-stone-300/60 shadow-sm" style={{ backgroundColor: c }} />
                          ))}
                          <span className="ml-1 text-[10px] text-neutral-400">{m.colors.length} Farben</span>
                        </div>
                        <div className="mt-auto">
                          <span className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#344148] py-2.5 text-xs font-semibold text-white transition hover:bg-[#2a353b]">
                            Jetzt entdecken
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="hidden md:block mx-1 h-6 w-px bg-zinc-200" />

        {/* Cart button */}
        <button
          aria-label="Warenkorb"
          className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all hover:bg-zinc-100 hover:scale-105 active:scale-95"
          onClick={() => setCartOpen(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#344148" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ backgroundColor: "#82B2CA" }}>
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setCartOpen(false)}
      />

      {/* ── Cart Drawer ── */}
      <div
        className={`fixed top-0 right-0 z-[9999] flex h-full w-full max-w-[480px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
      >

        {/* ── Dark header ── */}
        <div className="flex items-center justify-between px-6 py-5" style={{ backgroundColor: "#344148" }}>
          <div className="flex items-center gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="font-lemonmilk text-base text-white tracking-wide">Warenkorb</span>
            {totalItems > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-[#344148]" style={{ backgroundColor: "#82B2CA" }}>
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
            aria-label="Schließen"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* ── Shipping progress bar ── */}
        {totalPrice > 0 && (
          <div className="border-b border-stone-100 px-6 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-neutral-500">
                {remaining > 0
                  ? <><span className="font-semibold text-[#344148]">{formatPrice(remaining)}</span> bis zum kostenlosen Versand</>
                  : <span className="font-semibold text-emerald-600">Kostenloser Versand inklusive!</span>
                }
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={remaining === 0 ? "#10b981" : "#82B2CA"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-stone-100">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${shippingProgress}%`, backgroundColor: remaining === 0 ? "#10b981" : "#82B2CA" }}
              />
            </div>
          </div>
        )}

        {/* ── Items ── */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              {/* Pergola outline icon */}
              <svg className="mb-6 opacity-10" width="80" height="60" viewBox="0 0 80 60" fill="none" stroke="#344148" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="0" y1="20" x2="80" y2="20" />
                <line x1="10" y1="20" x2="10" y2="60" />
                <line x1="70" y1="20" x2="70" y2="60" />
                <line x1="10" y1="20" x2="10" y2="5" />
                <line x1="70" y1="20" x2="70" y2="5" />
                <line x1="5" y1="5" x2="75" y2="5" />
                {[15, 22, 29, 36, 43, 50, 57, 64].map((x) => (
                  <line key={x} x1={x} y1="5" x2={x} y2="20" />
                ))}
              </svg>
              <p className="font-lemonmilk text-lg text-[#344148]">Noch leer</p>
              <p className="mt-2 text-sm text-neutral-400 max-w-[220px] leading-relaxed">
                Entdecken Sie unsere Pergolen und gestalten Sie Ihren Traumgarten.
              </p>
              <button
                onClick={() => setCartOpen(false)}
                className="mt-6 rounded-full px-7 py-3 text-sm font-semibold text-white transition hover:opacity-85"
                style={{ backgroundColor: "#344148" }}
              >
                Modelle entdecken
              </button>
            </div>
          ) : (
            <div className="divide-y divide-stone-100 px-6">
              {items.map((item) => (
                <div key={item.id} className="py-5">
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                      <img src={item.image} alt={item.productName} className="h-full w-full object-cover" />
                    </div>

                    {/* Main info */}
                    <div className="flex flex-1 flex-col min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-[#344148] leading-tight">{item.productName}</h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full text-neutral-300 transition hover:bg-red-50 hover:text-red-400"
                          aria-label="Entfernen"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>

                      {/* Price */}
                      <p className="font-lemonmilk text-base text-[#344148] mt-0.5">{formatPrice(item.totalPrice)}</p>

                      {/* Config chips */}
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center gap-1 rounded-full border border-stone-200 px-2.5 py-0.5 text-[10px] text-neutral-500">
                          {item.color}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-stone-200 px-2.5 py-0.5 text-[10px] text-neutral-500">
                          {item.size}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-stone-200 px-2.5 py-0.5 text-[10px] text-neutral-500">
                          {item.mount}
                        </span>
                        {item.sides.map((s) => (
                          <span key={s.key} className="inline-flex items-center gap-1 rounded-full border border-[#82B2CA]/30 bg-[#82B2CA]/8 px-2.5 py-0.5 text-[10px] text-[#344148]">
                            {s.label}: {s.type}
                          </span>
                        ))}
                        {item.accessories.map((a) => (
                          <span key={a.label} className="inline-flex items-center gap-1 rounded-full border border-[#82B2CA]/30 bg-[#82B2CA]/8 px-2.5 py-0.5 text-[10px] text-[#344148]">
                            {a.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quantity row */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-stone-200 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="flex h-7 w-7 items-center justify-center text-neutral-500 transition hover:bg-stone-50 disabled:opacity-30 text-sm"
                      >−</button>
                      <span className="min-w-[1.5rem] text-center text-xs font-semibold text-[#344148]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-7 w-7 items-center justify-center text-neutral-500 transition hover:bg-stone-50 text-sm"
                      >+</button>
                    </div>
                    <span className="text-xs text-neutral-400">
                      {item.quantity > 1 && `${item.quantity} × ${formatPrice(item.totalPrice)}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        {items.length > 0 && (
          <div className="border-t border-stone-100 px-6 pt-4 pb-6">
            {/* Price breakdown */}
            <div className="space-y-1.5 mb-4">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Zwischensumme ({totalItems} {totalItems === 1 ? "Artikel" : "Artikel"})</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Versand</span>
                <span className="text-emerald-500">{remaining === 0 ? "Kostenlos" : "Wird berechnet"}</span>
              </div>
            </div>

            <div className="flex items-baseline justify-between border-t border-stone-100 pt-3 mb-5">
              <span className="text-sm font-semibold text-[#344148]">Gesamtpreis</span>
              <span className="font-lemonmilk text-2xl text-[#344148]">{formatPrice(totalPrice)}</span>
            </div>

            <button
              className="w-full rounded-full py-4 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
              style={{ backgroundColor: "#344148" }}
            >
              Zur Kasse →
            </button>
            <button
              onClick={() => setCartOpen(false)}
              className="mt-2 w-full text-center text-xs text-neutral-400 transition hover:text-neutral-600 py-1"
            >
              oder weiter einkaufen
            </button>
          </div>
        )}
      </div>
    </>
  );
};
