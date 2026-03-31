import { BenefitCard } from "@/sections/BenefitsGrid/components/BenefitCard";

export const BenefitsGrid = () => {
  return (
    <section className="bg-neutral-100">
      <div className="max-w-[1440px] mx-auto px-4 py-16 md:px-16 md:py-[120px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <h2 className="text-zinc-900 text-[32px] font-semibold leading-10 md:text-5xl md:leading-[58px] max-w-[500px]">
            Die beste Wahl für deine Pergola
          </h2>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full overflow-hidden shrink-0">
              <img src="https://c.animaapp.com/mnd7yb7cX3zmke/assets/95.png" alt="" className="h-full w-full object-cover" />
            </div>
            <div className="text-zinc-900 font-medium flex flex-col leading-5">
              <span>Pergolux Showroom</span>
              <a href="/pages/showroom-3-0" className="text-blue-800 font-semibold text-sm hover:underline">
                Finde einen in deiner Nähe →
              </a>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BenefitCard
            imageSrc="https://c.animaapp.com/mnd7yb7cX3zmke/assets/86.png"
            imageAlt="Grünes Hammer-Symbol"
            title="Einfache Montage"
            description="Benötigst du Hilfe bei der Installation? Kontaktiere uns und wir unterstützen dich Schritt für Schritt!"
            linkHref="/pages/installationsubersicht"
            linkText="Mehr erfahren"
          />
          <BenefitCard
            imageSrc="https://c.animaapp.com/mnd7yb7cX3zmke/assets/132.png"
            imageAlt="Grünes Verpackung-Symbol"
            title="Schnelle Lieferung"
            description="Unsere Lieferung ist ab 1000 € kostenlos und bietet verschiedene Optionen, damit deine Pergola schnell und bequem bei dir ankommt."
          />
          <BenefitCard
            imageSrc="https://c.animaapp.com/mnd7yb7cX3zmke/assets/112.png"
            imageAlt="Grünes Telefon-Symbol"
            title="Expertenberatung"
            description="Kontaktiere uns jederzeit, wenn du etwas benötigst. Wir beantworten gerne deine Fragen."
          />
          <BenefitCard
            imageSrc="https://c.animaapp.com/mnd7yb7cX3zmke/assets/88.png"
            imageAlt="Grünes Konfetti-Symbol"
            title="+100.000 zufriedene Kunden"
            description="Über 100.000 zufriedene Kunden sprechen für die hohe Qualität und unseren Anspruch."
          />
          <BenefitCard
            imageSrc="https://c.animaapp.com/mnd7yb7cX3zmke/assets/106.png"
            imageAlt="Grünes Trophäen-Symbol"
            title="Hochwertige Pergolen mit Auszeichnung"
            description="Unsere Pergolen wurden mehrfach ausgezeichnet und stehen für Qualität und Langlebigkeit."
          />
          <BenefitCard
            imageSrc="https://c.animaapp.com/mnd7yb7cX3zmke/assets/102.png"
            imageAlt="Grünes Schneeflocken-Symbol"
            title="Für alle Wetterbedingungen entwickelt"
            description="Genieße mit unserer Pergola deinen Außenbereich das ganze Jahr über – bei Regen, Schnee oder Sonne."
          />
        </div>
      </div>
    </section>
  );
};
