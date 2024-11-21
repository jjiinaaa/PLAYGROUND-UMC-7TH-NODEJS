import { prisma } from "../db.config.js";

export const addMission = async (mission) => {
  const checkShop = await prisma.shop.findFirst({
    where: { id: mission.shopId },
  });

  if (!checkShop) null;

  const created = await prisma.mission.create({ data: mission });
  return created.id;
};

export const getmissionDeadline = async (deadline) => {
  const deadlineTime = new Date(deadline);
  const currentTime = new Date();

  try {
    const nowTime = currentTime.getTime(); // 현재 시간을 가져옴
    const endTime = deadlineTime.getTime(); // 미션의 마감 시간을 가져옴
    if (endTime < nowTime) return null;

    if (nowTime < endTime) {
      let sec = parseInt(endTime - nowTime) / 1000;
      let days = parseInt(sec / 60 / 60 / 24);
      sec = sec - days * 60 * 60 * 24;
      let hour = parseInt(sec / 60 / 60);
      sec = sec - hour * 60 * 60;
      let min = parseInt(sec / 60);
      sec = parseInt(sec - min * 60);
      return `${days}일 ${hour}시간 ${min}분 ${sec}초 남았습니다.`;
    }
  } catch (error) {
    throw new Error(`${error}, 요청 파라미터를 확인해주세요.`);
  }
};

export const getMission = async (missionId) => {
  const mission = await prisma.mission.findFirstOrThrow({
    where: { id: missionId },
  });
  return mission;
};

export const addUserMission = async (userMission) => {
  const { userId, missionId, status } = userMission;

  const checkUserMission = await prisma.userMission.findFirst({
    where: { userId, missionId },
  });

  if (checkUserMission) return null;

  const created = await prisma.userMission.create({ data: userMission });
  return created.id;
};

export const getUserMissionDeadline = async (userMissionId) => {
  const userMissionCreatedAt = await prisma.userMission.findFirst({
    where: { id: userMissionId },
    select: { createdAt: true },
  });

  const getMissionId = await prisma.userMission.findFirst({
    where: { id: userMissionId },
    select: { missionId: true },
  });

  const userMissionDeadline = await prisma.mission.findFirst({
    where: { id: getMissionId.missionId },
  });

  const createdAt = new Date(userMissionCreatedAt.createdAt).getTime();
  const deadline = new Date(userMissionDeadline.deadline).getTime();

  if (deadline < createdAt) return null;

  if (createdAt < deadline) {
    let sec = parseInt(deadline - createdAt) / 1000;
    let days = parseInt(sec / 60 / 60 / 24);
    sec = sec - days * 60 * 60 * 24;
    let hour = parseInt(sec / 60 / 60);
    sec = sec - hour * 60 * 60;
    let min = parseInt(sec / 60);
    sec = parseInt(sec - min * 60);
    return `${days}일 ${hour}시간 ${min}분 ${sec}초 남았습니다.`;
  }
};

export const getUserMission = async (userMissionId) => {
  await prisma.userMission.update({
    where: { id: userMissionId },
    data: { status: 1 },
  });

  const userMission = await prisma.userMission.findFirst({
    where: { id: userMissionId },
  });

  return userMission;
};

export const getShopMissions = async (shopId, cursor) => {
  const missions = await prisma.mission.findMany({
    select: {
      shopId: true,
      point: true,
      deadline: true,
      missionText: true,
    },
    where: {
      shopId,
      id: { gt: cursor },
    },
    orderBy: { id: "desc" },
    take: 5,
  });

  return missions;
};

export const getUserMissions = async (userId, cursor) => {
  const missions = await prisma.userMission.findMany({
    select: {
      userId: true,
      missionId: true,
      status: true,
    },
    where: {
      userId,
      id: {
        gt: cursor,
      },
    },
    orderBy: { id: "desc" },
    take: 5,
  });
  return missions;
};
