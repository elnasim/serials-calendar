import { Module } from '@nestjs/common';
import { ParserController } from './parser.controller';
import { EpisodesModule } from 'src/episodes/episodes.module';
import { SerialsModule } from 'src/serials/serials.module';
import { ParserService } from './parser.service';

@Module({
  imports: [EpisodesModule, SerialsModule],
  controllers: [ParserController],
  providers: [ParserService],
})
export class ParserModule {}
