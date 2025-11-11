import express from "express";
import { eduUsersTest } from "../app/middlewares/edu/edu.middleware.js";

const usersRouter = express.Router(); // 라우터 객체 인스턴스

usersRouter.get("/users/:id", eduUsersTest, (request, response, next) => {
  response.status(200).send("유저 정보 조회 완료");
});

usersRouter.put("/users/:id", (request, response, next) => {
  response.status(200).send("유저 정보 수정 완료");
});

export default usersRouter;
