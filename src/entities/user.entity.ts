import { user, preferFood, userPreferFood } from "@prisma/client";

export interface UserDto {
  password: string;
  email: string;
  name: string;
  gender: string;
  birth: string;
  address: string;
  detailAddress: string;
  phoneNumber: string;
  point: number;
  preferences: any[];
}

export { user, preferFood, userPreferFood };
