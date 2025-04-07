import { Banner, ProductBlock, ProductTiles } from '@/components/shared';

export default function Home() {
   return (
      <>
         <Banner />
         <ProductTiles title="ТРЕНДИ" />
         <ProductBlock title="НОВИНКИ" />
         <ProductBlock title="РЕKOМЕНДOВАНЕ" />
      </>
   );
}
