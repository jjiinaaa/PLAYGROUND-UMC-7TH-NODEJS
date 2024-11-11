import { pool } from "../db.config.js";

export const addMission = async (mission) => {
  const { shopId, point, deadline, missionText } = mission;
  const connection = await pool.getConnection();

  try {
    const [confirm] = await connection.query(
      `SELECT EXISTS (SELECT 1 FROM shop WHERE id = ?) as isExistShop;`,
      shopId
    );
    if (!confirm[0].isExistShop) {
      console.log("해당 상점이 존재하지 않습니다.");
      return null;
    }

    const [result] = await connection.query(
      `INSERT INTO mission (shopId, point, deadline, missionText) VALUES (?, ?, ?, ?);`,
      [shopId, point, deadline, missionText]
    );

    return result.insertId;
  } catch (error) {
    throw new Error(
      `(${error}) 오류가 발생했습니다. 요청 파라미터를 확인해주세요.`
    );
  } finally {
    connection.release();
  }
};

export const getmissionDeadline = async (deadline) => {
  const deadlineTime = new Date(deadline);
  const currentTime = new Date();
  console.log("deadlind: ", deadlineTime, "\n", "currentTime: ", currentTime);

  try {
    const nowTime = currentTime.getTime(); // 현재 시간을 가져옴
    const endTime = deadlineTime.getTime(); // 미션의 마감 시간을 가져옴
    if (endTime < nowTime) {
      console.log("기한이 지났습니다.");
      return null;
    }

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
    throw new Error(
      `(${error}) deadline 오류가 발생했습니다. 요청 파라미터를 확인해주세요.`
    );
  }
};

export const getMission = async (missionId) => {
  const connection = await pool.getConnection();

  try {
    const [mission] = await connection.query(
      `SELECT * FROM mission WHERE id = ?;`,
      missionId
    );
    if (mission.length === 0) {
      console.log("해당 미션을 찾을 수 없습니다.");
      return null;
    }
    return mission;
  } catch (error) {
    throw new Error(
      `(${error}) 오류가 발생했습니다. 요청 파라미터를 확인해주세요.`
    );
  } finally {
    connection.release();
  }
};
