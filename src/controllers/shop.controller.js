import StatusCodes from "http-status-codes";
import { bodyToShop } from "../dtos/shop.dto.js";
import { shopAdd } from "../services/shop.service.js";

export const handleShopAdd = async (req, res, next) => {
  const shop = await shopAdd(bodyToShop(req.body));
  res.status(StatusCodes.OK).json({ result: shop });
  // next - 미들웨어에 쓰이는 함수에 넣어주는 값 / 미들웨어 : 요청과 응답 사이에 실행되는 함수
};
