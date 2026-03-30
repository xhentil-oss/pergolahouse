export const HeaderActions = () => {
  return (
    <div className="items-center box-border caret-transparent gap-x-2 flex min-h-[auto] min-w-[auto] gap-y-2">
      <a
        href="/collections/unsere-pergolen"
        className="text-white font-medium items-center bg-zinc-900 box-border caret-transparent gap-x-2 hidden leading-5 max-h-10 min-h-0 min-w-0 gap-y-2 w-max border border-zinc-900 px-4 py-3 rounded-md border-solid md:flex md:min-h-[auto] md:min-w-[auto]"
      >
        <span className="box-border caret-transparent inline min-h-0 min-w-0 md:block md:min-h-[auto] md:min-w-[auto]">
          Modelle entdecken
        </span>
      </a>
      <div className="relative box-border caret-transparent h-6 min-h-[auto] min-w-[auto] w-6">
        <div
          aria-label="Cart"
          role="button"
          className="box-border caret-transparent"
        >
          <img
            src="https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-5.svg"
            alt="Icon"
            className="box-border caret-transparent h-6 w-6"
          />
          <span className="absolute text-white text-[8px] items-center aspect-square bg-amber-500 box-border caret-transparent flex justify-center leading-3 min-h-4 min-w-4 text-center p-[3.008px] rounded-[159984px] -right-1.5 -top-1.5 after:accent-auto after:box-border after:caret-transparent after:text-white after:block after:text-[8px] after:not-italic after:normal-nums after:font-normal after:tracking-[normal] after:leading-3 after:list-outside after:list-disc after:min-h-[auto] after:min-w-[auto] after:pointer-events-auto after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:border-separate after:font-ui_sans_serif"></span>
        </div>
      </div>
    </div>
  );
};
