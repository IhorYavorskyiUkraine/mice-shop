import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query((type) => String)
  async hello() {
    return 'Hello World!';
  }
}
