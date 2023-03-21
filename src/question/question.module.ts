/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Question, QuestionSchema } from './schemas/question.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ToolsModule } from 'src/tools/tools.module';



@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Question.name,
        schema: QuestionSchema,
      },
    ]),
    ToolsModule,
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
