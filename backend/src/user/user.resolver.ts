import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtGuard } from 'src/auth/guard';
import { CreateUserArgs, UpdateUserArgs } from './dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
   constructor(private readonly userService: UserService) {}

   @Query(() => User)
   async findUserByEmail(@Args('email') email: string) {
      return this.userService.findUserByEmail(email);
   }

   @Query(() => User)
   async findUserById(@Args('id', { type: () => Int }) id: number) {
      return this.userService.findUserById(id);
   }

   @Mutation(() => User)
   async createUser(@Args('args') args: CreateUserArgs) {
      return this.userService.createUser(args);
   }

   @UseGuards(JwtGuard)
   @Mutation(() => User)
   async updateUser(@Args('args') args: UpdateUserArgs) {
      //TODO: Get userId from cookies
      const userId = 'from Cookies';
      return this.userService.updateUser(args, 1);
   }
}
