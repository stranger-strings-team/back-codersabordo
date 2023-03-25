import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import mongoose from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './schemas/question.schema';

const mockQuestionModel = {
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
      question: 'He terminado el bootcamp. ¿Ahora qué?',
      section: 'Sección 3 - ¿Qué puedes esperarte al finalizar el bootcamp?',
      answer: [
        { text: 'Con la cámara encendida y el micro apagado', isCorrect: true },
        { text: 'Es indiferente', isCorrect: false },
      ],
      type: 'Opción múltiple',
      feedbackCorrect:
        'Nos queremos ver las caras entre todas y fomentar la participación',
      feedbackIncorrect: 'Incorrecto - vuelve a intentarlo',
    }),
  })),
};

describe('QuestionService', () => {
  let service: QuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: getModelToken('Question'),
          useValue: mockQuestionModel,
        },
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new question', async () => {
    const createQuestionDto = {
      question: 'He terminado el bootcamp. ¿Ahora qué?',
      section: 'Sección 3 - ¿Qué puedes esperarte al finalizar el bootcamp?',
      type: 'Opción múltiple',
      feedbackCorrect:
        'Nos queremos ver las caras entre todas y fomentar la participación',
      feedbackIncorrect: 'Incorrecto - vuelve a intentarlo',
    };

    expect(await service.create(createQuestionDto)).toMatchObject({
      _id: expect.any(mongoose.Types.ObjectId),
      ...createQuestionDto,
    });
  });

  it('should update a question', async () => {
    const updateQuestionDto: UpdateQuestionDto = {
      question: 'He terminado el bootcamp. ¿Ahora qué?',
      section: 'Sección 3 - ¿Qué puedes esperarte al finalizar el bootcamp?',
      type: 'Opción múltiple',
      feedbackCorrect:
        'Nos queremos ver las caras entre todas y fomentar la participación',
      feedbackIncorrect: 'Incorrecto - vuelve a intentarlo',
    };
    const id = '6412dac979170802752bbc97';
    expect(await service.update(id, updateQuestionDto)).toMatchObject({
      _id: new mongoose.Types.ObjectId(id),
    });
  });

  it('should delete a question', async () => {
    const id = '6412dac979170802752bbc97';
    expect(await service.remove(id)).toMatchObject({
      _id: new mongoose.Types.ObjectId(id),
    });
  });

  it('should find a question', async () => {
    const badgeId = '6412dac979170802752bbc97';
    expect(await service.findOne(badgeId)).toMatchObject({
      _id: new mongoose.Types.ObjectId(badgeId),
    });
  });
});
