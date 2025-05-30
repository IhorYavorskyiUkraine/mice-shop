import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { OtpService } from 'src/otp/otp.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
   imports: [AuthModule],
   providers: [UserResolver, UserService, PrismaService, OtpService],
})
export class UserModule {}
