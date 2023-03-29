import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { QuestionModule } from '../src/question/question.module'
import { QuestionService } from '../src/question/question.service';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';

describe('Question', () => {
  let app: INestApplication;
  const questionService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(QuestionService)
      .useValue(questionService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET question`, () => {
    return request(app.getHttpServer()).get('/question').expect(200).expect({
      data: questionService.findAll(),
    }); 
  });

  afterAll(async () => {
    await app.close();
  });  
});
