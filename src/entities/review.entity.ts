export interface reviewDto {
  userId: number;
  shopId: number;
  content: string;
  rating: number;
}

export { review } from "@prisma/client";
