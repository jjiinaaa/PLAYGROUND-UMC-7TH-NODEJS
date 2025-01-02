import { prisma } from "../db.config.js";
import {
  mission,
  userMission,
  missionDto,
  userMissionDto,
} from "../entities/mission.entity.js";
import { shop } from "../entities/shop.entity.js";
export const addMission = async (
  mission: missionDto
): Promise<number | null> => {
  const checkShop: shop | null = await prisma.shop.findFirst({
    where: { id: mission.shopId },
  });

  if (!checkShop) null;

  const created: any = await prisma.mission
    .create({ data: mission })
    .catch((err) => {
      console.log(err);
    });
  return created.id;
};

export const getmissionDeadline = async (
  deadline: Date
): Promise<string | null> => {
  const deadlineTime = deadline;
  const currentTime = new Date();

  try {
    const nowTime: number = currentTime.getTime(); // 현재 시간을 가져옴
    const endTime: number = deadlineTime.getTime(); // 미션의 마감 시간을 가져옴
    if (endTime < nowTime) return null;

    if (nowTime < endTime) {
      let sec: number = (endTime - nowTime) / 1000;
      let days: number = sec / 60 / 60 / 24;
      sec = sec - days * 60 * 60 * 24;
      let hour: number = sec / 60 / 60;
      sec = sec - hour * 60 * 60;
      let min: number = sec / 60;
      sec = sec - min * 60;
      return `${days}일 ${hour}시간 ${min}분 ${sec}초 남았습니다.`;
    }
  } catch (error) {
    throw new Error(`${error}, 요청 파라미터를 확인해주세요.`);
  }
  return null;
};

export const getMission = async (missionId: number): Promise<mission> => {
  const mission: mission = await prisma.mission.findFirstOrThrow({
    where: { id: missionId },
  });
  return mission;
};

export const addUserMission = async (userMission: userMissionDto) => {
  const { userId, missionId } = userMission;

  const checkUserMission: userMission | null =
    await prisma.userMission.findFirst({
      where: { userId, missionId },
    });

  if (checkUserMission) return null;

  const created = await prisma.userMission.create({ data: userMission });
  return created.id;
};

export const getUserMissionDeadline = async (
  userMissionId: number
): Promise<string | null> => {
  const userMissionCreatedAt: any = await prisma.userMission.findFirst({
    where: { id: userMissionId },
    select: { createdAt: true },
  });

  const getMissionId: any = await prisma.userMission.findFirst({
    where: { id: userMissionId },
    select: { missionId: true },
  });

  const userMissionDeadline: any = await prisma.mission.findFirst({
    where: { id: getMissionId.missionId },
  });

  const createdAt: number = new Date(userMissionCreatedAt.createdAt).getTime();
  const deadline: number = new Date(userMissionDeadline.deadline).getTime();

  if (deadline < createdAt) return null;

  if (createdAt < deadline) {
    let sec: number = (deadline - createdAt) / 1000;
    let days: number = sec / 60 / 60 / 24;
    sec = sec - days * 60 * 60 * 24;
    let hour: number = sec / 60 / 60;
    sec = sec - hour * 60 * 60;
    let min: number = sec / 60;
    sec = sec - min * 60;
    return `${days}일 ${hour}시간 ${min}분 ${sec}초 남았습니다.`;
  }
  return null;
};

export const getUserMission = async (
  userMissionId: number
): Promise<userMission> => {
  await prisma.userMission.update({
    where: { id: userMissionId },
    data: { status: 1 },
  });

  const userMission: userMission | null = await prisma.userMission.findFirst({
    where: { id: userMissionId },
  });

  if (!userMission) throw new Error("해당 미션을 찾을 수 없습니다.");

  return userMission;
};

export const getShopMissions = async (
  shopId: number,
  cursor: number
): Promise<mission[]> => {
  const missions: any = await prisma.mission.findMany({
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

export const getUserMissions = async (
  userId: number,
  cursor: number
): Promise<userMission[]> => {
  const missions: any = await prisma.userMission.findMany({
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
