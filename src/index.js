import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { handleUserSignup } from "./controllers/user.controller.js";
import { handleShopAdd } from "./controllers/shop.controller.js";
import { handleReviewAdd } from "./controllers/review.controller.js";
import {
  handleMissionAdd,
  handleMissionStatusChange,
} from "./controllers/mission.controller.js";

dotenv.config();
// .env 파일에 환경 변수를 읽어서 process.env 객체에 추가하여 접근 가능

const app = express();
const port = process.env.PORT;

// 미들웨어 : 요청과 응답 사이에 실행되는 함수
app.use(cors()); // cors 미들웨어 추가
app.use(express.static("public")); // 정적 파일 제공
app.use(express.json()); // json 파싱 미들웨어 추가
app.use(express.urlencoded({ extended: false })); // urlencoded 파싱 미들웨어 추가

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignup);
app.post("/api/v1/shop/addshop", handleShopAdd);
app.post("/api/v1/review/addreview", handleReviewAdd);
app.post("/api/v1/mission/addmission", handleMissionAdd);
app.post("/api/v1/mission/status", handleMissionStatusChange);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
