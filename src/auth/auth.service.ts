import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { EncryptService } from 'src/tools/encrypt.service';
import { IUser } from 'src/user/interfaces/user.interface';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private encryptService: EncryptService,
  ) {}

  async validateUser(email: string, password: string): Promise<IUser> {
    const user = await this.userService.findOneByEmail(email);

    if (user) {
      const isValidPassword = await this.encryptService.compare(
        password,
        user.password,
      );

      if (isValidPassword) {
        const { password, ...result } = user;
        return result as IUser;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
