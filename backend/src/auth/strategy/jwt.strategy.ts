import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
   constructor(
      private userService: UserService,
      private config: ConfigService,
   ) {
      super({
         jwtFromRequest: ExtractJwt.fromExtractors([
            req => req.cookies['accessToken'],
         ]),
         secretOrKey: config.get('JWT_SECRET'),
         ignoreExpiration: false,
      });
   }

   async validate(payload: any) {
      const user = await this.userService.findUserById(payload.sub);

      if (!user) {
         throw new UnauthorizedException();
      }

      return { userId: user.id, email: user.email };
   }
}
