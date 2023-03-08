import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, match: /.+\@.+\..+/ })
  email: string;

  @Prop({ required: true })
  city: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
