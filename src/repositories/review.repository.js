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

export const getShopReviews = async (shopId, cursor) => {
  console.log("getShopReviews shopId : ", shopId, typeof shopId);
  const reviews = await prisma.review.findMany({
    select: {
      userId: true,
      shopId: true,
      content: true,
      rating: true,
    },
    where: {
      shopId,
      id: {
        gt: cursor,
      }, // id가 0보다 큰 경우
    },
    orderBy: {
      id: "desc", // id 기준으로 내림차순 정렬
    },
    take: 5, // 5개의 데이터만 가져오기
  });

  return reviews;
};
