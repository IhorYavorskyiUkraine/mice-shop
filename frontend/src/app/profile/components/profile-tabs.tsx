import { ProfileTabButton } from './profile-tab-button';
import { profileTabs } from './profile-tabs.data';

export const ProfileTabs: React.FC = () => {
   return (
      <div className="lg:flex flex-col gap-[30px] pb-md hidden pt-md pr-md">
         {profileTabs.map(tab => (
            <ProfileTabButton key={tab.id} {...tab} />
         ))}
      </div>
   );
};
