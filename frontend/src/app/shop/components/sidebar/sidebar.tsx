'use client';

import { GET_ALL_PRODUCTS } from '@/components/shared/header/header.graphql';
import { useQuery } from '@apollo/client';
import { useSet } from 'react-use';
import { SidebarItem } from './sidebar-item';

export const Sidebar: React.FC = () => {
   const [set, { has, toggle }] = useSet(new Set(['hello']));

   const { data, loading, error } = useQuery(GET_ALL_PRODUCTS);

   return (
      <aside className="p-[10px] border border-[2px] border-black">
         <SidebarItem
            title="БРЕНД"
            open={has('brand')}
            setOpen={() => toggle('brand')}
         />
      </aside>
   );
};
