import { pool } from "../db.config.js";

// User 데이터를 DB에 저장하는 함수
export const addUser = async (data) => {
  const connection = await pool.getConnection(); // DB Pool에서 Connection을 가져옴
  const {
    password,
    email,
    name,
    gender,
    birth,
    address,
    detailAddress,
    phoneNumber,
    point,
  } = data;

  try {
    const [confirm] = await connection.query(
      `SELECT EXISTS (SELECT 1 FROM user WHERE email = ?) as isExistEmail;`,
      data.email
    ); // email이 이미 존재하는지 확인하는 쿼리
    // isExistEmail : email이 이미 존재하는지 확인하는 결과를 저장하는 변수

    if (confirm[0].isExistEmail) {
      console.log("이미 존재하는 이메일입니다.");
      return null; // 이미 존재하는 email일 경우 null 반환
    }
    // email이 존재하지 않을 경우 User 데이터를 user 테이블에 저장
    console.log("user 테이블에 데이터 저장");
    const [result] = await pool.query(
      `INSERT INTO user (password, email, name, gender, birth, address, detailAddress, phoneNumber, point) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        password,
        email,
        name,
        gender,
        birth,
        address,
        detailAddress,
        phoneNumber,
        point,
      ]
    ); // User 데이터를 user 테이블에 저장하는 쿼리
    console.log("result:", result);

    return result.insertId; // User 데이터를 저장하고 생성된 userId 반환
  } catch (error) {
    throw new Error(
      `(${error}) 오류가 발생했습니다. 요청 파라미터를 확인해주세요. + `
    ); // 오류 발생 시 에러 반환
  } finally {
    connection.release(); // Connection 반환 // why? : Connection을 Pool에 반환하여 다른 요청에서 사용할 수 있게 함
  }
};

// User 데이터를 조회하는 함수 (사용자 정보 조회)
export const getUser = async (userId) => {
  const connection = await pool.getConnection(); // DB Pool에서 Connection을 가져옴

  try {
    const [user] = await pool.query(`SELECT * FROM user WHERE id = ?`, userId);
    // userId에 해당 조건에 부합하는 User 정보를 조회하는 쿼리
    console.log(user);

    if (user.length === 0) {
      return null; // 조회된 User 정보가 없을 경우 null 반환
    }

    return user; // 조회된 User 정보 반환
  } catch (error) {
    throw new Error(
      `(${error}) 오류가 발생했습니다. 요청 파라미터를 확인해주세요.`
    ); // 오류 발생 시 에러 반환
  } finally {
    connection.release(); // Connection 반환 // why? : Connection을 Pool에 반환하여 다른 요청에서 사용할 수 있게 함
  }
};

// User 선호 음식 정보를 저장하는 함수
export const setPreference = async (userId, preferFoodId) => {
  const connection = await pool.getConnection(); // DB Pool에서 Connection을 가져옴

  try {
    await pool.query(
      `INSERT INTO user_prefer_food (userId, preferFoodId) VALUES (?, ?)`,
      [userId, preferFoodId]
    );
    // userId에 해당 조건에 부합하는 User 정보를 조회하는 쿼리

    return;
  } catch (error) {
    throw new Error(
      `(${error}) 오류가 발생했습니다. 요청 파라미터를 확인해주세요.`
    ); // 오류 발생 시 에러 반환
  } finally {
    connection.release(); // Connection 반환 // why? : Connection을 Pool에 반환하여 다른 요청에서 사용할 수 있게 함
  }
};

export const getUserPreferencesByUserId = async (userId) => {
  const connection = await pool.getConnection(); // DB Pool에서 Connection을 가져옴

  try {
    const [preferences] = await pool.query(
      "SELECT upf.id, upf.preferFoodId, upf.userId, pf.name FROM user_prefer_food upf JOIN prefer_food pf ON upf.preferFoodId = pf.id WHERE upf.userId = ? ORDER BY upf.preferFoodId ASC", // userId에 해당하는 User의 선호 음식 정보를 조회하는 쿼리
      // upf.user_id = ? : upf 테이블의 user_id가 userId와 같은 경우
      // userId에 해당하는 User의 선호 음식 정보를 조회하는 쿼리
      userId
    ); // userId에 해당하는 User의 선호 음식 정보를 조회하는 쿼리

    return preferences;
  } catch (error) {
    throw new Error(
      `(${error}) 오류가 발생했습니다. 요청 파라미터를 확인해주세요.`
    ); // 오류 발생 시 에러 반환
  } finally {
    connection.release(); // Connection 반환 // why? : Connection을 Pool에 반환하여 다른 요청에서 사용할 수 있게 함
  }
};
