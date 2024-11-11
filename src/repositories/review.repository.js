import { pool } from "../db.config.js";

export const addReview = async (review) => {
  const { userId, shopId, content, rating } = review;
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

    const [result] = await pool.query(
      `INSERT INTO review ( userId, shopId, content, rating) VALUES (?, ?, ?, ?);`,
      [userId, shopId, content, rating]
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

export const getReview = async (reviewId) => {
  const connection = await pool.getConnection();

  try {
    const [review] = await pool.query(
      `SELECT * FROM review WHERE id = ?;`,
      reviewId
    );
    if (review.length === 0) {
      return null;
    }

    return review;
  } catch (error) {
    throw new Error(
      `(${error}) 오류가 발생했습니다. 요청 파라미터를 확인해주세요.`
    );
  } finally {
    connection.release();
  }
};
