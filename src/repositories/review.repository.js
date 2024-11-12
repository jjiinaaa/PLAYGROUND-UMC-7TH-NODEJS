import { prisma } from "../db.config.js";

export const addReview = async (review) => {
  const checkShop = await prisma.shop.findFirst({
    where: {
      id: review.shopId,
    },
  });
  if (!checkShop) {
    console.log("해당 상점이 존재하지 않습니다.");
    return null;
  }
  const created = await prisma.review.create({
    data: review,
  });
  return created.id;
};

export const getReview = async (reviewId) => {
  const review = await prisma.review.findFirstOrThrow({
    where: {
      id: reviewId,
    },
  });

  return review;
};
