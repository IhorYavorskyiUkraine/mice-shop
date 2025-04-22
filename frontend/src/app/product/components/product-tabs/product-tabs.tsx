'use client';

import { useState } from 'react';
import { ProductDetails } from './product-details';
import { ProductTabsButton } from './product-tabs-button';
import { ProductReviews } from './reviews/product-reviews';

interface Props {
   id: number;
}

export const ProductTabs: React.FC<Props> = ({ id }) => {
   const [activeTab, setActiveTab] = useState(1);

   return (
      <div className="py-md">
         <div className="grid grid-cols-2 border-b-[1px] border-primary">
            <ProductTabsButton
               activeTab={activeTab === 0}
               setActiveTab={() => setActiveTab(0)}
               text="Деталі товару"
            />
            <ProductTabsButton
               activeTab={activeTab === 1}
               setActiveTab={() => setActiveTab(1)}
               text="Відгуки"
            />
         </div>
         <ProductDetails id={id} active={activeTab === 0} />
         <ProductReviews id={id} active={activeTab === 1} />
      </div>
   );
};
