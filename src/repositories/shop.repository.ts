import { prisma } from "../db.config.js";
import { shop, shopDto } from "../entities/shop.entity.js";

// Shop 데이터 삽입
export const addShop = async (shop: shopDto): Promise<number | null> => {
  const { areaId, name, address, rating } = shop;
  const shopCheck = await prisma.shop.findFirst({
    where: { areaId, name },
  }); // Shop 데이터가 존재하는지 확인
  if (shopCheck) {
    return null; // Shop 데이터가 이미 존재할 경우 null 반환
  }
  const created = await prisma.shop.create({
    data: shop,
  });
  return created.id;
};

// Shop 정보 얻기
export const getShop = async (shopId: number): Promise<shop> => {
  const shop = await prisma.shop.findFirstOrThrow({ where: { id: shopId } });
  return shop;
};
