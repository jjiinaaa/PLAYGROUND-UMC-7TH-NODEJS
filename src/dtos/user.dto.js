export const bodyToUser = (body) => {
  try {
    console.log("body received in bodyToUser:", body); // body 전체 출력
    console.log("body.birth:", body.birth); // birth 필드만 출력

    const birth = body.birth ? new Date(body.birth) : null;
    console.log("Parsed birth date:", birth); // Date 객체가 생성되는지 확인

    return {
      password: body.password || "", // password 필드가 없으면 빈 문자열로 설정
      email: body.email || "",
      name: body.name || "",
      gender: body.gender || "",
      birth: birth || "", // 유효하지 않으면 빈 문자열로 설정
      address: body.address || "",
      detailAddress: body.detailAddress || "",
      phoneNumber: body.phoneNumber || "",
      preferences: body.preferences || 1,
      point: body.point,
    };
  } catch (error) {
    console.error("Error in bodyToUser:", error); // 에러가 발생하면 출력
    throw error; // 에러를 다시 던져서 호출한 함수에서도 처리하도록 함
  }
};

export const responseFromUser = ({ user, preferences }) => {
  return {
    password: user[0].password,
    email: user[0].email,
    name: user[0].name,
    gender: user[0].gender,
    birth: user[0].birth,
    address: user[0].address,
    detailAddress: user[0].detailAddress,
    phoneNumber: user[0].phoneNumber,
    preferences: preferences,
    point: user[0].point,
  };
};
