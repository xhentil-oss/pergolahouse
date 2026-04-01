import { useState } from "react";

export type FAQItemProps = {
  question: string;
  content: React.ReactNode;
  number?: number;
};

export const FAQItem = (props: FAQItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`group rounded-2xl border transition-all duration-300 cursor-pointer ${
        open
          ? "border-[#82B2CA]/30 bg-[#82B2CA]/5 shadow-lg shadow-[#82B2CA]/10"
          : "border-zinc-100 bg-white hover:border-zinc-200 hover:shadow-md"
      }`}
      onClick={() => setOpen((o) => !o)}
    >
      <button className="w-full text-left px-6 py-5 flex items-center gap-4">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 ${
            open
              ? "bg-[#344148] text-white shadow-md shadow-[#344148]/20"
              : "bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200 group-hover:text-zinc-600"
          }`}
        >
          {String(props.number ?? 0).padStart(2, "0")}
        </span>
        <span className={`flex-1 font-semibold leading-6 transition-colors duration-300 ${open ? "text-[#344148]" : "text-zinc-900"}`}>
          {props.question}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            open
              ? "bg-[#344148] text-white rotate-180"
              : "bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200"
          }`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pl-20 text-zinc-600 leading-7">
          {props.content}
        </div>
      </div>
    </div>
  );
};
