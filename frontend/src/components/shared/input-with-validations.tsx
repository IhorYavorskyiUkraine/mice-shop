'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '../ui';
import { ErrorText } from './error-text';
import { RequiredSymbol } from './required-symbol';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
   name?: string;
   label?: string;
   required?: boolean;
   className?: string;
   placeholder?: string;
}

export const InputWithValidations: React.FC<Props> = ({
   className,
   name,
   label,
   required,
   placeholder,
   ...props
}) => {
   const {
      register,
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
         <Input
            placeholder={placeholder}
            className="text-md h-12"
            {...register(name || '')}
            {...props}
         />
         {errorText && <ErrorText text={errorText} className="mt-2" />}
      </div>
   );
};
