import { responseFormShop } from "../dtos/shop.dto.js";
import { addShop, getShop } from "../repositories/shop.repository.js";

export const shopAdd = async (data) => {
  const { areaId, name, address, rating } = data;
  console.log("shopAdd 함수 실행 : ", data);
  const joinShopId = await addShop({
    areaId,
    name,
    address,
    rating,
  });
  console.log("joinShopId : ", joinShopId);
  const shop = await getShop(joinShopId);
  return responseFormShop(shop);
};
