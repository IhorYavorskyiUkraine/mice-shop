'use client';

import { cn } from '@/lib';
import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

interface DualRangeSliderProps
   extends React.ComponentProps<typeof SliderPrimitive.Root> {
   labelPosition?: 'top' | 'bottom';
   label?: (value: number | undefined) => React.ReactNode;
}

const DualRangeSlider = React.forwardRef<
   React.ElementRef<typeof SliderPrimitive.Root>,
   DualRangeSliderProps
>(({ className, label, labelPosition = 'top', ...props }, ref) => {
   const initialValue = Array.isArray(props.value)
      ? props.value
      : [props.min, props.max];

   return (
      <SliderPrimitive.Root
         ref={ref}
         className={cn(
            'relative flex w-full touch-none select-none items-center pt-5 pb-2',
            className,
         )}
         {...props}
      >
         <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden bg-[#e5e5e5]">
            <SliderPrimitive.Range className="absolute h-[6px] bg-black" />
         </SliderPrimitive.Track>
         {initialValue.map((value, index) => (
            <React.Fragment key={index}>
               <SliderPrimitive.Thumb className="border-primary bg-background ring-offset-background focus-visible:ring-ring relative block h-5 w-5 cursor-pointer rounded-full border-2 bg-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                  {label && (
                     <span
                        className={cn(
                           'absolute  flex w-full justify-center',
                           labelPosition === 'top' && '-top-7',
                           labelPosition === 'bottom' && 'top-4',
                        )}
                     >
                        {label(value)}
                     </span>
                  )}
               </SliderPrimitive.Thumb>
            </React.Fragment>
         ))}
      </SliderPrimitive.Root>
   );
});
DualRangeSlider.displayName = 'DualRangeSlider';

export { DualRangeSlider };
