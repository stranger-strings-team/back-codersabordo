/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { QuestionModule } from './question/question.module';
import * as dotenv from 'dotenv';
import { APP_GUARD } from '@nestjs/core';
import { QuestionService } from './question/question.service';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB),
    // MongooseModule.forRootAsync({
    //   imports: [QuestionModule],
    //   useFactory: async (questionService: QuestionService) => ({
    //     uri: questionService.findAll(process.env.MONGO_DB),
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useCreateIndex: true,
    //     useFindAndModify: false,
    //   }),
    //   inject: [QuestionService],
    // }),
    UserModule, 
    AuthModule,
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
