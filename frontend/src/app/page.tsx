import {
   Banner,
   CategoriesTilesContent,
   ProductBlock,
   ProductTiles,
   ProductTilesContent,
} from '@/components/shared';

export default function Home() {
   return (
      <>
         <Banner />
         <ProductTiles title="Тренди">
            <ProductTilesContent />
         </ProductTiles>
         <ProductBlock title="Новинки" />
         <ProductBlock title="Рекомендоване" />
         <ProductTiles title="Категорії" className="!pt-0">
            <CategoriesTilesContent />
         </ProductTiles>
      </>
   );
}
