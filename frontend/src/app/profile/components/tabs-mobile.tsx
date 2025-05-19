'use client';

import { useSet } from 'react-use';
import { ProfileTabButton } from './profile-tab-button';
import { profileTabs } from './profile-tabs.data';
import Liked from './tabs-content/liked/liked';
import Orders from './tabs-content/orders/orders';
import UserInfo from './tabs-content/user-info/user-info';

export const ProfileMobileTabs: React.FC = () => {
   const [_, { has, toggle }] = useSet(new Set([1]));
   return (
      <div className="flex flex-col gap-[30px] pb-md lg:hidden pt-md lg:pr-md">
         {profileTabs.map(tab => (
            <div key={tab.id}>
               <ProfileTabButton
                  {...tab}
                  setActiveTab={() => toggle(tab.id)}
                  active={has(tab.id)}
                  arrow
               />
               {has(tab.id) && (
                  <div>
                     {tab.id === 1 && <UserInfo />}
                     {tab.id === 2 && <Orders />}
                     {tab.id === 3 && <Liked />}
                  </div>
               )}
            </div>
         ))}
      </div>
   );
};
