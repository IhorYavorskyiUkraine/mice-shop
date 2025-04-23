import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Props {
   data: { id: number; name: string; title: string }[];
   activeSort: [string, 'asc' | 'desc'];
   setActive: (sort: any) => void;
}

export const SortByDropdown: React.FC<Props> = ({
   activeSort,
   setActive,
   data,
}) => {
   const handleItemClick = (field?: string, direction?: 'asc' | 'desc') => {
      setActive([field || activeSort[0], direction || activeSort[1]]);
   };

   return (
      <div className="lg:flex gap-2 hidden">
         <p>Сортувати за:</p>
         <DropdownMenu>
            <DropdownMenuTrigger>
               {data.find(
                  item =>
                     item.name === activeSort[0] &&
                     (item.id === 1 || item.id === 2),
               )?.title || 'Сортувати'}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
               {data.map((item, i) => (
                  <DropdownMenuItem
                     key={i}
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
