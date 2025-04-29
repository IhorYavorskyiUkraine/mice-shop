'use client';

import { useFormContext } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { Input } from '../ui';
import { ErrorText } from './error-text';
import { RequiredSymbol } from './required-symbol';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
   name?: string;
   label?: string;
   required?: boolean;
   className?: string;
   placeholder?: string;
   mask?: string;
}

export const InputWithValidations: React.FC<Props> = ({
   className,
   name,
   label,
   required,
   placeholder,
   mask,
   ...props
}) => {
   const {
      register,
      getValues,
      setValue,
      formState: { errors },
   } = useFormContext();

   const errorText = errors[name as string]?.message as string;

   return (
      <div className={className}>
         {label && (
            <p className="mb-1 font-medium text-m1">
               {label} {required && <RequiredSymbol />}
            </p>
         )}
         {mask ? (
            <IMaskInput
               mask={mask}
               radix="."
               value={getValues('phone')}
               onAccept={
                  setValue
                     ? value => setValue(name || '', value)
                     : getValues('phone')
               }
               {...register(name || '')}
               placeholder={placeholder}
               className="text-md h-12 file:text-foreground uppercase border-ring  ring-ring/50 ring-[3px] placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-t1
                  aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
               {...props}
            />
         ) : (
            <Input
               placeholder={placeholder}
               className="text-md h-12"
               {...register(name || '')}
               {...props}
            />
         )}
         {errorText && <ErrorText text={errorText} className="mt-2" />}
      </div>
   );
};
