import { responseFormReview } from "../dtos/review.dto.js";
import { addReview, getReview } from "../repositories/review.repository.js";

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
