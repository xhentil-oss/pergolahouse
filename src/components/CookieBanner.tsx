export type CookieBannerProps = {
  onAccept: () => void;
};

export const CookieBanner = ({ onAccept }: CookieBannerProps) => {
  return (
    <div
      role="alertdialog"
      aria-label="We respect your privacy"
      className="fixed inset-0 flex items-end justify-center z-[9999] pointer-events-none pb-4 px-4 md:items-center md:pb-0 md:px-0"
    >
      <div className="text-black text-[13px] bg-white shadow-[rgba(0,0,0,0.2)_0px_0px_18px_0px] flex flex-col flex-wrap justify-between leading-[19.5px] max-w-full w-full z-[9999] overflow-hidden p-[15.6px] rounded-[5px] pointer-events-auto md:max-w-[624px]">
        <span className="flex flex-col min-h-[auto] text-center my-[13px] md:mt-0">
          <span className="block">
            This website uses cookies to ensure you get the best experience.
          </span>
          <span className="items-center gap-x-2.5 flex justify-center gap-y-2.5 mt-1">
            <a href="/policies/privacy-policy" className="opacity-80 underline p-[2.6px]">
              Privacy Policy
            </a>
            <span role="presentation" className="text-[14.4px]">●</span>
            <a href="https://business.safety.google/privacy/" className="opacity-80 underline p-[2.6px]">
              Google&#39;s Privacy Terms
            </a>
          </span>
        </span>
        <div className="items-center flex flex-col grow shrink-0 gap-2 md:flex-row">
          <button
            type="button"
            onClick={onAccept}
            className="text-[11.7px] font-bold bg-transparent basis-[0%] grow min-w-[auto] text-center text-wrap w-full mb-[5px] px-[14.625px] py-[8.775px] rounded-[5px] border-2 border-black cursor-pointer md:text-nowrap md:w-auto md:mb-0"
          >
            Preferences
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="text-white text-[11.7px] font-bold bg-black basis-[0%] grow min-w-[auto] text-center text-wrap w-full ml-0 mb-[5px] px-[14.625px] py-[8.775px] rounded-[5px] border-2 border-transparent cursor-pointer md:text-nowrap md:w-auto md:ml-[5.85px] md:mb-0"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
