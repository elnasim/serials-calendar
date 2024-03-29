import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SerialsModule } from './serials/serials.module';
import { EpisodesModule } from './episodes/episodes.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ParserModule } from './parser/parser.module';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}`,
    ),
    SerialsModule,
    EpisodesModule,
    UsersModule,
    AuthModule,
    ParserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
