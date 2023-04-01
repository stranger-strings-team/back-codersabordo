import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '.././src/app.module';
import mongoose, { Connection } from 'mongoose';
import { DatabaseService } from '../src/database/database.service';
import { questionStub } from './question.stub';
import { CreateQuestionDto } from 'src/question/dto/create-question.dto';


describe('QuestionController E2E Test', () => {
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
    await dbConnection.collection('questions').deleteMany({});
  });

  describe('find all questions', () => {
    it('should return an array of questions', async () => {
      await dbConnection.collection('questions').insertOne(questionStub());
      const response = await request(httpServer).get('/question');
      console.log(response)
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([questionStub()]); 
    });
  });

//   describe('create a question', () => {
//     it('should create a question', async () => {
//       const createQuestionRequest: CreateQuestionDto = {
//         question: questionStub().question,
//         answer: questionStub().answer,
//         type: questionStub().type,
//         section: questionStub().section,
//         feedbackCorrect: questionStub().feedbackCorrect,
//         feedbackIncorrect: questionStub().feedbackIncorrect, 
//       };
//       const response = await request(httpServer)
//         .post('/question')
//         .send(createQuestionRequest);
//       expect(response.status).toBe(201);
//       expect(response.body).toMatchObject(createQuestionRequest);

//       const user = await dbConnection 
//         .collection('questions')
//         .findOne({ question: createQuestionRequest.question });
//       expect(user).toMatchObject(createQuestionRequest); 
//     });
//   });
});
