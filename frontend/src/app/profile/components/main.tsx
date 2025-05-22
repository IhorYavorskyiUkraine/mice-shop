'use client';

import { Button, ErrorMessage, UniversalSkeleton } from '@/components/ui';
import { useMutation, useQuery } from '@apollo/client';
import { LogOut } from 'lucide-react';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';
import { GET_USER, LOGOUT } from '../profile.graphql';
import { ProfileTabs } from './profile-tabs';
import { ProfileMobileTabs } from './tabs-mobile';

interface Props {
   tab: string;
}

const UserInfo = dynamic(() => import('./tabs-content/user-info/user-info'), {
   loading: () => (
      <div className="px-[10px] lg:min-h-screen py-[10px] lg:px-[30px] lg:py-[30px]">
         <UniversalSkeleton userInfo />
         <button disabled className="uppercase cursor-pointer text-s">
            Редагувати пароль
         </button>
         <div className="mt-[10px]">
            <Button className="min-w-[120px]">Редагувати профіль</Button>
         </div>
      </div>
   ),
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
      <div className="px-[10px] py-[10px] lg:px-[30px] lg:py-[30PX]">
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            <UniversalSkeleton likedItems />
         </div>
      </div>
   ),
   ssr: false,
});

export const Main: React.FC<Props> = ({ tab }) => {
   const { data: user, loading, error } = useQuery(GET_USER);
   const [logout] = useMutation(LOGOUT, {
      onCompleted: () => {
         window.location.href = '/';
         toast.success('Ви успішно вийшли');
      },
      onError: error => {
         toast.error(error.message);
         window.location.href = '/';
      },
   });

   if (error) return <ErrorMessage message={error.message} />;

   return (
      <div className="grid lg:grid-cols-[auto_1fr] pb-sm">
         <aside>
            <div className="border-b-[1px] hidden lg:flex items-center justify-between border-primary py-[10px] pt-md pb-md pr-[30px] ">
               <div className="flex flex-1 flex-col pr-sm gap-1">
                  {loading ? (
                     <UniversalSkeleton displayName />
                  ) : (
                     <p>{user?.findUserById?.displayName}</p>
                  )}
                  {loading ? (
                     <UniversalSkeleton displayName />
                  ) : (
                     <p className="text-m1">{user?.findUserById?.email}</p>
                  )}
               </div>
               <button onClick={() => logout()} className="cursor-pointer">
                  <LogOut size={20} />
               </button>
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
