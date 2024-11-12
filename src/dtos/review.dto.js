export const bodyToReview = (body) => {
  const { userId, shopId, content, rating } = body;
  return { userId, shopId, content, rating };
};

export const responseFormReview = (review) => {
  const { userId, shopId, content, rating } = review;
  return {
    userId,
    shopId,
    content,
    rating,
  };
};
