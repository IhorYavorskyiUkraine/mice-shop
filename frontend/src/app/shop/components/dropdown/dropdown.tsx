import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { dropdownData } from './dropdown.data';

interface Props {
   activeSort: [string, 'asc' | 'desc'];
   setActive: (sort: any) => void;
}

export const Dropdown: React.FC<Props> = ({ activeSort, setActive }) => {
   const handleItemClick = (field?: string, direction?: 'asc' | 'desc') => {
      setActive([field || activeSort[0], direction || activeSort[1]]);
   };

   return (
      <div className="flex gap-2">
         <p>Сортувати за:</p>
         <DropdownMenu>
            <DropdownMenuTrigger>
               {dropdownData.find(
                  item =>
                     item.name === activeSort[0] &&
                     (item.id === 1 || item.id === 2),
               )?.title || 'Сортувати'}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
               {dropdownData.map(item => (
                  <DropdownMenuItem
                     key={item.id}
                     onClick={() => {
                        if (item.id === 1 || item.id === 2) {
                           handleItemClick(item.name, undefined);
                        } else if (item.id === 3 || item.id === 4) {
                           handleItemClick(
                              undefined,
                              item.name as 'asc' | 'desc',
                           );
                        }
                     }}
                     active={
                        item.id === 1 || item.id === 2
                           ? activeSort[0] === item.name
                           : activeSort[1] === item.name
                     }
                  >
                     {item.title}
                  </DropdownMenuItem>
               ))}
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
};
