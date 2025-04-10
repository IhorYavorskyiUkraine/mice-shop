'use client';

import { GET_ALL_PRODUCTS } from '@/components/shared/header/header.graphql';
import { useQuery } from '@apollo/client';
import { useSet } from 'react-use';
import { sidebarData } from './sidebar-data.data';
import { SidebarItem } from './sidebar-item';

export const Sidebar: React.FC = () => {
   const [set, { has, toggle }] = useSet(new Set(['hello']));

   const { data, loading, error } = useQuery(GET_ALL_PRODUCTS);

   return (
      <aside className="p-[10px] sticky top-[88px] z-40 border border-[2px] border-black">
         {sidebarData.map(
            (item, i) =>
               item && (
                  <>
                     <SidebarItem
                        key={item.id}
                        title={item.title}
                        open={has(item.title)}
                        setOpen={() => toggle(item.title)}
                     />
                     {i !== sidebarData.length - 1 && (
                        <div className="w-full h-[2px] bg-black"></div>
                     )}
                  </>
               ),
         )}
      </aside>
   );
};
