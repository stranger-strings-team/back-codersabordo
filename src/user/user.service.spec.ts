import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service'
import mongoose from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { EncryptService } from '../tools/encrypt.service';

const mockUserModel = {
  create: jest.fn().mockImplementation((dto) => ({
    _id: new mongoose.Types.ObjectId(),
    ...dto,
  })),
  findOneAndUpdate: jest.fn().mockImplementation(({ _id: id }, updateDto) => ({
    _id: new mongoose.Types.ObjectId(id),
    ...updateDto,
  })),
  findByIdAndRemove: jest.fn().mockImplementation(({ _id: id }) => ({
    exec: () => ({
      _id: new mongoose.Types.ObjectId(id),
    }),
  })),
  findOne: jest.fn().mockImplementation(({ _id: id }) => ({
    exec: () => ({
      _id: new mongoose.Types.ObjectId(id),
      name: 'Juana',
      surname: 'Cupcake',
      password: '123456',
      email: 'juanacupcake@gmail.com',
      city: 'Barcelona',
      // role: 'Admin', 
      section: [true, false, false],
      openQuestion: 'Espero poder aprender mucho durante el bootcamp',
    }),
  })),
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ 
        UserService,
        EncryptService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const createUserDto = {
      name: 'Juana',
      surname: 'Cupcake',
      password: '123456',
      email: 'juanacupcake@gmail.com',
      city: 'Barcelona',
      // role: 'Admin', 
      section: [true, false, false],
      openQuestion: 'Espero poder aprender mucho durante el bootcamp',
    };

    expect(await service.create(createUserDto)).toMatchObject({
      _id: expect.any(mongoose.Types.ObjectId),
      ...createUserDto,
    });
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUserDto = {
      name: 'Juana',
      surname: 'Cupcake',
      password: '123456',
      email: 'juanacupcake@gmail.com',
      city: 'Barcelona',
      //role: ['Admin'], 
      section: [true, false, false],
      openQuestion: 'Espero poder aprender mucho durante el bootcamp',
    };
    const id = '6412dac979170802752bbc97';
    expect(await service.update(id, updateUserDto)).toMatchObject({
      _id: new mongoose.Types.ObjectId(id),
    });
  });

  it('should delete a user', async () => {
    const id = '6412dac979170802752bbc97';
    expect(await service.remove(id)).toMatchObject({
      _id: new mongoose.Types.ObjectId(id),
    });
  });

  it('should find a user', async () => {
    const badgeId = '6412dac979170802752bbc97';
    expect(await service.findOne(badgeId)).toMatchObject({
      _id: new mongoose.Types.ObjectId(badgeId),
    });
  });
});
