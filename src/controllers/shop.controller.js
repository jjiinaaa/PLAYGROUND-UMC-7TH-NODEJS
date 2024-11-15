import StatusCodes from "http-status-codes";
import { DuplicateUserEmailError } from "../errors.js";
import { bodyToShop } from "../dtos/shop.dto.js";
import { shopAdd } from "../services/shop.service.js";

export const handleShopAdd = async (req, res, next) => {
  const shop = await shopAdd(bodyToShop(req.body));
  if (shop === null) {
    throw new DuplicateUserEmailError("해당 상점이 존재하지 않습니다.", shop);
  }
  res.status(StatusCodes.OK).success(shop);
  // next - 미들웨어에 쓰이는 함수에 넣어주는 값 / 미들웨어 : 요청과 응답 사이에 실행되는 함수
};
