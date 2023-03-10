import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type SerialDocument = HydratedDocument<Serial>;

@Schema()
export class Serial {
  @Prop({
    type: String,
    unique: true,
  })
  title: string;

  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      required: true,
      ref: 'Episode',
    },
  ])
  episodes: MongooseSchema.Types.ObjectId[];
}

export const SerialSchema = SchemaFactory.createForClass(Serial);
