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
  console.log("User Signup Request");
  console.log("Request Body:", req.body);

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).success(user);
};
