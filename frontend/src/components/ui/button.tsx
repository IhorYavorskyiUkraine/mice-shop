import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Spinner } from './spinner';

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

export interface ButtonProps
   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariants> {
   asChild?: boolean;
   loading?: boolean;
   icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
   (
      {
         className,
         variant,
         children,
         size,
         icon,
         loading = false,
         asChild = false,
         ...props
      },
      ref,
   ) => {
      const Comp = asChild ? Slot : 'button';
      return (
         <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            disabled={loading}
            {...props}
         >
            {loading ? <Spinner /> : children}
         </Comp>
      );
   },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
