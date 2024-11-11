export const bodyToUser = (body) => {
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
  try {
    console.log("body received in bodyToUser:", body); // body 전체 출력
    console.log("body.birth:", birth); // birth 필드만 출력

    return {
      password, // password 필드가 없으면 빈 문자열로 설정
      email,
      name,
      gender,
      birth, // 유효하지 않으면 빈 문자열로 설정
      address,
      detailAddress,
      phoneNumber,
      point,
      preferences,
    };
  } catch (error) {
    console.error("Error in bodyToUser:", error); // 에러가 발생하면 출력
    throw error; // 에러를 다시 던져서 호출한 함수에서도 처리하도록 함
  }
};

export const responseFromUser = ({ user, preferences }) => {
  console.log("user:", user); // preferences 전체 출력
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
    preferFoods,
    point,
  };
};
