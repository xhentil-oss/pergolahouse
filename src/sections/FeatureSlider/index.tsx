
import imagePergola from "@/assets/image-pergola.png";

export const FeatureSlider = () => {
  return (
    <section className="bg-white py-20 md:py-32 border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Left: Image */}
        <div className="flex-1 min-w-[320px] flex justify-center">
          <img
            src={imagePergola}
            alt="Über uns"
            className="rounded-3xl shadow-xl w-full max-w-[420px] object-cover"
          />
        </div>
        {/* Right: Content */}
        <div className="flex-1 min-w-[320px]">
          <p className="text-[#82B2CA] font-bold uppercase tracking-widest mb-3 text-sm">Über uns</p>
          <h2 className="text-zinc-900 text-3xl md:text-5xl font-extrabold leading-tight mb-6">
            Wir schaffen Räume, die inspirieren.
          </h2>
          <p className="text-neutral-600 text-lg md:text-xl mb-8">
            Mit Leidenschaft für Design und langjähriger Erfahrung realisiert unser Team individuelle Projekte, die Ihren Stil und Ihre Bedürfnisse widerspiegeln. Von der Idee bis zur Umsetzung sind wir Ihr zuverlässiger Partner für jeden Außenbereich.
          </p>
          <a
            href="/ueber-uns"
            className="inline-block bg-[#82B2CA] text-white font-semibold px-8 py-3 rounded-full shadow hover:bg-[#6fa0b6] transition-colors"
          >
            Mehr erfahren
          </a>
        </div>
      </div>
    </section>
  );
};
