import { StatusCodes } from "http-status-codes";
import { bodyToMission, bodyToUserMission } from "../dtos/mission.dto.js";
import {
  missionAdd,
  missionStatusChange,
  shopMissionListGet,
  userMissionListGet,
} from "../services/mission.service.js";

export const handleMissionAdd = async (req, res, next) => {
  /*
    #swagger.summary = '미션 등록 API';
    #swagger.tags = ['mission-controller']
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              shopId: { type: "number" },
              point: { type: "number" },
              deadline: { type: "string", format: "date" },
              missionText: { type: "string" },
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "미션 등록 성공 응답",
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
                  shopId: { type: "number", example: 1 },
                  point: { type: "number", example: 1000 },
                  deadline: { type: "string", format: "date", example: "2024-12-25" },
                  deadlineData: { type: "string", example: "0일 9시간 39분 14초 남았습니다." },
                  missionText: { type: "string", example: "미션 내용" },
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 등록 실패 응답",
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
                  reason: { type: "string", example: "미션 등록 실패" },
                  data: { 
                    type: "object", 
                    example: null
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
  const mission = await missionAdd(bodyToMission(req.body));
  res.status(StatusCodes.OK).success(mission);
  // next - 미들웨어에 쓰이는 함수에 넣어주는 값 / 미들웨어 : 요청과 응답 사이에 실행되는 함수
};

export const handleMissionStatusChange = async (req, res, next) => {
  /*
    #swagger.ignore = false
    #swagger.tags = ['mission-controller']
    #swagger.summary = '미션 진행 상태 변경 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "number" },
              missionId: { type: "number" }, 
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "미션 진행 상태 변경 성공 응답",
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
                  userId: { type: "number", example: 1 },
                  missionId: { type: "number", example: 1 }, 
                  status: { type: "number", example: 1 },
                  missionText: { type: "string", example: "미션 내용" },
                  point: { type: "number", example: 1000 },
                  deadline: { type: "string", example: "37일 9시간 39분 14초 남았습니다." },
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 진행 상태 변경 실패 응답",
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
                  reason: { type: "string", example: "이미 참여한 미션입니다." },
                  data: { 
                    type: "object", 
                    example: {
                      userId: 1,
                      missionId: 1, 
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
  const userMission = await missionStatusChange(bodyToUserMission(req.body));
  res.status(StatusCodes.OK).success(userMission);
};

// 가게 있는지에 대한 유효성 검사 필요
export const handleListShopMissions = async (req, res, next) => {
  /*
    #swagger.ignore = false
    #swagger.tags = ['mission-controller']
    #swagger.summary = '가게별 미션 목록 조회 API';
    #sagger.description = '가게별 미션 목록을 조회하는 API입니다.'
    #swagger.responses[200] = {
      description: "가게별 미션 목록 조회 성공 응답",
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
                  missionData: {type: "array", items: {
                    type: "object",
                    properties: {
                      shopId: { type: "number", example: 1 },
                      point: { type: "number", example: 1000 },
                      deadline: { type: "string", format: "date", example: "2024-12-25T00:00:00.000Z" },
                      missionText: { type: "string" },
                    }
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
      description: "가게별 미션 목록 출력 실패 응답",
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
                  reason: { type: "string", example: "가게별 미션 목록 출력 실패" },
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
  const { shopId } = req.params;
  const missions = await shopMissionListGet(
    parseInt(shopId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(missions);
};

// 사용자 있는지에 대한 유효성 검사 필요
export const handleListUserMissions = async (req, res, next) => {
  /*
    #swagger.ignore = false
    #swagger.tags = ['mission-controller']
    #swagger.summary = '사용자별 미션 목록 조회 API';
    #sagger.description = '사용자별 미션 목록을 조회하는 API입니다.'
    #swagger.responses[200] = {
      description: "사용자별 미션 목록 조회 성공 응답",
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
                  missionData: {type: "array", items: {
                    type: "object",
                    properties: {
                      userId: { type: "number", example: 1 },
                      missionId: { type: "number", example: 1 },
                      status: { type: "number", example: 1 },
                    }
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
      description: "사용자별 미션 목록 출력 실패 응답",
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
                  reason: { type: "string", example: "사용자별 미션 목록 출력 실패" },
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
  const missions = await userMissionListGet(
    parseInt(userId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(missions);
};
