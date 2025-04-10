'use client';

import { Button } from '@/components/ui';
import { cn } from '@/lib';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ScrollToTopButton = ({ className }: { className?: string }) => {
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      const toggleVisibility = () => {
         if (window.scrollY > 800) {
            setIsVisible(true);
         } else {
            setIsVisible(false);
         }
      };

      window.addEventListener('scroll', toggleVisibility);

      return () => {
         window.removeEventListener('scroll', toggleVisibility);
      };
   }, []);

   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth',
      });
   };

   return (
      <Button
         onClick={scrollToTop}
         aria-label="Scroll to top"
         className={cn(
            'fixed bottom-6 right-6 z-50 p-3 shadow-lg transition duration-300',
            isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
            className,
         )}
         variant="black"
         size="default"
      >
         <ArrowUp className="w-5 h-5" />
      </Button>
   );
};
