import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { OtpModule } from './otp/otp.module';
import { ProductFiltersModule } from './product-filters/product-filters.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';

@Module({
   imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
         driver: ApolloDriver,
         autoSchemaFile: true,
         playground: true,
         sortSchema: true,
         context: ({ req, res }) => ({ req, res }),
      }),
      ConfigModule.forRoot(),
      UserModule,
      AuthModule,
      OrderModule,
      ProductModule,
      CartModule,
      ReviewModule,
      ProductFiltersModule,
      OtpModule,
      AddressModule,
   ],
   providers: [AppService, AppResolver],
})
export class AppModule {}
