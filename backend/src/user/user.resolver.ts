import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtGuard } from 'src/auth/guard';
import { CreateUserArgs, UpdateUserArgs } from './dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
   constructor(
      private readonly userService: UserService,
      private authService: AuthService,
   ) {}

   @Query(() => User)
   async findUserByEmail(@Args('email') email: string) {
      return this.userService.findUserByEmail(email);
   }

   @Query(() => User)
   async findUserById(@Context() context: { req: Request; res: Response }) {
      const { userId } = await this.authService.getValidUserIdOrThrow(
         context.req,
         context.res,
      );

      return this.userService.findUserById(userId);
   }

   @Mutation(() => User)
   async createUser(@Args('args') args: CreateUserArgs) {
      return this.userService.createUser(args);
   }

   @UseGuards(JwtGuard)
   @Mutation(() => User)
   async updateUser(
      @Args('args') args: UpdateUserArgs,
      @Context() context: { req: Request; res: Response },
   ) {
      const { userId } = await this.authService.getValidUserIdOrThrow(
         context.req,
         context.res,
      );

      return this.userService.updateUser(args, userId);
   }
}
