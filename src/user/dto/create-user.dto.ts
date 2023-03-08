import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Juana' })
  readonly name: string;

  @ApiProperty({ example: 'Cupcake' })
  readonly surname: string;

  @ApiProperty({ example: '1234' })
  password: string;

  @ApiProperty({ example: 'juanacupcake@gmail.com' })
  readonly email: string;

  @ApiProperty({ example: 'Barcelona' })
  readonly city: string;
}
