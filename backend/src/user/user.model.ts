import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

registerEnumType(UserRole, {
   name: 'UserRole',
});

@ObjectType()
export class User {
   @Field(type => Int)
   id: number;

   @Field()
   displayName: string;

   @Field()
   email: string;

   @Field(type => UserRole, { defaultValue: UserRole.USER })
   role: UserRole;

   @Field({ nullable: true })
   refreshToken?: string;

   @Field(type => [String])
   orders: string[];

   @Field(type => [String])
   reviews: string[];

   @Field(type => [String])
   liked: string[];

   @Field({ nullable: true })
   cart?: string;

   @Field()
   createdAt: Date;

   @Field()
   updatedAt: Date;
}
