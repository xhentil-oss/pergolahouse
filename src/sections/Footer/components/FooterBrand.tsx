import logo from "@/assets/pergola-transparent.png";

export const FooterBrand = () => {
  return (
    <div className="flex flex-col gap-6 items-start">
      <a href="/" className="self-start">
        <img
          src={logo}
          alt="Pergolux Logo"
          className="h-20 w-auto object-contain"
        />
      </a>

      <p
        className="text-neutral-500 text-xs italic max-w-[220px]"
        style={{ fontFamily: "LEMONMILK, sans-serif", letterSpacing: "0.08em" }}
      >
        Qualität, die bleibt. Eleganz, die begeistert.
      </p>
      <a href="tel:+4966141087500" className="text-white text-sm font-semibold hover:text-neutral-300 transition-colors mt-2">
        +49 661 4108750
      </a>
    </div>
  );
};
