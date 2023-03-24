import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answer?: [
    {
      text: string;
      isCorrect: boolean;
    },
  ];

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  section: string;

  @Prop({ required: true })
  feedbackCorrect: string;

  @Prop({ required: true })
  feedbackIncorrect: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
