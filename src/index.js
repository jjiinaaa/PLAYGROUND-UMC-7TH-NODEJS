import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import { handleUserSignup } from "./controllers/user.controller.js";
import { handleShopAdd } from "./controllers/shop.controller.js";
import {
  handleReviewAdd,
  handleListShopReviews,
  handleListUserReviews,
} from "./controllers/review.controller.js";
import {
  handleMissionAdd,
  handleMissionStatusChange,
  handleListShopMissions,
  handleListUserMissions,
} from "./controllers/mission.controller.js";

dotenv.config();
// .env 파일에 환경 변수를 읽어서 process.env 객체에 추가하여 접근 가능

const app = express();
const port = process.env.PORT;

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(
    {},
    {
      swaggerOptions: {
        url: "/openapi.json",
      },
    }
  )
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true;
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  }; // swagger 옵션
  const outputFile = "/dev/null"; // swagger 파일 출력 금지
  const routes = ["./src/index.js"]; // swagger 문서화할 파일 경로
  const doc = {
    info: {
      title: "UMC 7th Study",
      description: "UMC 7th Node.js test project",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc); // swagger 문서 생성
  res.json(result ? result.data : null);
});

// 미들웨어 : 요청과 응답 사이에 실행되는 함수

// res 객체에 success, error 메소드 등록 후, 공통 응답 로직을 처리하기 위한 미들웨어
// 해당 미들웨어 실행 이후의 다른 Controller, 미들웨어 등에서는 res.success, res.error 사용 가능
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "UNKNOWN", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.use(cors()); // cors 미들웨어 추가
app.use(express.static("public")); // 정적 파일 제공
app.use(express.json()); // json 파싱 미들웨어 추가
app.use(express.urlencoded({ extended: false })); // urlencoded 파싱 미들웨어 추가

app.use(
  cors({
    origin: ["http://localhost:3000", "http://example.com"],
    allowedHeaders: ["x-auth-token"],
  })
);

app.post("/api/v1/users/signup", handleUserSignup);
app.post("/api/v1/shop/addshop", handleShopAdd);
app.post("/api/v1/review/addreview", handleReviewAdd);
app.post("/api/v1/mission/addmission", handleMissionAdd);
app.post("/api/v1/mission/status", handleMissionStatusChange);

app.get("/api/v1/users/:userId/reviews", handleListUserReviews);
app.get("/api/v1/users/:userId/missions", handleListUserMissions);
app.get("/api/v1/shops/:shopId/reviews", handleListShopReviews);
app.get("/api/v1/shops/:shopId/missions", handleListShopMissions);

// 전역 에러 처리 미들웨어
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "UNKNOWN",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
