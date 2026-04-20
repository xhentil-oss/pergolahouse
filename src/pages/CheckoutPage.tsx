import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { useCart } from "@/context/CartContext";

const formatPrice = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

const FREE_SHIPPING_THRESHOLD = 5000;

export const CheckoutPage = () => {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    vorname: "",
    nachname: "",
    email: "",
    telefon: "",
    strasse: "",
    hausnummer: "",
    plz: "",
    ort: "",
    land: "Deutschland",
    anmerkungen: "",
  });

  const shippingCost = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : 299;
  const grandTotal = totalPrice + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div className="relative text-neutral-900 bg-white overflow-x-hidden font-inter_tight">
        <Header />
        <main role="main" className="min-h-[70vh] flex items-center justify-center px-4 py-24">
          <div className="max-w-lg w-full text-center">
            <div
              className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full"
              style={{ backgroundColor: "#82B2CA" }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="font-lemonmilk text-3xl md:text-4xl text-[#344148] mb-4">
              Bestellung eingegangen!
            </h1>
            <p className="text-neutral-500 text-base leading-relaxed mb-2">
              Vielen Dank für Ihre Bestellung. Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden.
            </p>
            <p className="text-neutral-400 text-sm mb-10">
              Eine Bestätigung wird an Ihre E-Mail-Adresse gesendet.
            </p>
            <Link
              to="/"
              className="inline-block rounded-full px-10 py-4 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
              style={{ backgroundColor: "#344148" }}
            >
              Zurück zur Startseite
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative text-neutral-900 bg-white overflow-x-hidden font-inter_tight">
      <Header />
      <main role="main">

        {/* Hero */}
        <section className="flex items-center justify-center py-12 px-4" style={{ backgroundColor: "#344148" }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Sicher & einfach</p>
            <h1 className="font-lemonmilk text-white text-3xl md:text-4xl leading-tight">Zur Kasse</h1>
          </div>
        </section>

        {/* Empty cart */}
        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center py-20">
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
            <p className="font-lemonmilk text-xl text-[#344148] mb-3">Ihr Warenkorb ist leer</p>
            <p className="text-neutral-400 text-sm mb-8 max-w-xs">Entdecken Sie unsere Pergolen und gestalten Sie Ihren Traumgarten.</p>
            <Link
              to="/"
              className="rounded-full px-8 py-3 text-sm font-semibold text-white transition hover:opacity-85"
              style={{ backgroundColor: "#344148" }}
            >
              Modelle entdecken
            </Link>
          </div>
        )}

        {/* Main content */}
        {items.length > 0 && (
          <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-12 md:py-16">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-start">

              {/* ── Left: Form ── */}
              <div className="lg:col-span-3 space-y-8">

                {/* Personal info */}
                <div className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                  <p className="text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.2em] mb-2">Schritt 1</p>
                  <h2 className="text-xl md:text-2xl font-semibold text-[#344148] mb-6">Persönliche Daten</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="vorname" className="block text-sm font-medium text-zinc-700 mb-1.5">Vorname *</label>
                      <input
                        id="vorname" name="vorname" type="text" required
                        value={form.vorname} onChange={handleChange}
                        placeholder="Max"
                        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#82B2CA] focus:border-[#82B2CA]"
                      />
                    </div>
                    <div>
                      <label htmlFor="nachname" className="block text-sm font-medium text-zinc-700 mb-1.5">Nachname *</label>
                      <input
                        id="nachname" name="nachname" type="text" required
                        value={form.nachname} onChange={handleChange}
                        placeholder="Mustermann"
                        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#82B2CA] focus:border-[#82B2CA]"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1.5">E-Mail *</label>
                      <input
                        id="email" name="email" type="email" required
                        value={form.email} onChange={handleChange}
                        placeholder="max@beispiel.de"
                        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#82B2CA] focus:border-[#82B2CA]"
                      />
                    </div>
                    <div>
                      <label htmlFor="telefon" className="block text-sm font-medium text-zinc-700 mb-1.5">Telefon</label>
                      <input
                        id="telefon" name="telefon" type="tel"
                        value={form.telefon} onChange={handleChange}
                        placeholder="+49 123 456789"
                        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#82B2CA] focus:border-[#82B2CA]"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery address */}
                <div className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                  <p className="text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.2em] mb-2">Schritt 2</p>
                  <h2 className="text-xl md:text-2xl font-semibold text-[#344148] mb-6">Lieferadresse</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label htmlFor="strasse" className="block text-sm font-medium text-zinc-700 mb-1.5">Straße *</label>
                      <input
                        id="strasse" name="strasse" type="text" required
                        value={form.strasse} onChange={handleChange}
                        placeholder="Musterstraße"
                        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#82B2CA] focus:border-[#82B2CA]"
                      />
                    </div>
                    <div>
                      <label htmlFor="hausnummer" className="block text-sm font-medium text-zinc-700 mb-1.5">Hausnummer *</label>
                      <input
                        id="hausnummer" name="hausnummer" type="text" required
                        value={form.hausnummer} onChange={handleChange}
                        placeholder="12"
                        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#82B2CA] focus:border-[#82B2CA]"
                      />
                    </div>
                    <div>
                      <label htmlFor="plz" className="block text-sm font-medium text-zinc-700 mb-1.5">PLZ *</label>
                      <input
                        id="plz" name="plz" type="text" required
                        value={form.plz} onChange={handleChange}
                        placeholder="60311"
                        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#82B2CA] focus:border-[#82B2CA]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="ort" className="block text-sm font-medium text-zinc-700 mb-1.5">Ort *</label>
                      <input
                        id="ort" name="ort" type="text" required
                        value={form.ort} onChange={handleChange}
                        placeholder="Frankfurt am Main"
                        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#82B2CA] focus:border-[#82B2CA]"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label htmlFor="land" className="block text-sm font-medium text-zinc-700 mb-1.5">Land *</label>
                      <select
                        id="land" name="land" required
                        value={form.land} onChange={handleChange}
                        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#82B2CA] focus:border-[#82B2CA]"
                      >
                        <option>Deutschland</option>
                        <option>Österreich</option>
                        <option>Schweiz</option>
                        <option>Luxemburg</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                  <p className="text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.2em] mb-2">Optional</p>
                  <h2 className="text-xl md:text-2xl font-semibold text-[#344148] mb-6">Anmerkungen</h2>
                  <textarea
                    id="anmerkungen" name="anmerkungen" rows={4}
                    value={form.anmerkungen} onChange={handleChange}
                    placeholder="Besondere Wünsche, Lieferhinweise oder Rückfragen…"
                    className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#82B2CA] focus:border-[#82B2CA]"
                  />
                </div>
              </div>

              {/* ── Right: Order Summary ── */}
              <div className="lg:col-span-2 sticky top-24 space-y-4">
                <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">

                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-lemonmilk text-base text-[#344148]">Bestellübersicht</h2>
                    <span className="text-xs text-neutral-400">{totalItems} {totalItems === 1 ? "Artikel" : "Artikel"}</span>
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-stone-100 -mx-1">
                    {items.map((item) => (
                      <div key={item.id} className="py-4 px-1">
                        <div className="flex gap-3">
                          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                            <img src={item.image} alt={item.productName} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-semibold text-[#344148] leading-tight">{item.productName}</p>
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="shrink-0 flex h-5 w-5 items-center justify-center rounded-full text-neutral-300 transition hover:bg-red-50 hover:text-red-400"
                              >
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                              </button>
                            </div>
                            <p className="font-lemonmilk text-sm text-[#344148] mt-0.5">{formatPrice(item.totalPrice * item.quantity)}</p>
                            <div className="mt-1.5 flex flex-wrap gap-1">
                              <span className="inline-flex rounded-full border border-stone-200 px-2 py-0.5 text-[9px] text-neutral-500">{item.color}</span>
                              <span className="inline-flex rounded-full border border-stone-200 px-2 py-0.5 text-[9px] text-neutral-500">{item.size}</span>
                              <span className="inline-flex rounded-full border border-stone-200 px-2 py-0.5 text-[9px] text-neutral-500">{item.mount}</span>
                            </div>
                          </div>
                        </div>

                        {/* Qty controls */}
                        <div className="mt-2.5 flex items-center gap-2">
                          <div className="flex items-center rounded-full border border-stone-200 overflow-hidden">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="flex h-7 w-7 items-center justify-center text-neutral-500 transition hover:bg-stone-50 disabled:opacity-30 text-sm"
                            >−</button>
                            <span className="min-w-[1.5rem] text-center text-xs font-semibold text-[#344148]">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="flex h-7 w-7 items-center justify-center text-neutral-500 transition hover:bg-stone-50 text-sm"
                            >+</button>
                          </div>
                          {item.quantity > 1 && (
                            <span className="text-[10px] text-neutral-400">{item.quantity} × {formatPrice(item.totalPrice)}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price breakdown */}
                  <div className="mt-4 space-y-2 border-t border-stone-100 pt-4">
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <span>Zwischensumme</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <span>Versand</span>
                      <span className={shippingCost === 0 ? "text-emerald-500" : ""}>
                        {shippingCost === 0 ? "Kostenlos" : formatPrice(shippingCost)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-stone-100 pt-3">
                      <span className="text-sm font-semibold text-[#344148]">Gesamtpreis</span>
                      <span className="font-lemonmilk text-xl text-[#344148]">{formatPrice(grandTotal)}</span>
                    </div>
                  </div>

                  {/* Trust badges */}
                  <div className="mt-5 flex items-center justify-center gap-4 rounded-2xl py-3" style={{ backgroundColor: "#f8fafc" }}>
                    {[
                      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: "SSL-Sicher" },
                      { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "Geprüft" },
                      { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", label: "Sicher bezahlen" },
                    ].map((b) => (
                      <div key={b.label} className="flex flex-col items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#82B2CA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d={b.icon} />
                        </svg>
                        <span className="text-[9px] text-neutral-400 font-medium">{b.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full rounded-full py-4 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-xl active:scale-[0.98]"
                  style={{ backgroundColor: "#344148" }}
                >
                  Bestellung aufgeben →
                </button>
                <p className="text-center text-[10px] text-neutral-400 leading-relaxed">
                  Mit Ihrer Bestellung stimmen Sie unseren{" "}
                  <span className="text-[#82B2CA] cursor-pointer hover:underline">AGB</span> und der{" "}
                  <span className="text-[#82B2CA] cursor-pointer hover:underline">Datenschutzerklärung</span> zu.
                </p>
              </div>

            </form>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
