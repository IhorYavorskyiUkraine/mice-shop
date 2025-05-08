import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';

@Module({
   providers: [OrderResolver, OrderService, ConfigService],
})
export class OrderModule {}
