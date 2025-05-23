'use client';

import { Checkbox } from '@/components/ui/checkbox';

interface Props {
   text: string;
   checked: boolean;
   onCheckedChange: (checked: boolean) => void;
   loading?: boolean;
}

export const CheckboxWithText: React.FC<Props> = ({
   text,
   checked,
   onCheckedChange,
   loading,
}) => {
   const checkboxId = `checkbox-${text.replace(/\s+/g, '-').toLowerCase()}`;

   return (
      <div className="items-top  flex space-x-2">
         <Checkbox
            id={checkboxId}
            disabled={loading}
            checked={checked}
            onCheckedChange={onCheckedChange}
         />
         <label
            htmlFor={checkboxId}
            className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
         >
            {text}
         </label>
      </div>
   );
};
