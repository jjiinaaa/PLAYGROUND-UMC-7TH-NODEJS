import {
  responseFormMission,
  responseFormUserMission,
  responsePreviewMission,
} from "../dtos/mission.dto.js";
import {
  mission,
  missionDto,
  responseFromMissionDto,
  userMissionDto,
  responseFromUserMissionDto,
  userMission,
} from "../entities/mission.entity.js";
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

export const missionAdd = async (
  mission: missionDto
): Promise<responseFromMissionDto> => {
  const { shopId, point, deadline, missionText } = mission;
  const joinMissionId: number | null = await addMission({
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
  const missionDeadline: string | null = await getmissionDeadline(deadline);

  if (missionDeadline === null) {
    throw new DuplicateUserEmailError(
      "미션 종료 기한을 잘못 입력하였습니다.",
      missionDeadline
    );
  }
  const missionData: mission = await getMission(joinMissionId);

  if (joinMissionId === null) {
    throw new DuplicateUserEmailError(
      "해당 상점이 존재하지 않습니다.",
      mission
    );
  }
  return responseFormMission(missionData, missionDeadline);
};

export const missionStatusChange = async (
  userMission: userMissionDto
): Promise<responseFromUserMissionDto> => {
  const { userId, missionId } = userMission;
  const joinUserMissionId: number | null = await addUserMission({
    userId,
    missionId,
  });

  if (joinUserMissionId === null) {
    throw new DuplicateUserEmailError("이미 참여한 미션입니다.", userMission);
  }

  const userMissionData: userMission = await getUserMission(joinUserMissionId);

  const missionData: mission = await getMission(missionId);

  const userMissionDeadline: string | null = await getUserMissionDeadline(
    joinUserMissionId
  );

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

export const shopMissionListGet = async (
  shopId: number,
  cursor: number
): Promise<any> => {
  const missions: mission[] = await getShopMissions(shopId, cursor);
  return responsePreviewMission(missions);
};

export const userMissionListGet = async (
  userId: number,
  cursor: number
): Promise<any> => {
  const missions: userMission[] = await getUserMissions(userId, cursor);
  return responsePreviewMission(missions);
};
