/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service';

@Controller()
@ApiTags('Coders a Bordo')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
