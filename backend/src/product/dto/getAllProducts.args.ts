import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetAllProductsArgs {
   @Field({ nullable: true })
   orderBy?: string;

   @Field(() => Int)
   limit: number;

   @Field(() => Int)
   offset: number;

   @Field({ nullable: true })
   tagId?: number;

   @Field({ nullable: true })
   brandId?: number;

   @Field({ nullable: true })
   name?: string;

   @Field({ nullable: true })
   views?: string;

   @Field({ nullable: true })
   new?: string;

   @Field({ nullable: true })
   rating?: number;
}
