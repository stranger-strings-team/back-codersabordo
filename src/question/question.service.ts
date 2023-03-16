/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question, QuestionDocument } from './schemas/question.schema';
import { Model, ObjectId } from 'mongoose';
import { Request } from 'express';
// import { hash } from 'bcrypt';
import { EncryptService } from 'src/tools/encrypt.service';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
    private encryptService: EncryptService,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    return this.questionModel.create(createQuestionDto);
  }

  async findAll(request: Request): Promise<Question[]> {
    return this.questionModel
      .find(request.query)
      .setOptions({ sanitizeFilter: true })
      .exec();
  }

  async findOne(id: string): Promise<Question> {
    return this.questionModel.findOne({ _id: id }).exec();
  }

  async findOneByEmail(email: string): Promise<Question> {
    return this.questionModel.findOne({ email });
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    return this.questionModel.findOneAndUpdate({ _id: id }, updateQuestionDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.questionModel.findByIdAndRemove({ _id: id }).exec();
  }
}
