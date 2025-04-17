import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
   "inline-flex items-center text-default text-[var(--font-size-xxxl)] justify-center cursor-pointer gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
   {
      variants: {
         variant: {
            black: 'bg-primary  border border-primary text-secondary hover:bg-primary/90',
            white: 'bg-secondary border border-primary text-primary hover:bg-primary/10',
         },
         size: {
            default: 'h-9 px-4 py-5 has-[>img]:px-3',
         },
      },
      defaultVariants: {
         variant: 'black',
         size: 'default',
      },
   },
);

function Button({
   className,
   variant,
   size,
   asChild = false,
   ...props
}: React.ComponentProps<'button'> &
   VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
   }) {
   const Comp = asChild ? Slot : 'button';

   return (
      <Comp
         data-slot="button"
         className={cn(buttonVariants({ variant, size, className }))}
         {...props}
      />
   );
}

export { Button, buttonVariants };
