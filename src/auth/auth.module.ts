/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ToolsModule } from '../tools/tools.module';
import { UserModule } from '../user/user.module'
import { AuthService } from './auth.service';
import { LoginController } from './login.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    UserModule,
    ToolsModule,
  ],
  controllers: [LoginController],
  providers: [JwtStrategy, LocalStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
