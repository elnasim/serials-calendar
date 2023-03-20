export const enum RolesEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IJwtDecode {
  roles: RolesEnum;
}
