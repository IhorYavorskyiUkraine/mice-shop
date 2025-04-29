import { ProfileTabButton } from './profile-tab-button';
import { profileTabs } from './profile-tabs.data';

interface Props {
   setActiveTab: (tab: number) => void;
}

export const ProfileTabs: React.FC<Props> = ({ setActiveTab }) => {
   return (
      <div className="flex flex-col gap-[30px] py-md pr-md">
         {profileTabs.map(tab => (
            <ProfileTabButton
               key={tab.id}
               {...tab}
               setActiveTab={setActiveTab}
            />
         ))}
      </div>
   );
};
