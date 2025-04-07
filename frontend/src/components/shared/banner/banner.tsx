'use client';

import { Bullets } from '@/components/ui';
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { slides } from './banner.data';

interface Props {
   className?: string;
}

export const Banner: React.FC<Props> = ({ className }) => {
   const [api, setApi] = useState<CarouselApi | null>(null);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [slideCount, setSlideCount] = useState(0);

   useEffect(() => {
      if (!api) return;

      setSlideCount(api.scrollSnapList().length);
      setCurrentIndex(api.selectedScrollSnap());

      const onSelect = () => {
         setCurrentIndex(api.selectedScrollSnap());
      };

      api.on('select', onSelect);

      return () => {
         api.off('select', onSelect);
      };
   }, [api]);

   return (
      <Carousel
         setApi={setApi}
         opts={{
            dragFree: true,
            align: 'start',
            slidesToScroll: 1,
            containScroll: 'trimSnaps',
            skipSnaps: true,
            loop: true,
         }}
         plugins={[
            Autoplay({
               delay: 5000,
               stopOnInteraction: true,
            }),
            Fade(),
         ]}
         className={cn(className, 'relative')}
      >
         <CarouselContent>
            {slides.map(slide => (
               <CarouselItem key={slide.id} className="pl-0 basis-full">
                  <div className="h-[calc(100vh-76px)] md:h-[calc(100vh-88px)]">
                     <Link href={slide.href}>
                        {/* ПК */}
                        <Image
                           src={slide.imagePc}
                           alt={slide.alt}
                           fill
                           priority
                           quality={85}
                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                           className="hidden md:block object-cover"
                        />

                        {/* Мобилка */}
                        <Image
                           src={slide.imageMb}
                           alt={slide.alt}
                           fill
                           priority
                           quality={85}
                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                           className="md:hidden object-cover"
                        />
                     </Link>
                  </div>
               </CarouselItem>
            ))}
         </CarouselContent>
         <Bullets
            slideCount={slideCount}
            currentIndex={currentIndex}
            api={api?.scrollTo}
         />
      </Carousel>
   );
};
