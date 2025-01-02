export { mission, userMission } from "@prisma/client";

export interface missionDto {
  shopId: number;
  point: number;
  deadline: Date;
  missionText: string;
}

export interface responseFromMissionDto extends missionDto {
  deadlineData: string;
}

export interface userMissionDto {
  userId: number;
  missionId: number;
  status?: number;
}

export interface responseFromUserMissionDto extends userMissionDto {
  status: number;
  missionText: string;
  point: number;
  deadline: string;
}
