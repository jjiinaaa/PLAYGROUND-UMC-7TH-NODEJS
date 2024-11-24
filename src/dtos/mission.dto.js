export const bodyToMission = (body) => {
  const { shopId, point, missionText } = body;
  const deadline = new Date(body.deadline);

  return { shopId, point, deadline, missionText };
};

export const responseFormMission = (mission, deadlineData) => {
  const { shopId, point, deadline, missionText } = mission;
  return {
    shopId,
    point,
    deadline,
    deadlineData,
    missionText,
  };
};

export const bodyToUserMission = (body) => {
  const { userId, missionId } = body;
  return { userId, missionId };
};

export const responseFormUserMission = (userMission, missionData, deadline) => {
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

export const responsePreviewMission = (data) => {
  return {
    missionData: data,
    cursorId: data.length ? data[data.length - 1].id : null,
  };
};
