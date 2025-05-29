import { GraphqlErrorCode } from 'src/common/errors/graphql-error-codes.enum';
import { throwGraphQLError } from 'src/common/errors/graphql-errors';

export const validateValues = (
   value: string | number | (string | number)[],
): void => {
   if (Array.isArray(value)) {
      if (value.length === 0) {
         throwGraphQLError(
            'Очікувався масив значень, але отримано порожній масив.',
            {
               code: GraphqlErrorCode.BAD_USER_INPUT,
            },
         );
      }

      for (const v of value) {
         if (v === null || v === undefined || v === '') {
            throwGraphQLError(
               'Масив містить порожнє або недопустиме значення.',
               {
                  code: GraphqlErrorCode.BAD_USER_INPUT,
               },
            );
         }
      }
   } else {
      if (value === null || value === undefined || value === '') {
         throwGraphQLError(
            'Очікувалося значення, але отримано порожнє або недопустиме.',
            {
               code: GraphqlErrorCode.BAD_USER_INPUT,
            },
         );
      }
   }
};
