import {
  responseFormReview,
  responsePreviewReview,
} from "../dtos/review.dto.js";
import { DuplicateUserEmailError } from "../errors.js";
import {
  addReview,
  getReview,
  getShopReviews,
  getUserReviews,
} from "../repositories/review.repository.js";

export const reviewAdd = async (review) => {
  const { shopId, userId, content, rating } = review;
  const joinReviewId = await addReview({
    shopId,
    userId,
    content,
    rating,
  });
  if (joinReviewId === null) {
    throw new DuplicateUserEmailError("해당 상점이 존재하지 않습니다.", review);
  }
  const reviewData = await getReview(joinReviewId);
  return responseFormReview(reviewData);
};

export const shopReviewListGet = async (shopId, cursor) => {
  const reviews = await getShopReviews(shopId, cursor);
  return responsePreviewReview(reviews);
};

export const userReviewListGet = async (userId, cursor) => {
  const reviews = await getUserReviews(userId, cursor);
  return responsePreviewReview(reviews);
};
