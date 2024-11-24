import StatusCodes from "http-status-codes";
import { DuplicateUserEmailError } from "../errors.js";
import { bodyToShop } from "../dtos/shop.dto.js";
import { shopAdd } from "../services/shop.service.js";

// 지역 없으면 에러 메세지 출력 필요. 현재는 unknown으로 에러 메세지 출력
export const handleShopAdd = async (req, res, next) => {
  /*
    #swagger.ignore = false
    #swagger.tags = ['shop-controller']
    #swagger.summary = '가게 등록 API'; 
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              areaId: { type: "number" },
              name: { type: "string" },
              address: { type: "string" },
              rating: { type: "number"},
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "가게 등록 성공 응답",
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
                  areaId: { type: "number" },
                  name: { type: "string" },
                  address: { type: "string" },
                  rating: { type: "number" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "상점 등록 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U400" },
                  reason: { type: "string" },
                  data: { type: "object", example: {
                    areaId: { type: "number" },
                    name: { type: "string" },
                    address: { type: "string" },
                    rating: { type: "number" }
                  }}
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  const shop = await shopAdd(bodyToShop(req.body));
  if (shop === null) {
    throw new DuplicateUserEmailError("해당 상점이 존재하지 않습니다.", shop);
  }

  res.status(StatusCodes.OK).success(shop);
  // next - 미들웨어에 쓰이는 함수에 넣어주는 값 / 미들웨어 : 요청과 응답 사이에 실행되는 함수
};
