import { ObjectId } from 'mongoose';

export const enum RolesEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IJwtDecode {
  roles: RolesEnum;
  id: ObjectId;
}

export interface IVerificationTokenPayload {
  email: string;
}

export interface ITokenValidate {
  token: string;
}
