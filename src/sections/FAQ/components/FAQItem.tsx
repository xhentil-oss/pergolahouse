import { useState } from "react";

export type FAQItemProps = {
  question: string;
  content: React.ReactNode;
};

export const FAQItem = (props: FAQItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-zinc-200 py-5 border-b border-solid">
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-zinc-900 font-semibold items-center flex justify-between leading-5 w-full text-left gap-4"
      >
        <span>{props.question}</span>
        <span className={`shrink-0 text-lg font-light transition-transform duration-200 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && (
        <div className="text-neutral-500 font-medium leading-6 mt-4 pr-6">
          {props.content}
        </div>
      )}
    </div>
  );
};
