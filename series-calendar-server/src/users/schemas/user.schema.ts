import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RolesEnum } from '../../auth/types';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
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
}

export const UserSchema = SchemaFactory.createForClass(User);
