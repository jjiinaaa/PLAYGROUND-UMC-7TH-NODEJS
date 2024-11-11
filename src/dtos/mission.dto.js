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
