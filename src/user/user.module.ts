import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ToolsModule } from 'src/tools/tools.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    ToolsModule,
  ],
  controllers: [UserController],
  providers: [UserService, { provide: APP_GUARD, useClass: RolesGuard }],
  exports: [UserService],
})
export class UserModule {}
