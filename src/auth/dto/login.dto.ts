/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

  @ApiProperty({ example: 'juanacupcake@gmail.com' })
  readonly email: string;

  @ApiProperty({ example: '1234' })
  password: string;

}
