import { FAQItem } from "@/sections/FAQ/components/FAQItem";

export const FAQ = () => {
  return (
    <section className="bg-white">
      <div className="max-w-[1440px] mx-auto px-4 py-16 md:px-16 md:py-[120px]">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-20">
          <div className="shrink-0 md:w-[340px]">
            <h2 className="text-zinc-900 text-[32px] font-semibold leading-10 md:text-5xl md:leading-[58px]">
              Fragen und Antworten
            </h2>
            <a
              href="/pages/fragen-und-antworten"
              className="inline-block mt-6 text-sm font-semibold text-blue-800 hover:underline"
            >
              Alle FAQ ansehen →
            </a>
          </div>
          <div className="flex-1 flex flex-col">
            <FAQItem
              question="Was ist eine Pergola?"
              content={
                <p>
                  Eine Pergola ist eine{" "}
                  <strong>stilvolle Überdachung für den Außenbereich</strong>, die Schutz und Komfort mit modernem Design verbindet. Sie wertet{" "}
                  <strong>Terrasse, Balkon oder Garten</strong> auf und schafft einen geschützten Rückzugsort bei Sonne und Regen. Unsere Pergolen bestehen aus{" "}
                  <strong>langlebigem Aluminium</strong>, sind pflegeleicht und lassen sich mit Zubehör wie Glaswänden, Screen-Rollos, Wärmelampen oder Beleuchtung individuell erweitern.
                </p>
              }
            />
            <FAQItem
              question="Wie lange dauert die Lieferung?"
              content={
                <p>
                  Wenn deine gewünschte Pergola auf Lager ist, beträgt die Lieferzeit in der Regel{" "}
                  <strong>2–6 Werktage</strong>. Die aktuellen Lieferzeiten findest du jederzeit direkt auf der jeweiligen Produktseite unterhalb des Preises.
                </p>
              }
            />
            <FAQItem
              question="Wie viel kostet die Lieferung?"
              content={
                <p>
                  <strong>Ab einem Bestellwert von 1.000 €</strong> ist die Lieferung für dich <strong>kostenlos</strong>.
                </p>
              }
            />
            <FAQItem
              question="Wie wird meine Pergola geliefert?"
              content={
                <p>
                  Deine Pergola wird zuverlässig von einem unserer erfahrenen Logistik-Partner zu dir nach Hause gebracht. Vor der Lieferung wirst du kontaktiert, um gemeinsam einen passenden Termin zu vereinbaren. Zusätzlich erhältst du kurz vor Ankunft (ca. 1–2 Stunden vorher) eine weitere Benachrichtigung.
                  <br /><br />
                  Die Pergola kommt sicher verpackt in mehreren handlichen Paketen auf einer Palette an. Jedes Paket wiegt etwa 30–50 kg.
                </p>
              }
            />
            <FAQItem
              question="Gibt es einen Montageservice?"
              content={
                <>
                  <p>
                    Unsere Pergolen sind so konzipiert, dass du sie mit etwas handwerklichem Geschick selbst aufbauen kannst. Dabei unterstützt dich unsere Montage-App mit einer Schritt-für-Schritt-Anleitung direkt auf deinem Smartphone.
                  </p>
                  <p className="mt-3">
                    Falls du den Aufbau lieber in professionelle Hände geben möchtest, bieten wir gemeinsam mit <strong>PLX Montage GmbH</strong> einen zuverlässigen Montageservice an.{" "}
                    <a href="https://www.plx-montage.de/reserve-installation" className="text-blue-800 hover:underline">Angebot anfragen →</a>
                  </p>
                </>
              }
            />
            <FAQItem
              question="Welche Garantie habe ich auf meine Pergola?"
              content={
                <>
                  <p>
                    Für die Pergola <strong>Serie S3</strong> erhältst du eine <strong>10-jährige Garantie</strong> – damit bist du langfristig auf der sicheren Seite.
                  </p>
                  <a href="/pages/10-jahre-garantie" className="inline-block mt-2 text-blue-800 font-medium hover:underline">Mehr lesen →</a>
                </>
              }
            />
            <FAQItem
              question="Brauche ich eine Baugenehmigung für meine Pergola?"
              content={
                <p>
                  Das hängt von deinem Bundesland und den Maßen deines Projekts ab. Nutze unseren{" "}
                  <strong>interaktiven Genehmigungs-Check</strong>, um sofort Klarheit zu bekommen.{" "}
                  <a href="/pages/building-permit" className="text-blue-800 hover:underline">Zum Genehmigungs-Check →</a>
                </p>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};
