import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

// mission
export const userSignUp = async (data) => {
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
  } = data;
  // userSignUp 함수는 회원가입을 처리하는 함수
  // 여러 repositoty 함수들을 호출하여 DB에 데이터를 저장하고 조회

  const joinUserId = await addUser({
    // addUser 함수를 통해 User 객체를 DB에 저장
    password,
    email,
    name,
    gender,
    birth,
    address,
    detailAddress,
    phoneNumber,
    point,
  });

  if (joinUserId === null) {
    throw new Error("이미 가입된 이메일입니다."); // 이미 가입된 이메일일 경우 에러 발생
  }

  for (const preference of preferences) {
    // const preference of data.preferences로 data.preferences에 있는 선호 음식 정보를 하나씩 가져와 setPreference 함수를 실행
    await setPreference(joinUserId, preference); // setPreference 함수를 통해 선호 음식 정보를 DB에 저장
  }
  ``;

  const user = await getUser(joinUserId); // getUser 함수를 통해 가입된 User 정보를 조회
  const preferencesData = await getUserPreferencesByUserId(joinUserId); // getUserPreferencesByUserId 함수를 통해 가입된 User의 선호 음식 정보를 조회

  return responseFromUser({ user, preferences: preferencesData });
};
