'use client';

import { ErrorMessage } from '@/components/ui';
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

const Liked = dynamic(() => import('./tabs-content/liked/liked'), {
   loading: () => <p>Загрузка...</p>,
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
            {tab === '2' && <div>2</div>}
            {tab === 'liked' && <Liked />}
         </div>
         <ProfileMobileTabs />
      </div>
   );
};
