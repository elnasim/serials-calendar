import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Schema as MongooseSchema } from 'mongoose';
import { RolesEnum } from '../../auth/types';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: ObjectId;

  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    default: RolesEnum.USER,
  })
  roles: RolesEnum;

  @Prop({
    default: false,
  })
  isEmailConfirmed: boolean;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Serial',
    default: [],
  })
  favoriteSerials: MongooseSchema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
