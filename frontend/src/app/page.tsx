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
         <ProductBlock title="Новинки" tag="new" />
         <ProductBlock title="Рекомендоване" tag="views" />
         <ProductTiles title="Категорії" className="!pt-0">
            <CategoriesTilesContent />
         </ProductTiles>
      </>
   );
}
