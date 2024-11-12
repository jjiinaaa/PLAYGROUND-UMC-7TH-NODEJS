import {
  responseFormReview,
  responsePreviewReview,
} from "../dtos/review.dto.js";
import {
  addReview,
  getReview,
  getShopReviews,
} from "../repositories/review.repository.js";

export const reviewAdd = async (review) => {
  const { shopId, userId, content, rating } = review;
  const joinReviewId = await addReview({
    shopId,
    userId,
    content,
    rating,
  });
  const reviewData = await getReview(joinReviewId);
  return responseFormReview(reviewData);
};

export const shopReviewListGet = async (shopId, cursor) => {
  const reviews = await getShopReviews(shopId, cursor);
  console.log("shopReviewListGet reviews : ", reviews);
  return responsePreviewReview(reviews);
};
