import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EpisodesService } from './episodes.service';
import { EpisodesController } from './episodes.controller';
import { Episode, EpisodeSchema } from './schema/episode.schema';
import { SerialsModule } from 'src/serials/serials.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Episode.name, schema: EpisodeSchema }]),
    SerialsModule,
    UsersModule,
  ],
  controllers: [EpisodesController],
  providers: [EpisodesService],
  exports: [EpisodesService],
})
export class EpisodesModule {}
