/* eslint-disable prettier/prettier */
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
  ) {};

  async validateUser(email: string, password: string): Promise<IUser> {
    const user = await this.userService.findOneByEmail(email);
    //console.log(user)
    if (user) {
      const isValidPassword = await this.encryptService.compare(
        password,
        user.password,
      );
        //console.log(isValidPassword)
      if (isValidPassword) {
        const { password, ...result } = user;
        //console.log('result', result)
        return result as IUser;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, roles: user.roles[0] };
    //console.log(payload)
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
