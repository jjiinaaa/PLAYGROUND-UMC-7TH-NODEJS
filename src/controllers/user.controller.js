/**
 * Controller
 * - 클라이언트의 요청을 받아서, Service Layer 에서 비즈니스 로직을 호출하고 응답을 반환하는 역할
 * - 서비스에서 처리한 데이터를 클라이언트에게 응답으로 반환
 */

import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
// DTO(Data Transfer Object) 파일에서 요청 데이터를 한 번 변환하기 위해 bodyToUser 함수를 불러옴
import { userSignUp, userChangeInfo } from "../services/user.service.js";

export const handleUserSignup = async (req, res, next) => {
  /*
    #swagger.ignore = false
    #swagger.tags = ['user-controller']
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              password: { type: "string" },
              email: { type: "string" },
              name: { type: "string" },
              gender: { type: "string" },
              birth: { type: "string", format: "date" },
              address: { type: "string" },
              detailAddress: { type: "string" },
              phoneNumber: { type: "string" },
              point: { type: "number" },
              preferences: { type: "array", items: { type: "number" } }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  password: { type: "string", example: "qwe123" },
                  email: { type: "string", example: "example@example.com" },
                  name: { type: "string", example: "홍길동" },
                  gender: { type: "string", example: "남성" },
                  birth: { type: "string", format: "date", example: "1990-01-01" },
                  address: { type: "string", example: "서울특별시 강남구" },
                  detailAddress: { type: "string", example: "역삼동" },
                  phoneNumber: { type: "string", example: "01012345678" },
                  point: { type: "number", example: 0 },
                  preferences: { type: "array", items: { type: "number", example: 0 } }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string", example: "이미 가입된 이메일입니다." },
                  data: { 
                    type: "object", 
                    example: {
                      password: "qwe123",
                      email: "example@example.com",
                      name: "홍길동",
                      gender: "남성",
                      birth: "1990-01-01",
                      address: "서울특별시 강남구",
                      detailAddress: "역삼동",
                      phoneNumber: "01012345678",
                      point: 0,
                      preferences: [1]
                  } }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).success(user);
};

export const handleUserChangeInfo = async (req, res, next) => {
  console.log(req.params.userId);
  // 숫자로 변환 :
  const user = await userChangeInfo(
    parseInt(req.params.userId),
    bodyToUser(req.body)
  );
  res.status(StatusCodes.OK).success(user);
};
