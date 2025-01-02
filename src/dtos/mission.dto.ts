import {
  mission,
  userMission,
  missionDto,
  responseFromMissionDto,
  userMissionDto,
  responseFromUserMissionDto,
} from "../entities/mission.entity.js";

export const bodyToMission = (body: missionDto): missionDto => {
  const { shopId, point, missionText } = body;
  const deadline = new Date(body.deadline);

  return { shopId, point, deadline, missionText };
};

export const responseFormMission = (
  mission: mission,
  deadlineData: string
): responseFromMissionDto => {
  const { shopId, point, deadline, missionText } = mission;
  return {
    shopId,
    point,
    deadline,
    deadlineData,
    missionText,
  };
};

export const bodyToUserMission = (body: userMissionDto): userMissionDto => {
  const { userId, missionId } = body;
  return { userId, missionId };
};

export const responseFormUserMission = (
  userMission: userMission,
  missionData: mission,
  deadline: string
): responseFromUserMissionDto => {
  const { userId, missionId, status } = userMission;
  const { missionText, point } = missionData;
  return {
    userId,
    missionId,
    status,
    missionText,
    point,
    deadline,
  };
};

export const responsePreviewMission = (data: any): any => {
  return {
    missionData: data,
    cursorId: data.length ? data[data.length - 1].id : null,
  };
};
