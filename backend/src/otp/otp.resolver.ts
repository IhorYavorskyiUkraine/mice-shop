import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { EmailConfirmedResponse } from './models/email-confirmed-response.model';
import { EmailResponse } from './models/email-response.model';
import { OtpService } from './otp.service';

@Resolver()
export class OtpResolver {
   constructor(private readonly otpService: OtpService) {}

   @Mutation(() => EmailResponse)
   async sendOtpFromEmail(
      @Args('id') id: number,
      @Args('email') email: string,
   ) {
      return this.otpService.sendOtpFromEmail(id, email);
   }

   @Mutation(() => EmailConfirmedResponse)
   async confirmEmail(@Args('token') token: string) {
      return this.otpService.confirmEmail(token);
   }
}
