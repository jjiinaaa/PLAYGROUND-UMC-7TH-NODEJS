import StatusCodes from "http-status-codes";
import { bodyToShop } from "../dtos/shop.dto.js";
import { shopAdd } from "../services/shop.service.js";

export const handleShopAdd = async (res, req, next) => {
  console.log("Shop Add Request");
  console.log("Request Body:", req.body);

  const shop = await shopAdd(bodyToShop(req.body));
  console.log("Shop Add Result");
  res.status(StatusCodes.OK).json({ result: shop });
};
