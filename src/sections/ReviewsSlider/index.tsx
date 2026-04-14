import { Link } from "react-router-dom";

const items = [
  {
    number: '01.',
    title: 'Elegante Pergola',
    description: 'Exklusive Aluminium-Pergola mit drehbaren Lamellen, integriertem Wasserablauf und modernem Design. Bietet optimalen Schutz und Komfort für anspruchsvolle Außenbereiche – optional mit LED, Sensoren und Glas- oder Zip-Systemen.',
    link: '/pergola/elegante-pergola',
  },
  {
    number: '02.',
    title: 'Luxus-Pergola',
    description: 'Luxus-Pergola aus Aluminium mit komplett einfahrbaren und drehbaren Lamellen für maximalen Komfort und Raumgefühl. Dach lässt sich vollständig öffnen, bietet flexiblen Schutz und individuelle Lichtsteuerung. Optional mit LED, Sensoren und Glas- oder Zip-Systemen.',
    link: '/pergola/luxus-pergola',
  },
  {
    number: '03.',
    title: 'Preiswerte Pergola',
    description: 'Preiswerte Aluminium-Pergola im Kit-System: moderne Optik, zuverlässiger Schutz und einfache Montage zum attraktiven Preis. Ideal für stilvolle Außenbereiche mit effizienter Planung.',
    link: '/pergola/preiswerte-pergola',
  },
  {
    number: '04.',
    title: 'Wintergärten',
    description: 'Wintergarten aus Aluminium und Glas mit festem Glasdach: lichtdurchflutete Räume, moderner Look und zuverlässiger Wetterschutz. Optional mit Schiebe-, Guillotine- oder Zip-Systemen und Automatisierung.',
    link: '/wintergarten',
  },
  {
    number: '05.',
    title: 'Carports',
    description: 'Carport aus Aluminium mit isolierten Sandwichpaneelen: langlebig, pflegeleicht und wetterfest. Schützt Fahrzeuge zuverlässig und bietet optional LED, Sensoren und smarte Steuerung.',
    link: '/carports',
  },
  {
    number: '06.',
    title: 'Zip-Screens',
    description: 'Zip-Screen-System für effektiven Sonnen-, Sicht- und Windschutz: robust, modern und vielseitig für Pergolen, Fassaden und Glasdächer. Optional mit Motor, Fernbedienung und vielen Stoffvarianten.',
    link: '/zip-screens',
  },
];

export const ReviewsSlider = () => {
  return (
    <section className="bg-[#232323] py-20 md:py-[120px]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <h2 className="text-white text-3xl md:text-5xl font-extrabold leading-tight mb-6 md:mb-0">
            Wir bieten Experten<br className="hidden md:block" /> für Ihr Projekt
          </h2>
        </div>
        <div className="divide-y divide-[#444]">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center py-8 md:py-10 gap-6 md:gap-0 relative">
              <div className="flex items-center w-full md:w-1/4">
                <span className="text-4xl md:text-5xl font-extrabold text-white mr-6 md:mr-10 min-w-[70px]">{item.number}</span>
                <span className="text-lg md:text-xl font-bold text-white uppercase tracking-wide">{item.title}</span>
              </div>
              <div className="flex-1 text-neutral-300 text-base md:text-lg font-medium md:pl-8 w-full md:w-auto">
                {item.description}
              </div>
              <div className="flex-shrink-0 mt-6 md:mt-0 md:ml-10">
                <Link
                  to={item.link}
                  className="flex items-center justify-center w-14 h-14 rounded-full bg-[#82B2CA] hover:bg-[#6ea0b7] transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
