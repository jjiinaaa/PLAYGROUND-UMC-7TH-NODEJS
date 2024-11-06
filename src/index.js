import dotenv from "dotenv"; // .env 파일로부터 환경 변수를 읽어들여 process.env. 객체로 해당 환경 변수를 사용하기 위한 설정
import cors from "cors"; // CORS(Cross-Origin Resource Sharing) 방식을 허용하기 위한 설정
import express from "express"; // -> ES Module
import { handleUserSignUp } from "./controllers/user.controller.js";

dotenv.config(); // .env 파일을 읽어서 process.env 객체에 넣어줌

const app = express();
const port = process.env.PORT;

app.use(cors()); // CORS 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // requeset의 본문을 JSON으로 해석할 수 있도록 함. (JSON 형식의 요청 body 데이터를 받기 위한 설정)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석. (form 형식의 요청 body 데이터를 받기 위한 설정)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp); // 회원가입 API // 정해진 URL로 POST 요청이 들어오면 handleUserSignup 함수를 실행

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
