import { shop } from "@prisma/client";

export interface shopDto {
  areaId: number;
  name: string;
  address: string;
  rating: number;
}

export { shop };
