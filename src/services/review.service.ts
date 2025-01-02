import { reviewDto, review } from "../entities/review.entity.js";
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

export const reviewAdd = async (review: reviewDto): Promise<reviewDto> => {
  const { shopId, userId, content, rating } = review;
  const joinReviewId: number | null = await addReview({
    shopId,
    userId,
    content,
    rating,
  });
  if (joinReviewId === null) {
    throw new DuplicateUserEmailError("해당 상점이 존재하지 않습니다.", review);
  }
  const reviewData: review = await getReview(joinReviewId);
  return responseFormReview(reviewData);
};

export const shopReviewListGet = async (
  shopId: number,
  cursor: number
): Promise<any> => {
  const reviews = await getShopReviews(shopId, cursor);
  return responsePreviewReview(reviews);
};

export const userReviewListGet = async (
  userId: number,
  cursor: number
): Promise<any> => {
  const reviews = await getUserReviews(userId, cursor);
  return responsePreviewReview(reviews);
};
