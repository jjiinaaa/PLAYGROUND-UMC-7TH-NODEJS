import { responseFormShop } from "../dtos/shop.dto.js";
import { DuplicateUserEmailError } from "../errors.js";
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
  if (joinShopId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 가게입니다.", { data });
  }
  const shop = await getShop(joinShopId);
  return responseFormShop(shop);
};
