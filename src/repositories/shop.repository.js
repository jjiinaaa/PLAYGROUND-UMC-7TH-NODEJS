import { prisma } from "../db.config.js";

// Shop 데이터 삽입
export const addShop = async (shop) => {
  const created = await prisma.shop.create({
    data: shop,
  });
  return created.id;
};

// Shop 정보 얻기
export const getShop = async (shopId) => {
  const shop = await prisma.shop.findFirstOrThrow({ where: { id: shopId } });
  return shop;
};
