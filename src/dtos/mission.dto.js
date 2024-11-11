export const bodyToMission = (body) => {
  const { shopId, point, deadline, missionText } = body;
  return { shopId, point, deadline, missionText };
};

export const responseFormMission = (mission, deadlineData) => {
  const { shopId, point, deadline, missionText } = mission[0];
  return {
    shopId,
    point,
    deadlineData,
    missionText,
  };
};

export const bodyToUserMission = (body) => {
  const { userId, missionId } = body;
  return { userId, missionId };
};

export const responseFormUserMission = (userMission, missionData, deadline) => {
  const { userId, missionId, status } = userMission[0];
  const { missionText, point } = missionData[0];
  return {
    userId,
    missionId,
    status,
    missionText,
    point,
    deadline,
  };
};
