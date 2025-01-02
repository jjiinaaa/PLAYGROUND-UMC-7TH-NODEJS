import { shop, shopDto } from "../entities/shop.entity.js";

export const bodyToShop = (body: shop): shopDto => {
  const { areaId, name, address, rating } = body;
  return {
    areaId,
    name,
    address,
    rating,
  };
};

export const responseFormShop = (shop: shop): shopDto => {
  const { areaId, name, address, rating } = shop;
  return {
    areaId,
    name,
    address,
    rating,
  };
};
