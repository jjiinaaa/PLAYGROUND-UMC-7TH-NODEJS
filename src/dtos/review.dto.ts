import { review, reviewDto } from "../entities/review.entity.js";

export const bodyToReview = (body: reviewDto): reviewDto => {
  const { userId, shopId, content, rating } = body;
  return { userId, shopId, content, rating };
};

export const responseFormReview = (review: reviewDto): reviewDto => {
  const { userId, shopId, content, rating } = review;
  return {
    userId,
    shopId,
    content,
    rating,
  };
};

export const responsePreviewReview = (data: review[]): any => {
  return {
    reviewData: data,
    cursorId: data.length ? data[data.length - 1].id : null,
  };
};
