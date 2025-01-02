import {
  user,
  userPreferFood,
  preferFood,
  UserDto,
} from "../entities/user.entity.js";

export const bodyToUser = (body: any): UserDto => {
  const {
    password,
    email,
    name,
    gender,
    birth,
    address,
    detailAddress,
    phoneNumber,
    point,
    preferences,
  } = body;
  return {
    password,
    email,
    name,
    gender,
    birth,
    address,
    detailAddress,
    phoneNumber,
    point,
    preferences,
  };
};

export const responseFromUser = ({
  user,
  preferences,
}: {
  user: user;
  preferences: (userPreferFood & { preferFood: preferFood })[]; // userPreferFood에 preferFood를 join한 결과
}): any => {
  const preferFoods = preferences.map(
    (preference) => preference.preferFood.name
  );
  const {
    password,
    email,
    name,
    gender,
    birth,
    address,
    detailAddress,
    phoneNumber,
    point,
  } = user;
  return {
    password,
    email,
    name,
    gender,
    birth,
    address,
    detailAddress,
    phoneNumber,
    point,
    preferences: preferFoods,
  };
};
