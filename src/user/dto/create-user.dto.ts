/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../model/role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'Juana' })
  readonly name: string;

  @ApiProperty({ example: 'Cupcake' })
  readonly surname: string;

  @ApiProperty({ example: '1234' })
  password?: string;

  @ApiProperty({ example: 'juanacupcake@gmail.com' })
  readonly email: string;

  @ApiProperty({ example: 'Barcelona' })
  readonly city: string;

  @ApiProperty({ example: 'Admin' })
  readonly role?: Role[];

  @ApiProperty({ example: [false, false, false] })
  readonly progress: boolean[];

  @ApiProperty({ example: 'Espero poder aprender mucho durante el bootcamp' })
  readonly openQuestion: string;
}
