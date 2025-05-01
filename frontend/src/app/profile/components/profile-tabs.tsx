import { ProfileTabButton } from './profile-tab-button';
import { profileTabs } from './profile-tabs.data';

interface Props {
   setActive: (tab: number) => void;
   active: number;
}

export const ProfileTabs: React.FC<Props> = ({ setActive, active }) => {
   return (
      <div className="lg:flex flex-col gap-[30px] pb-md hidden pt-md pr-md">
         {profileTabs.map(tab => (
            <ProfileTabButton
               key={tab.id}
               {...tab}
               setActiveTab={() => setActive(tab.id)}
               active={active === tab.id}
            />
         ))}
      </div>
   );
};
