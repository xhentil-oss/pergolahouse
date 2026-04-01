import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import contactHero from "@/assets/Photo (11).png";

const contactMethods = [
  {
    title: "Telefon",
    value: "+49 661 4108750",
    hint: "Mo-Fr, 09:00-18:00",
    href: "tel:+4966141087500",
  },
  {
    title: "E-Mail",
    value: "info@pergola.de",
    hint: "Antwort in 24 Stunden",
    href: "mailto:info@pergola.de",
  },
  {
    title: "Showroom",
    value: "Frankfurt am Main",
    hint: "Beratung vor Ort",
    href: "/pages/showroom-3-0",
  },
];

export const ContactPage = () => {
  return (
    <div className="relative text-neutral-900 bg-white overflow-x-hidden font-inter_tight">
      <Header />
      <main role="main">
        <section className="relative isolate overflow-hidden min-h-[380px] md:min-h-[460px] flex items-center justify-center text-center px-4 py-16">
          <img src={contactHero} alt="" className="absolute inset-0 z-0 w-full h-full object-cover object-top" />
          <div className="absolute inset-0 z-10 bg-zinc-900/35" />
          <div className="relative z-20 max-w-3xl mx-auto">
            <p className="text-[#82B2CA] text-sm font-semibold uppercase tracking-[0.18em] mb-4">Wir helfen dir weiter</p>
            <h1 className="text-white text-4xl md:text-6xl font-semibold leading-tight mb-4">Kontakt</h1>
            <p className="text-white/80 text-base md:text-lg">
              Hast du Fragen zu Modellen, Lieferung oder Montage? Unser Team antwortet schnell und persoenlich.
            </p>
          </div>
        </section>

        <section className="max-w-[1440px] mx-auto px-4 md:px-16 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-10">
          <div className="lg:col-span-3 bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
            <div className="mb-8">
              <p className="text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Schreib uns</p>
              <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-zinc-900">Sende uns deine Nachricht</h2>
              <p className="text-neutral-500 mt-3">Wir melden uns so schnell wie moeglich bei dir zurueck.</p>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-5" action="#" method="post">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-zinc-700 mb-2">Vorname</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Dein Vorname"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#82B2CA] focus:border-[#82B2CA]"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-zinc-700 mb-2">Nachname</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Dein Nachname"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#82B2CA] focus:border-[#82B2CA]"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">E-Mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@email.de"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#82B2CA] focus:border-[#82B2CA]"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 mb-2">Telefon</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+49 ..."
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#82B2CA] focus:border-[#82B2CA]"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="topic" className="block text-sm font-medium text-zinc-700 mb-2">Thema</label>
                <select
                  id="topic"
                  name="topic"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#82B2CA] focus:border-[#82B2CA]"
                  defaultValue=""
                >
                  <option value="" disabled>Bitte waehlen</option>
                  <option value="beratung">Produktberatung</option>
                  <option value="lieferung">Lieferung</option>
                  <option value="montage">Montage</option>
                  <option value="service">Service</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-zinc-700 mb-2">Nachricht</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Wie koennen wir dir helfen?"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#82B2CA] focus:border-[#82B2CA]"
                />
              </div>

              <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
                <p className="text-xs text-neutral-500">Mit dem Absenden stimmst du der Verarbeitung deiner Daten zu.</p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl bg-zinc-900 text-white px-7 py-3.5 text-sm font-semibold hover:bg-zinc-800 transition-colors"
                >
                  Nachricht senden
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl bg-gradient-to-br from-[#344148] to-[#1f2a31] p-6 md:p-8 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-[#82B2CA] font-semibold mb-3">Direkter Kontakt</p>
              <h3 className="text-2xl font-semibold mb-5">Unser Team ist fuer dich da</h3>
              <div className="space-y-4">
                {contactMethods.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="block rounded-2xl border border-white/15 bg-white/5 px-4 py-4 hover:bg-white/10 transition-colors"
                  >
                    <p className="text-sm text-[#82B2CA]">{item.title}</p>
                    <p className="text-base font-semibold mt-0.5">{item.value}</p>
                    <p className="text-xs text-white/70 mt-1">{item.hint}</p>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-[#82B2CA]/10 p-6 md:p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[#82B2CA] font-semibold mb-3">Schneller Service</p>
              <h3 className="text-2xl font-semibold text-zinc-900 mb-3">Was passiert als naechstes?</h3>
              <ul className="space-y-2.5 text-sm text-neutral-700">
                <li>1. Wir pruefen deine Anfrage innerhalb weniger Stunden.</li>
                <li>2. Du bekommst eine persoenliche Rueckmeldung vom Expertenteam.</li>
                <li>3. Bei Bedarf planen wir direkt den naechsten Schritt mit dir.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
