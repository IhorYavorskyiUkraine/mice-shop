import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
   imports: [AuthModule],
   providers: [UserResolver, UserService, PrismaService],
})
export class UserModule {}
