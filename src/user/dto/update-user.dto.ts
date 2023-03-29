/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../model/role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty ({
        example: ['Admin'],
    })
    role?: Role[];
}
