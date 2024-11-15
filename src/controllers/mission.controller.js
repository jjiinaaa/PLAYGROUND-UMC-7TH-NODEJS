import { StatusCodes } from "http-status-codes";
import { bodyToMission, bodyToUserMission } from "../dtos/mission.dto.js";
import {
  missionAdd,
  missionStatusChange,
  shopMissionListGet,
  userMissionListGet,
} from "../services/mission.service.js";

export const handleMissionAdd = async (req, res, next) => {
  const mission = await missionAdd(bodyToMission(req.body));
  res.status(StatusCodes.OK).success(mission);
  // next - 미들웨어에 쓰이는 함수에 넣어주는 값 / 미들웨어 : 요청과 응답 사이에 실행되는 함수
};

export const handleMissionStatusChange = async (req, res, next) => {
  const userMission = await missionStatusChange(bodyToUserMission(req.body));
  res.status(StatusCodes.OK).success(userMission);
};

export const handleListShopMissions = async (req, res, next) => {
  const { shopId } = req.params;
  const missions = await shopMissionListGet(
    parseInt(shopId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(missions);
};

export const handleListUserMissions = async (req, res, next) => {
  const { userId } = req.params;
  const missions = await userMissionListGet(
    parseInt(userId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(missions);
};
