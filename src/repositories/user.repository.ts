import { prisma } from "../db.config.js";
import {
  UserDto,
  userPreferFood,
  preferFood,
} from "../entities/user.entity.js";

// User 데이터를 DB에 저장하는 함수
export const addUser = async (data: any): Promise<number | null> => {
  const emailCheck = await prisma.user.findFirst({
    where: { email: data.email },
  }); // email이 존재하는지 확인
  if (emailCheck) {
    return null; // User 데이터가 이미 존재할 경우 null 반환
  }
  const created = await prisma.user.create({ data: data }); // User 데이터를 저장하는 쿼리
  return created.id; // User 데이터를 저장하고 생성된 userId 반환
};

// User 데이터를 조회하는 함수 (사용자 정보 조회)
export const getUser = async (userId: number): Promise<any> => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  // userId에 해당하는 User 정보를 조회하는 쿼리
  return user;
};

// User 선호 음식 정보를 저장하는 함수
export const setPreference = async (
  userId: number,
  preferFoodId: number
): Promise<void> => {
  await prisma.userPreferFood.create({
    data: {
      userId,
      preferFoodId,
    },
  }); // User 선호 음식 정보를 저장하는 쿼리
};

export const getUserPreferencesByUserId = async (
  userId: number
): Promise<any> => {
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

export const updateUser = async (
  userId: number,
  data: any
): Promise<number | null> => {
  const emailCheck = await prisma.user.findFirst({
    where: { email: data.email },
  }); // email이 존재하는지 확인
  if (!emailCheck) {
    return null; // User 데이터가 존재하지 않을 경우 null 반환
  }

  const { password, name, gender, birth, address, detailAddress, phoneNumber } =
    data;
  console.log("userId", userId, "data", data);
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      password,
      name,
      gender,
      birth,
      address,
      detailAddress,
      phoneNumber,
    },
  }); // userId에 해당하는 User 정보를 수정하는 쿼리
  return user.id;
};

// User 선호 음식 정보를 저장하는 함수
export const updatePreference = async (
  userId: number,
  preferFoodId: number
): Promise<void> => {
  // select 하고 있으면 업데이트해. 있는거면 하지말고 없으면 만들어.
  // state 값으로 0, 1로 해서 1은 활성화. 0은 비활성화. 0으로 바꾼지 어느정도 시간 지나면 자동 삭제.
  console.log("userId", userId, "preferFoodId", preferFoodId);
  await prisma.userPreferFood
    .update({
      where: { id: userId },
      data: {
        preferFoodId,
      },
    })
    .catch((error) => {
      console.log("error", error);
    }); // User 선호 음식 정보를 저장하는 쿼리
};
