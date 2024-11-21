import StatusCodes from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import {
  reviewAdd,
  shopReviewListGet,
  userReviewListGet,
} from "../services/review.service.js";

export const handleReviewAdd = async (req, res, next) => {
  /*
    #swagger.ignore = false
    #swagger.tags = ['review-controller']
    #swagger.summary = '리뷰 등록 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "number" },
              shopId: { type: "number" },
              content: { type: "string" },
              rating: { type: "number"},
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "리뷰 등록 성공 응답",
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
                  userId: { type: "number" },
                  shopId: { type: "number" },
                  content: { type: "string" },
                  rating: { type: "number"},
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "리뷰 등록 실패 응답",
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
                  data: { 
                    type: "object", 
                    example: {
                      userId: { type: "number" },
                      shopId: { type: "number" },
                      content: { type: "string" },
                      rating: { type: "number"},
                    }
                  }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  const review = await reviewAdd(bodyToReview(req.body));
  res.status(StatusCodes.OK).success(review);
  // next - 미들웨어에 쓰이는 함수에 넣어주는 값 / 미들웨어 : 요청과 응답 사이에 실행되는 함수
};

export const handleListShopReviews = async (req, res, next) => {
  /*
    #swagger.ignore = false
    #swagger.tags = ['review-controller']
    #swagger.summary = '가게별 리뷰 목록 조회 API';
    #swagger.description = '가게별 리뷰 목록 조회 API입니다.'
    #swagger.responses[200] = {
      description: "가게별 리뷰 목록 조회 성공 응답",
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
                  resultType: { type: "string", example: "SUCCESS" },
                  error: { type: "object", nullable: true, example: null },
                  success: {
                    type: "object",
                    properties: {
                      reviewId: { type: "integer" },
                      content: { type: "string" },
                      rating: { type: "number" },
                      createdAt: { type: "string", format: "date-time" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      decsription: "가게별 리뷰 목록 조회 실패 응답"
    }
  */
  const { shopId } = req.params;
  // shopId 형변환
  const reviews = await shopReviewListGet(
    parseInt(shopId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};

// 사용자 있는지 없는지 검사 후 리뷰 목록 조회 필요
export const handleListUserReviews = async (req, res, next) => {
  /*
    #swagger.ignore = false
    #swagger.tags = ['review-controller']
    #swagger.summary = '사용자별 리뷰 목록 조회 API';
    #swagger.description = '사용자별 리뷰 목록 조회 API입니다.'
    #swagger.responses[200] = {
      description: "사용자별 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                    properties: {
                      reviewData: { type: "array", items:{
                        type: "object",
                        properties: {
                          usetId: { type: "number" },
                          shopId: { type: "number" },
                          content: { type: "string" },
                          rating: { type: "number" },
                        }
                      }}
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "사용자별 리뷰 목록 출력 실패 응답",
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
                  data: { 
                    type: "object", 
                    example: null,
                  }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  const { userId } = req.params;
  const reviews = await userReviewListGet(
    parseInt(userId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};
