import { useRef } from "react";
import { FeatureSlide } from "@/sections/FeatureSlider/components/FeatureSlide";

const slides = [
  { imageSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/125.jpg", imageAlt: "Smart pergola app", strongText: "Smarte Pergola der nächsten Generation. ", bodyText: "Ein Durchbruch für das Leben im Freien – angetrieben von modernster Smart Matter®-Technologie. Erlebe nahtlose Automatisierung." },
  { imageSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/133.png", imageAlt: "Extreme weather pergola", strongText: "Für extreme Bedingungen entwickelt.", bodyText: " Entwickelt in Norwegen – gebaut, um allem standzuhalten. Von Orkanwinden bis zu starkem Schneefall." },
  { imageSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/122.png", imageAlt: "Easy assembly app", strongText: "Einfache Montage. ", bodyText: "Über 100.000 erfolgreiche Installationen mithilfe unserer App, YouTube-Anleitung oder der Web-Anleitung." },
  { imageSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/120.png", imageAlt: "Aluminium pergola", strongText: "Stabiler als je zuvor.", bodyText: " Die Pergola der Serie 3 ist dafür konzipiert, extremen Wetterbedingungen standzuhalten." },
  { imageSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/118.png", imageAlt: "Custom pergola", strongText: "Maßgefertigte Pergola.", bodyText: " Ob individuell für dich in Europa angefertigt oder als Standard-Modell." },
  { imageSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/123.png", imageAlt: "SnapFIT system", strongText: "SnapFIT™️ Einfache Installation", bodyText: ". Mit unserem SnapFIT™️ System kannst du Zubehör jederzeit ohne Probleme hinzufügen." },
  { imageSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/124.png", imageAlt: "Norwegian design", strongText: "Norwegisches Design.", bodyText: " Minimalistisch, funktional und hochwertig bis ins Detail." },
  { imageSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/128.png", imageAlt: "Customer service", strongText: "Großartiger Kundenservice", bodyText: ". Genieße die Qualitätsgarantie mit bis zu 10-Jahres-Garantie und einem Kundenservice, der immer für dich da ist." },
];

export const FeatureSlider = () => {
  const scrollRef = useRef<HTMLUListElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 540 : -540, behavior: "smooth" });
  };

  return (
    <div className="bg-neutral-100 overflow-hidden py-16 md:py-[120px]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <h2 className="text-zinc-900 text-[32px] font-semibold leading-10 md:text-5xl md:leading-[58px] max-w-[600px]">
            Alles über deine neue PERGOLUX Serie 3 Pergola.
          </h2>
          <div className="flex items-center gap-3 shrink-0">
            <div className="h-8 w-8 rounded-full overflow-hidden shrink-0">
              <img src="https://c.animaapp.com/mnd7yb7cX3zmke/assets/127.png" alt="" className="h-full w-full object-cover" />
            </div>
            <div className="text-zinc-900 font-medium flex flex-col leading-5">
              <span>Warum auf Serie 3 upgraden?</span>
              <a href="/pages/learn-more" className="text-blue-800 font-semibold text-sm hover:underline">
                Alle Funktionen entdecken →
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto overflow-hidden">
        <ul
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth px-4 md:px-16 pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {slides.map((slide, i) => (
            <FeatureSlide key={i} {...slide} imageClassName="aspect-[auto_375_/_375]" />
          ))}
        </ul>
      </div>

      <div className="hidden md:flex justify-end gap-3 pt-8 pr-16 max-w-[1440px] mx-auto">
        <button onClick={() => scroll("left")} aria-label="Previous" className="bg-zinc-300 hover:bg-zinc-400 p-3 rounded-full transition-colors">
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none"><path d="M8.5 1L1.5 8.5L8.5 16" stroke="#666" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button onClick={() => scroll("right")} aria-label="Next" className="bg-zinc-300 hover:bg-zinc-400 p-3 rounded-full transition-colors">
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none"><path d="M1.5 1L8.5 8.5L1.5 16" stroke="#666" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
};
