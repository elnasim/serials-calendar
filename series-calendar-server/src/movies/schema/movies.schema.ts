import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Schema as MongooseSchema } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  _id: ObjectId;

  @Prop({
    type: String,
    unique: true,
  })
  title: string;
}

export const MoviesSchema = SchemaFactory.createForClass(Movie);
