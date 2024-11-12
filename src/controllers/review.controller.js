import StatusCodes from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import {
  reviewAdd,
  shopReviewListGet,
  userReviewListGet,
} from "../services/review.service.js";

export const handleReviewAdd = async (req, res, next) => {
  console.log("Review Add Request");
  console.log("Request Body:", req.body);

  const review = await reviewAdd(bodyToReview(req.body));
  console.log("Review Add Result");
  res.status(StatusCodes.OK).json({ result: review });
  // next - 미들웨어에 쓰이는 함수에 넣어주는 값 / 미들웨어 : 요청과 응답 사이에 실행되는 함수
};

export const handleListShopReviews = async (req, res, next) => {
  const { shopId } = req.params;
  // shopId 형변환
  const reviews = await shopReviewListGet(
    parseInt(shopId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).json({ result: reviews });
};

export const handleListUserReviews = async (req, res, next) => {
  const { userId } = req.params;
  const reviews = await userReviewListGet(
    parseInt(userId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).json({ result: reviews });
};
