import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { Wrench, Sparkles, Shield } from "lucide-react";
import photo10 from "@/assets/Photo (10).png";
import photo11 from "@/assets/Photo (11).png";
import photo12 from "@/assets/Photo (12).png";
import photo13 from "@/assets/Photo (13).png";
import heroBg from "@/assets/Photo (1).png";

const values = [
  {
    icon: Wrench,
    title: "Einfache Selbstmontage",
    text: "Schritt-für-Schritt Anleitungen & Video-Tutorials – kein Fachmann nötig.",
  },
  {
    icon: Sparkles,
    title: "Premium Aluminium",
    text: "Pulverbeschichtetes Aluminium – rostfrei, langlebig & pflegeleicht.",
  },
  {
    icon: Shield,
    title: "Bis zu 10 Jahre Garantie",
    text: "Sorgenfrei genießen – mit unserer erweiterten Herstellergarantie.",
  },
];

const stats = [
  { value: "100.000+", label: "Zufriedene Kunden" },
  { value: "14", label: "Länder" },
  { value: "10+", label: "Jahre Erfahrung" },
  { value: "4,79 ★", label: "Durchschnittsbewertung" },
];

export const UeberUnsPage = () => {
  return (
    <div className="relative text-neutral-900 bg-white overflow-x-hidden font-inter_tight">
      <Header />
      <main role="main">

        {/* Hero */}
        <div className="relative min-h-[540px] md:min-h-[620px] py-20 md:py-32 text-center px-4">
          <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover object-top" />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 z-[1]" />
          <div className="relative z-10">
          <p className="text-[#82B2CA] text-sm font-semibold uppercase tracking-widest mb-4">Über uns</p>
          <h1 className="text-white text-4xl md:text-6xl font-semibold leading-tight max-w-3xl mx-auto mb-6">
            Mit Leidenschaft für deine Träume
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Seit über 10 Jahren bringen wir Premium-Pergolen nach Deutschland und Europa – mit skandinavischer Qualität, persönlicher Beratung und fairen Preisen.
          </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white border-b border-neutral-100">
          <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-zinc-900 text-3xl md:text-4xl font-bold">{s.value}</p>
                <p className="text-neutral-500 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-16 py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#82B2CA] text-sm font-semibold uppercase tracking-widest mb-4">Mit Liebe hergestellt, mit Sorgfalt geliefert</p>
            <h2 className="text-zinc-900 text-3xl md:text-5xl font-semibold leading-tight mb-6">
              Wir machen Träume möglich
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Immer mehr Menschen träumen davon, ihre Terrasse aufzuwerten. Nicht nur, um einen erhöhten Nutzwert zu erzielen oder den Garten ästhetischer zu gestalten – sondern vor allem, um unvergessliche Momente mit Freunden und Liebsten zu verbringen.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Bei pergola Haus verstehen wir diese Träume, weil wir sie selbst haben. Jede Pergola, die wir gestalten, ist mehr als nur ein Produkt – sie ist ein Versprechen. Ein Versprechen, dass dein Garten zum Ort der Entspannung wird, an dem Familien zusammenkommen, Freunde lachen und Erinnerungen entstehen.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Unsere Pergolen sind robust genug für Sturm und Regen, elegant genug für deine schönsten Momente, und pflegeleicht genug, damit du dich entspannen kannst – nicht deine Terrasse warten musst. Mit hochwertigen Materialien, modernem Design und gewissenhafter Verarbeitung schaffen wir Lösungen, die Jahrzehnte halten.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Was wir bei uns noch mehr lieben als den Traum selbst, ist diesen zu verwirklichen! Wir liefern großartige Produkte für den Außenbereich, die von hoher Qualität und in einer mehr als fairen Preisklasse erhältlich sind.
            </p>
            <p className="text-zinc-900 font-semibold text-lg">
              Unsere Vision: Wir machen Träume möglich!
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={photo10} alt="Unser Team" className="w-full rounded-2xl object-cover aspect-square" />
            <img src={photo11} alt="Produktion" className="w-full rounded-2xl object-cover aspect-square" />
            <img src={photo12} alt="Qualität" className="w-full rounded-2xl object-cover aspect-square" />
            <img src={photo13} alt="Design" className="w-full rounded-2xl object-cover aspect-square" />
          </div>
        </section>

        {/* Our approach */}
        <section className="bg-neutral-50 py-20 md:py-32">
          <div className="max-w-[1440px] mx-auto px-4 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <img
                src={photo10}
                alt="Beratung"
                className="w-full rounded-2xl object-cover aspect-[4/3]"
              />
            </div>
            <div className="order-1 md:order-2">
              <p className="text-[#82B2CA] text-sm font-semibold uppercase tracking-widest mb-4">Mehr als ein Jahrzehnt Erfahrung</p>
              <h2 className="text-zinc-900 text-3xl md:text-5xl font-semibold leading-tight mb-6">
                Wir gehen die Dinge anders an
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                Mit persönlicher Beratung, norwegischem Design und blitzschneller Lieferung lassen jedes Jahr tausende Gartenträume wahr werden.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-4">
                Wir wissen, dass es für manche Kunden schwierig sein kann, online zu shoppen, und dass sie sich vielleicht unsicher sind, ob ein Produkt wirklich passt. Deshalb bieten wir täglich von 8 bis 22 Uhr persönliche Beratung an.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Als Outdoor-Möbelexperten mit Wurzeln in Norwegen sind wir sowohl qualitäts- als auch preisbewusst. Mit über 10 Jahren Erfahrung in der Branche haben wir ein exklusives Produkt entwickelt, das das Budget nicht sprengt.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-16 py-20 md:py-32">
          <div className="text-center mb-14">
            <p className="text-[#82B2CA] text-sm font-semibold uppercase tracking-widest mb-4">Unsere Werte und unser Versprechen</p>
            <h2 className="text-zinc-900 text-3xl md:text-5xl font-semibold leading-tight">
              Wir erfüllen Träume
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => {
              const IconComponent = v.icon;
              return (
                <div key={v.title} className="bg-neutral-50 rounded-2xl p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <IconComponent size={40} className="text-[#82B2CA]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-zinc-900 text-xl font-semibold mb-3">{v.title}</h3>
                  <p className="text-neutral-600 leading-relaxed text-sm">{v.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-[#344148] py-20 text-center px-4">
          <h2 className="text-white text-3xl md:text-5xl font-semibold mb-4">Du brauchst eine Pergola-Idee?</h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
            Lass dich von unseren Experten inspirieren. Wir helfen dir, die perfekte Pergola für deinen Garten zu finden – von der Planung bis zur Umsetzung.
          </p>
          <a
            href="/contact"
            className="inline-block hover:opacity-90 transition-colors text-white font-semibold px-8 py-4 rounded-xl text-base"
            style={{ backgroundColor: '#82B2CA' }}
          >
            Kontaktiere uns jetzt →
          </a>
        </div>

      </main>
      <Footer />
    </div>
  );
};
