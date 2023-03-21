/* eslint-disable prettier/prettier */
import { Body, Req, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/schemas/user.schema';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local.guard';


@Controller()
@ApiTags('Login')
export class LoginController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: Request, @Body() loginDto: LoginDto) {
    return this.authService.login(req.user);
  }
}
