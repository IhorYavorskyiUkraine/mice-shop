'use client';

import { useFormContext } from 'react-hook-form';
import { Textarea } from '../ui';
import { ErrorText } from './error-text';
import { RequiredSymbol } from './required-symbol';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
   name: string;
   label?: string;
   required?: boolean;
   className?: string;
   placeholder?: string;
}

export const TextareaWithValidations: React.FC<Props> = ({
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

   const errorText = errors[name]?.message as string;

   return (
      <div className={className}>
         {label && (
            <p className="mb-1 font-medium text-default">
               {label} {required && <RequiredSymbol />}
            </p>
         )}
         <Textarea
            placeholder={placeholder}
            className="text-md text-default h-[100px] resize-none"
            {...register(name)}
            {...props}
         />
         {errorText && <ErrorText text={errorText} className="mt-2" />}
      </div>
   );
};
