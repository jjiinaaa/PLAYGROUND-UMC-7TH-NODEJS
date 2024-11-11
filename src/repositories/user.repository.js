import { prisma } from "../db.config.js";

// User 데이터를 DB에 저장하는 함수
export const addUser = async (data) => {
  console.log("addUser data:", data);
  const emailCheck = await prisma.user.findFirst({
    where: { email: data.email },
  }); // email이 존재하는지 확인
  console.log("emailCheck:", emailCheck);
  if (emailCheck) {
    return null; // User 데이터가 이미 존재할 경우 null 반환
  }
  const created = await prisma.user.create({ data: data }); // User 데이터를 저장하는 쿼리
  console.log("created:", created);
  return created.id; // User 데이터를 저장하고 생성된 userId 반환
};

// User 데이터를 조회하는 함수 (사용자 정보 조회)
export const getUser = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  // userId에 해당하는 User 정보를 조회하는 쿼리
  return user;
};

// User 선호 음식 정보를 저장하는 함수
export const setPreference = async (userId, preferFoodId) => {
  console.log("setPreference userId:", userId, "preferFoodId:", preferFoodId);
  await prisma.userPreferFood.create({
    data: {
      userId,
      preferFoodId,
    },
  }); // User 선호 음식 정보를 저장하는 쿼리
  console.log("setPreference done");
};

export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.userPreferFood.findMany({
    select: {
      id: true,
      userId: true,
      preferFoodId: true,
      preferFood: true,
    }, // id, userId, preferFoodId, preferFood 정보만 조회
    where: {
      userId: userId,
    }, // userId에 해당하는 정보만 조회
    orderBy: { preferFoodId: "asc" },
  }); // User 선호 음식 정보를 조회하는 쿼리
  return preferences;
};
