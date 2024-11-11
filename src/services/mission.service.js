import { responseFormMission } from "../dtos/mission.dto.js";
import {
  addMission,
  getMission,
  getmissionDeadline,
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
