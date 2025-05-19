'use client';

import { ErrorMessage, UniversalSkeleton } from '@/components/ui';
import { useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';
import { GET_USER } from '../profile.graphql';
import { ProfileTabs } from './profile-tabs';
import { ProfileMobileTabs } from './tabs-mobile';

interface Props {
   tab: string;
}

const UserInfo = dynamic(() => import('./tabs-content/user-info/user-info'), {
   loading: () => <p>Загрузка...</p>,
   ssr: false,
});

const Orders = dynamic(() => import('./tabs-content/orders/orders'), {
   loading: () => (
      <div className="px-[10px] py-[10px] lg:px-[30px] lg:py-[30px]">
         <div className="flex flex-col gap-[30px]">
            <UniversalSkeleton orderItems />
         </div>
      </div>
   ),
   ssr: false,
});

const Liked = dynamic(() => import('./tabs-content/liked/liked'), {
   loading: () => (
      <div className="px-[10px] py-[10px] lg:px-md lg:py-md">
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            <UniversalSkeleton likedItems />
         </div>
      </div>
   ),
   ssr: false,
});

export const Main: React.FC<Props> = ({ tab }) => {
   const { data: user, loading, error } = useQuery(GET_USER);

   if (error) return <ErrorMessage message={error.message} />;

   return (
      <div className="grid lg:grid-cols-[auto_1fr] pb-sm">
         <aside>
            <div className="border-b-[1px] hidden lg:block border-primary py-[10px] pt-md pb-md pr-[30px] ">
               {loading ? (
                  <p>Loading...</p>
               ) : (
                  <p>{user?.findUserById?.displayName}</p>
               )}
               {loading ? (
                  <p>Loading...</p>
               ) : (
                  <p className="text-m1">{user?.findUserById?.email}</p>
               )}
            </div>
            <ProfileTabs />
         </aside>
         <div className="border-l-[1px] border-primary lg:block hidden">
            {tab === 'info' && <UserInfo />}
            {tab === 'orders' && <Orders />}
            {tab === 'liked' && <Liked />}
         </div>
         <ProfileMobileTabs />
      </div>
   );
};
