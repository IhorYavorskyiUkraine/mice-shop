import { GraphQLError } from 'graphql';

interface ErrorOptions {
   code?: string;
   argumentName?: string;
   [key: string]: any;
}

export function throwGraphQLError(message: string, options?: ErrorOptions) {
   const {
      code = 'INTERNAL_SERVER_ERROR',
      argumentName,
      ...rest
   } = options || {};

   throw new GraphQLError(message, {
      extensions: {
         code,
         ...(argumentName ? { argumentName } : {}),
         ...rest,
      },
   });
}
