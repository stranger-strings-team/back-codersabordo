/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { EncryptService } from '../tools/encrypt.service';
import { IUser } from '../user/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private encryptService: EncryptService,
  ) {};

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
    const payload = { email: user.email, sub: user._id, roles: user.roles[0] };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
