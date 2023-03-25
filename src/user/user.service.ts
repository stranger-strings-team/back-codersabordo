/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model, ObjectId } from 'mongoose';
import { Request } from 'express';
// import { hash } from 'bcrypt';
import { EncryptService } from '../tools/encrypt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private encryptService: EncryptService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashPassword = await this.encryptService.encrypt(
      createUserDto.password,
    );
    createUserDto.password = hashPassword;

    return this.userModel.create(createUserDto);
  }

  async findAll(request: Request): Promise<User[]> {
    return this.userModel
      .find(request.query)
      .setOptions({ sanitizeFilter: true })
      .exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).lean();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ _id: id }, updateUserDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.userModel.findByIdAndRemove({ _id: id }).exec();
  }
}
