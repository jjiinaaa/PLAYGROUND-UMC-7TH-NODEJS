import {
  responseFormMission,
  responseFormUserMission,
} from "../dtos/mission.dto.js";
import {
  addMission,
  getMission,
  getmissionDeadline,
  addUserMission,
  getUserMission,
  getUserMissionDeadline,
} from "../repositories/mission.repository.js";

export const missionAdd = async (mission) => {
  const { shopId, point, deadline, missionText } = mission;
  const joinMissionId = await addMission({
    shopId,
    point,
    deadline,
    missionText,
  });
  const missionDeadline = await getmissionDeadline(deadline);
  const missionData = await getMission(joinMissionId);
  return responseFormMission(missionData, missionDeadline);
};

export const missionStatusChange = async (userMission) => {
  const { userId, missionId } = userMission;
  const joinUserMissionId = await addUserMission({
    userId,
    missionId,
  });
  const userMissionData = await getUserMission(joinUserMissionId);
  const missionData = await getMission(missionId);
  console.log("missionData : ", missionData);
  const userMissionDeadline = await getUserMissionDeadline(joinUserMissionId);
  console.log("userMissionDeadline : ", userMissionDeadline);
  return responseFormUserMission(
    userMissionData,
    missionData,
    userMissionDeadline
  );
};
