import { responseFormShop } from "../dtos/shop.dto.js";
import { addShop, getShop } from "../repositories/shop.repository.js";

export const shopAdd = async (data) => {
  const joinShopId = await addShop({
    areaId: data.areaId,
    name: data.name,
    address: data.address,
    rating: data.rating,
  });

  const shop = await getShop(joinShopId);
  return responseFormShop(shop);
};
