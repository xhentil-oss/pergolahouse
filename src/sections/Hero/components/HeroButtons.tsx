export const HeroButtons = () => {
  return (
    <div className="items-start box-border caret-transparent gap-x-4 flex flex-wrap justify-start max-w-full min-h-[auto] min-w-[auto] gap-y-4 w-full">
      <a
        href="/collections/unsere-pergolen"
        className="font-medium items-center bg-green-700 box-border caret-transparent flex justify-center leading-5 max-h-[50px] min-h-[auto] min-w-[auto] text-center w-full border border-green-800 p-4 rounded-md border-solid md:w-48"
      >
        Jetzt kaufen
      </a>
      <a
        href="/pages/learn-more"
        className="text-neutral-900 font-medium items-center bg-neutral-300 box-border caret-transparent flex justify-center leading-5 max-h-[50px] min-h-[auto] min-w-[auto] text-center w-full border border-neutral-900 p-4 rounded-md border-solid md:w-48"
      >
        Mehr erfahren
      </a>
    </div>
  );
};
