/**
 * Controller
 * - 클라이언트의 요청을 받아서, Service Layer 에서 비즈니스 로직을 호출하고 응답을 반환하는 역할
 * - 서비스에서 처리한 데이터를 클라이언트에게 응답으로 반환
 */

import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
// DTO(Data Transfer Object) 파일에서 요청 데이터를 한 번 변환하기 위해 bodyToUser 함수를 불러옴
import { userSignUp } from "../services/user.service.js";

export const handleUserSignup = async (req, res, next) => {
  try {
    console.log("회원가입을 요청했습니다.");
    console.log("body:", req.body); // 요청 body 데이터 확인

    const { birth } = req.body; // birth 데이터만 추출
    console.log("birth:", birth); // birth 값 확인

    const user = await userSignUp(bodyToUser(req.body));
    console.log("사용자 반환: ", user);

    res.status(StatusCodes.OK).json({ result: user });
  } catch (error) {
    console.error("회원가입 처리 중 오류:", error);
    next(error);
  }
};
