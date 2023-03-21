/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

  @ApiProperty({ example: '123456' })
  password: string;

  @ApiProperty({ example: 'sergialsina81@gmail.com' })
  readonly email: string;

}
