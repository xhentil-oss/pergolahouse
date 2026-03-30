export type FooterLink = {
  href: string;
  label: string;
};

export type FooterLinksProps = {
  title?: string;
  links: FooterLink[];
};

export const FooterLinks = (props: FooterLinksProps) => {
  return (
    <div className="flex flex-col gap-4">
      {props.title && (
        <h4 className="text-white font-semibold text-sm uppercase tracking-wider">{props.title}</h4>
      )}
      {props.links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className="text-neutral-400 text-sm hover:text-white transition-colors leading-[18px]"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};
