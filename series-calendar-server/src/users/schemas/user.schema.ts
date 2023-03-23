import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RolesEnum } from '../../auth/types';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    default: RolesEnum.USER,
  })
  roles: RolesEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);
