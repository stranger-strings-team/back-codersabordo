import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '.././src/app.module';
import mongoose, { Connection } from 'mongoose';
import { DatabaseService } from '../src/database/database.service';
import { userStub } from './user.stub';
import { CreateUserDto } from 'src/user/dto/create-user.dto';


describe('UsersController E2E Test', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('users').deleteMany({});
  });

  describe('find all users', () => {
    it('should return an array of users', async () => {
      await dbConnection.collection('users').insertOne(userStub());
      const response = await request(httpServer).get('/user');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([userStub()]);
    });
  });

  // describe('create a user', () => {
  //   it('should create a user', async () => {
  //     const createUserRequest: CreateUserDto = {
  //       name: userStub().name,
  //       surname: userStub().surname,
  //       password: userStub().password,
  //       email: userStub().email,
  //       city: userStub().city,
  //       progress: userStub().progress,
  //       openQuestion: userStub().openQuestion,
  //     };
  //     const response = await request(httpServer)
  //       .post('/user')
  //       .send(createUserRequest);
  //     expect(response.status).toBe(201);
  //     expect(response.body).toMatchObject(createUserRequest);

  //     const user = await dbConnection 
  //       .collection('users')
  //       .findOne({ email: createUserRequest.email });
  //     expect(user).toMatchObject(createUserRequest);
  //   });
  // });
});
