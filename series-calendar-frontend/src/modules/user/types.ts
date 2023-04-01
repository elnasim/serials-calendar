import type { ISerial } from "@/modules/serials/types";

export interface IUserProfile {
  email: string;
  favoriteSerials: ISerial[];
  isEmailConfirmed: boolean;
}
