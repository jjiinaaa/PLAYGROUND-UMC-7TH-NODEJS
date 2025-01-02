import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as NaverStrategy } from "passport-naver-v2";
import { prisma } from "./db.config.js";

dotenv.config(); // Load .env file

const naverVerify = async (profile: any) => {
  const email = profile.email;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const user = await prisma.user.findFirst({ where: { email: email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }
  const created = await prisma.user.create({
    data: {
      password: "naverOuth2", // Google OAuth2 로그인은 비밀번호가 없으므로 임시로 설정
      email,
      name: profile.name,
      gender: profile.gender === "M" ? "남성" : "여성",
      birth: String(profile.birthYear + "-" + profile.birthday),
      address: "추후 수정",
      detailAddress: "추후 수정",
      phoneNumber: profile.mobile,
      point: 0,
    },
  });
  console.log("created", created);
  return { id: created.id, email: created.email, name: created.name };
};

export const naverStrategy = new NaverStrategy( // Naver OAuth2 Strategy Class
  {
    clientID: process.env.PASSPORT_NAVER_CLIENT_ID, // Client ID
    clientSecret: process.env.PASSPORT_NAVER_CLIENT_SECRET, // Client Secret
    callbackURL: "http://localhost:3000/oauth2/callback/naver", // Redirect URL
    scope: ["email", "profile"], // Scope : 로그인 후에, email and profile 조회 권한을 줌
    state: true, // CSRF Protection
  },
  (accessToken: any, refreshToken: any, profile: any, done: any) => {
    console.log("profile", profile);
    return naverVerify(profile)
      .then((user) => done(null, user))
      .catch((err) => done(err));
  }
);

const googleVerify = async (profile: any) => {
  const email = profile.email?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const user = await prisma.user.findFirst({ where: { email: email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }
  const created = await prisma.user.create({
    data: {
      password: "googleOAuth2", // Google OAuth2 로그인은 비밀번호가 없으므로 임시로 설정
      email,
      name: profile.displayName,
      gender: "추후 수정",
      birth: String(new Date(1970, 0, 1)),
      address: "추후 수정",
      detailAddress: "추후 수정",
      phoneNumber: "추후 수정",
      point: 0,
    },
  });
  return { id: created.id, email: created.email, name: created.name };
};

export const googleStrategy = new GoogleStrategy( // Google OAuth2 Strategy Class
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID, // Client ID
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET, // Client Secret
    callbackURL: "http://localhost:3000/oauth2/callback/google", // Redirect URL
    scope: ["email", "profile"], // Scope : 로그인 후에, email and profile 조회 권한을 줌
    state: true, // CSRF Protection
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log("profile", profile);
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);
