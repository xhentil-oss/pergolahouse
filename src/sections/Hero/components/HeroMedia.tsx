import photo1 from "../../../assets/Photo (1).png";

export const HeroMedia = () => {
  return (
    <div className="relative box-border caret-transparent h-full min-w-[auto] w-full md:w-6/12">
      <div className="relative aspect-[400_/_384] bg-cover box-border caret-transparent inline-block h-full w-full bg-center md:aspect-[1440_/_1024]">
        <picture className="box-border caret-transparent block h-full max-w-full w-full">
          <img
            src={photo1}
            alt="Hero media"
            className="aspect-[auto_375_/_250] box-border caret-transparent h-full max-w-full object-cover w-full"
          />
        </picture>
      </div>
      <div className="absolute bg-[linear-gradient(rgba(0,0,0,0),rgb(0,0,0)_90%)] box-border caret-transparent flex h-3/6 w-full left-0 bottom-0 md:hidden"></div>
    </div>
  );
};
