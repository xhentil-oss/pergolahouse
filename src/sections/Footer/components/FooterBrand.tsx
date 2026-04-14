import logo from "@/assets/pergola-transparent.png";

export const FooterBrand = () => {
  return (
    <div className="flex flex-col gap-6">
      <a href="/">
        <img
          src={logo}
          alt="Pergolux Logo"
          className="h-20 object-contain"
        />
      </a>
      <p className="text-neutral-400 text-sm leading-6 max-w-[220px]">
        Hochwertige Pergolen und Überdachungen – direkt vom Hersteller.
      </p>
      <div className="flex items-center gap-3 mt-2">
        <div className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-xl">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
          <div>
            <div className="text-neutral-500 text-[10px]">Wir sind</div>
            <div className="text-green-400 text-xs font-semibold">erreichbar</div>
          </div>
        </div>
        <a href="tel:+4966141087500" className="text-white text-sm font-semibold hover:text-neutral-300 transition-colors">
          +49 661 4108750
        </a>
      </div>
    </div>
  );
};
