export interface reviewDto {
  userId: number;
  shopId: number;
  content: string | null;
  rating: number;
}

export { review } from "@prisma/client";
