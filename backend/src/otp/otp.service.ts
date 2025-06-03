import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { GraphqlErrorCode } from 'src/common/errors/graphql-error-codes.enum';
import { throwGraphQLError } from 'src/common/errors/graphql-errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class OtpService {
   constructor(
      private configService: ConfigService,
      private userService: UserService,
      private jwt: JwtService,
      private prisma: PrismaService,
   ) {}
   async sendOtpFromEmail(id: number, email: string) {
      if (!email) {
         throwGraphQLError('Email is required', {
            code: GraphqlErrorCode.BAD_USER_INPUT,
         });
      }

      const token = this.jwt.sign(
         { userId: id, email },
         {
            secret: this.configService.get<string>('EMAIL_JWT_SECRET'),
            expiresIn: '24h',
         },
      );

      const link = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

      const user = await this.userService.findUserById(id);
      if (!user) {
         throwGraphQLError('User not found', {
            code: GraphqlErrorCode.USER_NOT_FOUND,
         });
      }

      await this.prisma.user.update({
         where: { id: user.id },
         data: {
            otp: token,
         },
      });

      return await this.transporter.sendMail({
         from: `"PIXELMOUSE" <${process.env.EMAIL_FROM}>`,
         to: email,
         subject: 'Ваше посилання для підтвердження',
         html: `<p>Посилання: <b>${link}</b></p>`,
      });
   }

   async confirmEmail(token: string) {
      if (!token) {
         throwGraphQLError('Token is required', {
            code: GraphqlErrorCode.BAD_USER_INPUT,
         });
      }

      const payload = this.jwt.verify(token, {
         secret: this.configService.get<string>('EMAIL_JWT_SECRET'),
      });

      if (!payload) {
         throwGraphQLError('Invalid token', {
            code: GraphqlErrorCode.UNAUTHORIZED,
         });
      }

      const user = await this.userService.findUserById(payload.userId);

      if (!user) {
         throwGraphQLError('User not found', {
            code: GraphqlErrorCode.USER_NOT_FOUND,
         });
      }

      await this.prisma.user.update({
         where: { id: user.id },
         data: {
            verified: true,
            otp: null,
         },
      });

      return { message: 'success' };
   }

   private transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: this.configService.get<string>('EMAIL_FROM'),
         pass: this.configService.get<string>('EMAIL_PASS'),
      },
   });
}
