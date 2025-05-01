'use client';

import { ErrorMessage } from '@/components/ui';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_USER } from '../profile.graphql';
import { ProfileTabs } from './profile-tabs';
import { Liked } from './tabs-content/liked/liked';
import { UserInfo } from './tabs-content/user-info/user-info';
import { ProfileMobileTabs } from './tabs-mobile';

export const Main: React.FC = () => {
   const [activeTab, setActiveTab] = useState(1);
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
            <ProfileTabs setActive={setActiveTab} active={activeTab} />
         </aside>
         <div className="border-l-[1px] border-primary lg:block hidden">
            {activeTab === 1 && <UserInfo />}
            {activeTab === 2 && <div>2</div>}
            {activeTab === 3 && <Liked />}
         </div>
         <ProfileMobileTabs />
      </div>
   );
};
