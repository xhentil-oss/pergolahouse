import { useEffect, useRef, useState } from "react";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import heroPergola from "@/assets/image-pergola.png";
import photo10 from "@/assets/Photo (10).png";
import photo11 from "@/assets/Photo (11).png";
import photo12 from "@/assets/Photo (12).png";
import photo13 from "@/assets/Photo (13).png";
import photo14 from "@/assets/Photo (14).png";
import video1 from "@/assets/Photo 1 (1).webm";

function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const stats = [
  { value: "100.000+", label: "Zufriedene Kunden" },
  { value: "14", label: "Länder europaweit" },
  { value: "10+", label: "Jahre Erfahrung" },
  { value: "4,79 ★", label: "Kundenbewertung" },
];

const pillars = [
  {
    number: "01",
    title: "Qualität ohne Kompromisse",
    text: "Jede Pergola wird aus pulverbeschichtetem Aluminium gefertigt – korrosionsbeständig, langlebig und wartungsarm. Premium-Material für Premium-Ansprüche.",
  },
  {
    number: "02",
    title: "Design mit Charakter",
    text: "Unsere Strukturen entstehen am Schnittpunkt von skandinavischer Ästhetik und zeitlosem Minimalismus. Jede Linie hat einen Grund.",
  },
  {
    number: "03",
    title: "Service, der überzeugt",
    text: "Von der ersten Beratung bis zur Lieferung – wir sind täglich von 8 bis 22 Uhr für Sie da. Persönlich, kompetent, zuverlässig.",
  },
];

export const UeberUnsPage = () => {
  const statsRef = useFadeIn();
  const manifestoRef = useFadeIn(0.1);
  const storyRef = useFadeIn(0.08);
  const pillarsRef = useFadeIn(0.1);
  const mosaicRef = useFadeIn(0.05);
  const ctaRef = useFadeIn(0.2);

  return (
    <div className="relative text-neutral-900 bg-white overflow-x-hidden font-inter_tight">
      <Header />
      <main role="main">

        {/* ── Hero: compact ── */}
        <section className="relative h-[52vh] min-h-[360px] max-h-[480px] flex items-center">
          <img
            src={heroPergola}
            alt="Pergola Haus – Premium Pergolen"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-16">
            <p
              className="text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.3em] mb-4"
              style={{ animation: "heroTextIn 1s cubic-bezier(0.22,1,0.36,1) both" }}
            >
              Über uns
            </p>
            <h1
              className="font-lemonmilk text-4xl sm:text-5xl md:text-6xl text-white leading-none max-w-2xl"
              style={{ animation: "heroTextIn 1s 0.12s cubic-bezier(0.22,1,0.36,1) both" }}
            >
              Außenräume,<br />neu gedacht.
            </h1>
            <p
              className="mt-4 text-white/55 text-sm md:text-base max-w-sm leading-relaxed"
              style={{ animation: "heroTextIn 1s 0.26s cubic-bezier(0.22,1,0.36,1) both" }}
            >
              Seit über 10 Jahren verwandeln wir Außenbereiche in Orte, an denen Erinnerungen entstehen.
            </p>
          </div>
        </section>

        {/* ── Stats ── */}
        <div
          ref={statsRef.ref}
          className={`bg-[#344148] transition-all duration-700 ${statsRef.visible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-14 grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`py-8 md:py-0 text-center ${i !== 0 ? "border-l border-white/10" : ""}`}
              >
                <p className="font-lemonmilk text-3xl md:text-4xl text-white">{s.value}</p>
                <p className="mt-2 text-white/40 text-xs tracking-widest uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Manifesto ── */}
        <div
          ref={manifestoRef.ref}
          className={`py-24 md:py-40 px-6 md:px-16 max-w-[1440px] mx-auto transition-all duration-1000 ${
            manifestoRef.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.3em] mb-8">
            Unser Versprechen
          </p>
          <h2 className="font-lemonmilk text-4xl md:text-6xl lg:text-[4.25rem] text-[#344148] leading-tight max-w-5xl">
            Wir bauen keine Pergolen.{" "}
            <span className="text-[#82B2CA]">Wir schaffen Räume.</span>
          </h2>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            <p className="text-neutral-500 leading-[1.85] text-base">
              Immer mehr Menschen träumen davon, ihre Terrasse aufzuwerten – nicht nur für mehr Nutzwert, sondern für unvergessliche Momente mit Familie und Freunden. Wir verstehen diese Träume, weil wir sie selbst haben.
            </p>
            <p className="text-neutral-500 leading-[1.85] text-base">
              Jede Pergola, die wir gestalten, ist mehr als ein Produkt – sie ist ein Versprechen. Ein Versprechen, dass Ihr Garten zum Ort der Entspannung wird, an dem Erinnerungen entstehen.
            </p>
          </div>
        </div>

        {/* ── Story: Image + Text ── */}
        <div
          ref={storyRef.ref}
          className={`pb-24 md:pb-32 px-6 md:px-16 max-w-[1440px] mx-auto transition-all duration-1000 ${
            storyRef.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* images */}
            <div className="relative">
              <img
                src={photo10}
                alt="Pergola Haus"
                className="w-full rounded-3xl object-cover aspect-[3/4]"
              />
              <div className="absolute -bottom-6 -right-3 md:-right-8 w-[42%] rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                <img src={photo12} alt="Pergola Detail" className="w-full aspect-square object-cover" />
              </div>
            </div>

            {/* text */}
            <div className="pt-12 lg:pt-0 pb-10 lg:pb-0">
              <p className="text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.3em] mb-6">
                Unsere Geschichte
              </p>
              <h2 className="font-lemonmilk text-3xl md:text-5xl text-[#344148] leading-tight mb-8">
                Vom Traum<br />zur Wirklichkeit
              </h2>
              <div className="space-y-5 text-neutral-500 leading-[1.85] text-sm md:text-base">
                <p>
                  Mit persönlicher Beratung, skandinavischem Design und blitzschneller Lieferung lassen wir jedes Jahr tausende Gartenträume wahr werden – in 14 Ländern europaweit.
                </p>
                <p>
                  Unsere Pergolen sind robust genug für Sturm und Regen, elegant genug für Ihre schönsten Momente – und pflegeleicht genug, damit Sie sich einfach entspannen können.
                </p>
                <p>
                  Mit hochwertigen Materialien, modernem Design und gewissenhafter Verarbeitung schaffen wir Lösungen, die Jahrzehnte halten.
                </p>
              </div>
              <div className="mt-10 pt-8 border-t border-neutral-100 grid grid-cols-3 gap-4">
                {[
                  { v: "10+", l: "Jahre" },
                  { v: "10 J.", l: "Garantie" },
                  { v: "4,79★", l: "Bewertung" },
                ].map((item) => (
                  <div key={item.l} className="text-center">
                    <p className="font-lemonmilk text-xl text-[#344148]">{item.v}</p>
                    <p className="text-xs text-neutral-400 mt-1">{item.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Cinematic video strip ── */}
        <section className="relative overflow-hidden h-[45vh] md:h-[55vh]">
          <video
            src={video1}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
            <div>
              <p className="text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.3em] mb-5">
                Seit über 10 Jahren
              </p>
              <h2 className="font-lemonmilk text-3xl md:text-5xl lg:text-6xl text-white leading-tight">
                Qualität, die man sieht.<br />
                <span className="text-white/55">Langlebigkeit, die man spürt.</span>
              </h2>
            </div>
          </div>
        </section>

        {/* ── Pillars ── */}
        <div
          ref={pillarsRef.ref}
          className={`bg-[#344148] py-24 md:py-32 transition-all duration-1000 ${
            pillarsRef.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-16">
            <div className="mb-16">
              <p className="text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.3em] mb-5">
                Was uns antreibt
              </p>
              <h2 className="font-lemonmilk text-3xl md:text-5xl text-white leading-tight max-w-xl">
                Drei Prinzipien.<br />Ein Anspruch.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
              {pillars.map((p) => (
                <div
                  key={p.number}
                  className="bg-[#344148] p-10 md:p-12 group hover:bg-white/5 transition-colors duration-300"
                >
                  <p className="font-lemonmilk text-5xl text-white/10 mb-8 group-hover:text-[#82B2CA]/30 transition-colors duration-300">
                    {p.number}
                  </p>
                  <h3 className="text-white text-lg font-semibold mb-4">{p.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Photo mosaic ── */}
        <div
          ref={mosaicRef.ref}
          className={`py-24 md:py-32 px-6 md:px-16 max-w-[1440px] mx-auto transition-all duration-1000 ${
            mosaicRef.visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="mb-12">
            <p className="text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.3em] mb-4">Unsere Welt</p>
            <h2 className="font-lemonmilk text-3xl md:text-5xl text-[#344148] leading-tight">
              Schönheit in jedem Detail
            </h2>
          </div>
          <div className="grid grid-cols-12 grid-rows-2 gap-3 h-[420px] md:h-[560px]">
            <div className="col-span-7 row-span-2 overflow-hidden rounded-3xl">
              <img
                src={photo14}
                alt="Pergola"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="col-span-5 overflow-hidden rounded-3xl">
              <img
                src={photo11}
                alt="Pergola Detail"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="col-span-5 overflow-hidden rounded-3xl">
              <img
                src={photo13}
                alt="Pergola Design"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div
          ref={ctaRef.ref}
          className={`py-24 md:py-40 px-6 text-center transition-all duration-1000 ${
            ctaRef.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.3em] mb-6">
            Bereit für Ihren Traumgarten?
          </p>
          <h2 className="font-lemonmilk text-4xl md:text-6xl lg:text-7xl text-[#344148] leading-tight max-w-3xl mx-auto">
            Ihr Projekt.<br />Unsere Leidenschaft.
          </h2>
          <p className="mt-8 text-neutral-400 max-w-md mx-auto text-base leading-[1.85]">
            Lassen Sie sich von unseren Experten persönlich beraten. Täglich von 8 bis 22 Uhr – wir freuen uns auf Sie.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/kontakt"
              className="inline-block font-semibold px-10 py-4 rounded-full text-white text-sm tracking-wide transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#344148" }}
            >
              Jetzt beraten lassen
            </a>
            <a
              href="/pergola/elegante-pergola"
              className="inline-block font-semibold px-10 py-4 rounded-full text-sm tracking-wide border-2 transition-all hover:bg-[#344148] hover:text-white"
              style={{ borderColor: "#344148", color: "#344148" }}
            >
              Modelle entdecken
            </a>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};
