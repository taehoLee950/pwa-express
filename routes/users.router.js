import express from "express";
import { eduUsersTest } from "../app/middlewares/edu/edu.middleware.js";
// import pool from "../db/my-db.js";
import db from "../app/models/index.js";
const { sequlize, Employee } = db;

const usersRouter = express.Router(); // 라우터 객체 인스턴스

usersRouter.get("/users", eduUsersTest, (request, response, next) => {
  response.status(200).send("유저 정보 조회 완료");
});

// --------------
// Sequelize로 DB 연동
// --------------
usersRouter.get("/users/:id", async (request, response, next) => {
  try {
    const id = parseInt(request.params.id);

    const result = await Employee.findByPk(id);

    return response.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

// --------------
// mysql2로 DB 연동
// --------------
// usersRouter.get("/users/:id", async (request, response, next) => {
//   try {
//     const id = parseInt(request.params.id);
//     // 쿼리 작성
//     const sql = `
//       SELECT *
//       FROM employees
//       WHERE
//         emp_id = ?
//         emp_id = ?
//     `;
//     //prepared statement
//     const [result] = await pool.execute(sql, [id, id]);

//     return response.status(200).send(result);
//   } catch (e) {
//     next(e);
//   }
// });

usersRouter.put("/users/:id", (request, response, next) => {
  response.status(200).send("유저 정보 수정 완료");
});

export default usersRouter;
