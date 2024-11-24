import {
  responseFormMission,
  responseFormUserMission,
  responsePreviewMission,
} from "../dtos/mission.dto.js";
import { DuplicateUserEmailError } from "../errors.js";
import {
  addMission,
  getMission,
  getmissionDeadline,
  addUserMission,
  getUserMission,
  getUserMissionDeadline,
  getShopMissions,
  getUserMissions,
} from "../repositories/mission.repository.js";

export const missionAdd = async (mission) => {
  const { shopId, point, deadline, missionText } = mission;
  console.log(mission);
  const joinMissionId = await addMission({
    shopId,
    point,
    deadline,
    missionText,
  });
  if (joinMissionId === null) {
    throw new DuplicateUserEmailError(
      "해당 상점이 존재하지 않습니다.",
      mission
    );
  }
  console.log(joinMissionId);
  const missionDeadline = await getmissionDeadline(deadline);

  if (missionDeadline === null) {
    throw new DuplicateUserEmailError(
      "미션 종료 기한을 잘못 입력하였습니다.",
      missionDeadline
    );
  }
  const missionData = await getMission(joinMissionId);

  if (joinMissionId === null) {
    throw new DuplicateUserEmailError(
      "해당 상점이 존재하지 않습니다.",
      mission
    );
  }
  return responseFormMission(missionData, missionDeadline);
};

export const missionStatusChange = async (userMission) => {
  const { userId, missionId } = userMission;
  const joinUserMissionId = await addUserMission({
    userId,
    missionId,
  });

  if (joinUserMissionId === null) {
    throw new DuplicateUserEmailError("이미 참여한 미션입니다.", userMission);
  }

  const userMissionData = await getUserMission(joinUserMissionId);

  const missionData = await getMission(missionId);

  const userMissionDeadline = await getUserMissionDeadline(joinUserMissionId);

  if (userMissionDeadline === null) {
    throw new DuplicateUserEmailError(
      "기한이 지났습니다.",
      userMissionDeadline
    );
  }

  return responseFormUserMission(
    userMissionData,
    missionData,
    userMissionDeadline
  );
};

export const shopMissionListGet = async (shopId, cursor) => {
  const missions = await getShopMissions(shopId, cursor);
  return responsePreviewMission(missions);
};

export const userMissionListGet = async (userId, cursor) => {
  const missions = await getUserMissions(userId, cursor);
  return responsePreviewMission(missions);
};
