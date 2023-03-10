import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type EpisodeDocument = HydratedDocument<Episode>;

@Schema()
export class Episode {
  @Prop()
  title: string;

  @Prop()
  date: MongooseSchema.Types.Date;

  @Prop()
  episode_number: number;

  @Prop()
  season: number;

  @Prop({ default: false })
  is_last_season_episode: boolean;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: 'Serial',
  })
  serial: MongooseSchema.Types.ObjectId;
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode);
