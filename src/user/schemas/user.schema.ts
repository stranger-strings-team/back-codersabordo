/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/model/role.enum';

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

  @Prop({ required: true })
  roles: Role[];

  @Prop({ required: true })
  progres: boolean[];
}

export const UserSchema = SchemaFactory.createForClass(User);
