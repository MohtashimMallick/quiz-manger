import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwrService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    const isAuthenticatePassword = await bcrypt.compare(
      password,
      user.password,
    );
    if (!user) throw new BadRequestException();

    if (!isAuthenticatePassword) throw new UnauthorizedException();

    return user;
  }

  generateToken(user: any) {
    return {
      access_token: this.jwrService.sign({
        name: user.name,
        sub: user.id,
      }),
    };
  }
}
