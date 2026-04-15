import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import heroImg from "@/assets/Photo (9).png";

const steps = [
  {
    number: "01",
    title: "Beratung & Planung",
    description: "Unser Expertenteam berät dich persönlich und plant die optimale Lösung für deinen Außenbereich.",
  },
  {
    number: "02",
    title: "Lieferung",
    description: "Wir liefern alle Komponenten termingerecht und sicher direkt zu dir nach Hause.",
  },
  {
    number: "03",
    title: "Professionelle Montage",
    description: "Unser erfahrenes Montageteam installiert deine Pergola schnell, sauber und fachgerecht.",
  },
  {
    number: "04",
    title: "Abnahme & Service",
    description: "Nach der Montage prüfen wir gemeinsam alles – und stehen dir auch danach jederzeit zur Verfügung.",
  },
];

export const MontageServicePage = () => {
  return (
    <div className="relative text-neutral-900 bg-white overflow-x-hidden font-inter_tight">
      <Header />
      <main role="main">
        {/* Hero */}
        <section className="relative isolate overflow-hidden min-h-[380px] md:min-h-[460px] flex items-center justify-center text-center px-4 py-16">
          <img src={heroImg} alt="" className="absolute inset-0 z-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 z-10 bg-zinc-900/40" />
          <div className="relative z-20 max-w-3xl mx-auto">
            <p className="text-[#82B2CA] text-sm font-semibold uppercase tracking-[0.18em] mb-4">Von Planung bis Fertigstellung</p>
            <h1 className="text-white text-4xl md:text-6xl font-semibold leading-tight mb-4">Montage Service</h1>
            <p className="text-white/80 text-base md:text-lg">
              Professionelle Montage deiner Pergola – schnell, sauber und zuverlässig durch unser Fachteam.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-16 py-14 md:py-24">
          <div className="text-center mb-14">
            <p className="text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.2em] mb-3">So funktioniert es</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900">Unser Montageprozess</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="rounded-3xl border border-neutral-200 p-6 md:p-8">
                <p className="text-4xl font-bold text-[#82B2CA] mb-4">{step.number}</p>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">{step.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#344148] py-14 md:py-20">
          <div className="max-w-[1440px] mx-auto px-4 md:px-16 text-center">
            <p className="text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.2em] mb-4">Jetzt anfragen</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">Bereit für deine neue Pergola?</h2>
            <p className="text-white/70 text-base mb-8 max-w-xl mx-auto">
              Kontaktiere uns und wir planen gemeinsam deinen perfekten Außenbereich.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-[#82B2CA] text-white px-8 py-4 text-sm font-semibold hover:bg-[#6ea0b7] transition-colors"
            >
              Jetzt Kontakt aufnehmen
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
