import { prisma } from "../db.config.js";
import { reviewDto, review } from "../entities/review.entity.js";
import { shop } from "../entities/shop.entity.js";

export const addReview = async (review: reviewDto): Promise<number | null> => {
  const checkShop: shop | null = await prisma.shop.findFirst({
    where: {
      id: review.shopId,
    },
  });
  if (!checkShop) {
    return null;
  }
  const created: review = await prisma.review.create({
    data: review,
  });
  return created.id;
};

export const getReview = async (reviewId: number): Promise<review> => {
  const review: review = await prisma.review.findFirstOrThrow({
    where: {
      id: reviewId,
    },
  });

  return review;
};

export const getShopReviews = async (
  shopId: number,
  cursor: number
): Promise<review[]> => {
  const reviews: review[] = await prisma.review.findMany({
    select: {
      id: true,
      userId: true,
      shopId: true,
      content: true,
      rating: true,
      createdAt: true,
      updatedAt: true,
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

export const getUserReviews = async (
  userId: number,
  cursor: number
): Promise<review[]> => {
  const reviews: review[] = await prisma.review.findMany({
    select: {
      id: true,
      userId: true,
      shopId: true,
      content: true,
      rating: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      userId,
      id: {
        gt: cursor,
      },
    },
    orderBy: {
      id: "desc",
    },
    take: 5,
  });
  return reviews;
};
