import pergolaLogo from "../../../assets/pergolo.logo.png";

export const HeaderLogo = () => {
  return (
    <a
      href="/"
      className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto]"
    >
      <div className="relative bg-cover box-border caret-transparent min-h-[auto] min-w-[auto]">
        <picture className="box-border caret-transparent block h-full max-w-full w-full">
          <img
            src={pergolaLogo}
            alt="Pergola logo"
            className="aspect-[auto_375_/_87] box-border caret-transparent h-full max-h-12 max-w-[136px] object-cover w-full"
          />
        </picture>
      </div>
    </a>
  );
};



