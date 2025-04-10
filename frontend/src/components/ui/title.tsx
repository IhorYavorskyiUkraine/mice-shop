import { cn } from '@/lib';
import React from 'react';

type TitleSize = 'lg' | 'xl';

interface Props {
   size?: TitleSize;
   className?: string;
   text: string;
}

export const Title: React.FC<Props> = ({ text, size = 'lg', className }) => {
   const mapTagBySize = {
      lg: 'h2',
      xl: 'h1',
   } as const;

   const mapClassNameBySize = {
      lg: 'text-[32px] md:text-[38px] leading-none',
      xl: 'text-[40px] md:text-[48px] leading-none',
   } as const;

   return React.createElement(
      mapTagBySize[size],
      { className: cn(mapClassNameBySize[size], className) },
      text,
   );
};
