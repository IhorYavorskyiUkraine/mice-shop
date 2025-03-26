import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewResolver } from './review.resolver';
import { ReviewService } from './review.service';

@Module({
   imports: [AuthModule],
   providers: [ReviewResolver, ReviewService, PrismaService],
})
export class ReviewModule {}
