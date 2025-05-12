import { BadRequestException } from '@nestjs/common';

export const validateValues = (
   value: string | number | (string | number)[],
): void => {
   if (Array.isArray(value)) {
      if (value.length === 0) {
         throw new BadRequestException(`Values array is empty`);
      }

      for (const v of value) {
         if (!v && v !== 0) {
            throw new BadRequestException(
               `Each value is required and cannot be ${v}`,
            );
         }
      }
   } else {
      if (!value && value !== 0) {
         throw new BadRequestException(`${value} is required`);
      }
   }
};
