import { pool } from "../db.config.js";

// Shop 데이터 삽입
export const addShop = async (shop) => {
  const connection = await pool.getConnection();

  try {
    const [result] = await pool.query(
      `INSERT INTO shop (areaId, name, address, rating) VALUES (?, ?, ?, ?);`,
      [shop.areaId, shop.name, shop.address, shop.rating]
    );

    return result.insertId;
  } catch (error) {
    throw new Error(
      `(${error}) 오류가 발생했습니다. 요청 파라미터를 확인해주세요.`
    );
  } finally {
    connection.release(); // release() : 커넥션 풀에 커넥션 반환
  }
};

// Shop 정보 얻기
export const getShop = async (shopId) => {
  const connection = await pool.getConnection();

  try {
    // shopId에 해당하는 shop 정보를 조회
    const [shop] = await pool.query(`SELECT * FROM shop WHERE id = ?;`, [
      shopId,
    ]);
    console.log();
    if (shop.length === 0) {
      return null;
    }

    return shop;
  } catch (error) {
    throw new Error(
      `(${error}) 오류가 발생했습니다. 요청 파라미터를 확인해주세요.`
    );
  } finally {
    connection.release(); // release() : 커넥션 풀에 커넥션 반환
  }
};
