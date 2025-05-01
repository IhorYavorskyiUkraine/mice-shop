import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetLikedModelsArgs {
   @Field(() => Int)
   modelId: number;

   @Field(() => Int)
   limit: number;

   @Field(() => Int)
   offset: number;
}
