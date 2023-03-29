/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../model/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop()
  password?: string;

  @Prop({ required: true, unique: true, match: /.+\@.+\..+/ })
  email: string;

  @Prop({ required: true })
  city: string;

  @Prop()
  roles?: Role[];

  @Prop({ required: true })
  progress: boolean[];

  @Prop({ required: false })
  openQuestion: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
