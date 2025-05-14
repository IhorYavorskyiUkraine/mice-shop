interface Props {
   text?: string;
   children?: React.ReactNode;
}

export const DivButton: React.FC<Props> = ({ text, children }) => {
   return (
      <div className="inline-flex items-center uppercase text-default text-[var(--font-size-xxxl)] justify-center cursor-pointer gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary border border-primary text-secondary hover:bg-primary/90 h-9 px-4 py-5 has-[>img]:px-3">
         {text ? text : children}
      </div>
   );
};
