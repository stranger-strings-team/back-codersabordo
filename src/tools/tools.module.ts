/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EncryptService } from './encrypt.service';

@Module({
  providers: [EncryptService],
  exports: [EncryptService],
})
export class ToolsModule {}