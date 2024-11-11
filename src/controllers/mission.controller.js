import { StatusCodes } from "http-status-codes";
import { bodyToMission, bodyToUserMission } from "../dtos/mission.dto.js";
import {
  missionAdd,
  missionStatusChange,
} from "../services/mission.service.js";

export const handleMissionAdd = async (req, res, next) => {
  console.log("Request Body:", req.body);
  const mission = await missionAdd(bodyToMission(req.body));
  res.status(StatusCodes.OK).json({ result: mission });
  // next - 미들웨어에 쓰이는 함수에 넣어주는 값 / 미들웨어 : 요청과 응답 사이에 실행되는 함수
};

export const handleMissionStatusChange = async (req, res, next) => {
  console.log("Mission Status Change Request");
  console.log("Request Body:", req.body);
  const userMission = await missionStatusChange(bodyToUserMission(req.body));
  res.status(StatusCodes.OK).json({ result: userMission });
};
