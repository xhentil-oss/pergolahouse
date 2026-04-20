import { FAQItem } from "@/sections/FAQ/components/FAQItem";

export const FAQ = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#82B2CA]/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-[#82B2CA]/15 blur-[100px]" />

      <div className="relative max-w-[1440px] mx-auto px-4 py-12 md:px-16 md:py-[100px]">
        {/* header */}
        <div className="text-center mb-8 md:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#82B2CA]/10 border border-[#82B2CA]/30 px-4 py-1.5 mb-4 md:mb-5">
            <svg className="h-4 w-4 text-[#82B2CA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            <span className="text-sm font-semibold text-[#82B2CA]">Häufig gestellte Fragen</span>
          </div>
          <h2 className="text-zinc-900 text-2xl font-bold leading-tight md:text-5xl md:leading-[58px]">
            Hast du noch Fragen?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-zinc-500 text-sm md:text-lg">
            Hier findest du Antworten auf die häufigsten Fragen rund um unsere Pergolen.
          </p>
        </div>

        {/* FAQ grid – 2 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
          <div className="flex flex-col gap-4">
            <FAQItem
              number={1}
              question="Kann ich meine Pergola selbst aufbauen?"
              content={
                <p>
                  Ja, absolut! Unsere Pergolen werden mit einer <strong>detaillierten Schritt-für-Schritt-Anleitung</strong> geliefert. 
                  Zusätzlich steht dir unsere <strong>Montage-App</strong> zur Verfügung, die dich in Echtzeit durch den gesamten Aufbau führt. 
                  Die meisten Kunden schaffen die Montage zu zweit an einem Wochenende.
                </p>
              }
            />
            <FAQItem
              number={2}
              question="Aus welchem Material bestehen eure Pergolen?"
              content={
                <p>
                  Alle unsere Pergolen werden aus <strong>hochwertigem Aluminium 6063-T5</strong> gefertigt – eines der stabilsten 
                  und langlebigsten Materialien im Außenbereich. Es ist <strong>rostfrei, UV-beständig und zu 100 % recycelbar</strong>. 
                  Die pulverbeschichtete Oberfläche sorgt für langanhaltenden Farbglanz ohne Nachstreichen.
                </p>
              }
            />
            <FAQItem
              number={3}
              question="Welches Zubehör kann ich nachträglich ergänzen?"
              content={
                <p>
                  Dank unseres <strong>SnapFIT™-Systems</strong> kannst du jederzeit Zubehör nachrüsten – ganz ohne Bohren oder Umbau. 
                  Verfügbar sind unter anderem <strong>Screen Rollos, Glaswände, LED-Beleuchtung</strong> und <strong>Wärmelampen</strong>. 
                  Alle Erweiterungen sind perfekt auf unsere Pergolen abgestimmt und in wenigen Minuten montiert.
                </p>
              }
            />
          </div>
          <div className="flex flex-col gap-4">
            <FAQItem
              number={4}
              question="Wie wetterfest sind eure Pergolen?"
              content={
                <p>
                  Unsere Pergolen sind <strong>in Norwegen entwickelt</strong> und für extreme Wetterbedingungen ausgelegt. 
                  Sie halten <strong>Windgeschwindigkeiten bis 100 km/h</strong> und einer <strong>Schneelast von bis zu 150 kg/m²</strong> stand. 
                  Das integrierte Wasserablaufsystem leitet Regenwasser zuverlässig ab – so bleibst du immer trocken.
                </p>
              }
            />
            <FAQItem
              number={5}
              question="Kann ich die Pergola per App steuern?"
              content={
                <p>
                  Ja! Unsere smarten Pergolen lassen sich bequem per <strong>Smartphone-App (iOS & Android)</strong> steuern. 
                  Du kannst das <strong>Lamellendach öffnen und schließen</strong>, die <strong>LED-Beleuchtung dimmen</strong> und 
                  sogar <strong>Zeitpläne und Automatisierungen</strong> einrichten. Optional ist auch eine Steuerung per Sprachassistent möglich.
                </p>
              }
            />
            <FAQItem
              number={6}
              question="Welche Zahlungsmethoden akzeptiert ihr?"
              content={
                <p>
                  Wir bieten dir flexible Zahlungsmöglichkeiten: <strong>Kreditkarte, PayPal, Sofortüberweisung, Klarna-Ratenkauf</strong> und 
                  bequemen <strong>Kauf auf Rechnung</strong>. Beim Ratenkauf kannst du deine Pergola in bis zu <strong>36 Monatsraten</strong> bezahlen – 
                  ganz ohne versteckte Gebühren.
                </p>
              }
            />
          </div>
        </div>

      </div>
    </section>
  );
};
