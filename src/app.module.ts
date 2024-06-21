import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [UsersModule, MongooseModule.forRoot(process.env.MONGODB_CONNECTION)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
