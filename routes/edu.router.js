import express from "express";
import db from "../app/models/index.js";
import { Op } from "sequelize"; // Sequelize 연산자 사용
import dayjs from "dayjs"; // 날짜 처리

const { sequelize, Employee, TitleEmp, Title } = db;
// sequelize : DB 연결 객체
// Employee : 모델 객체, CRUD 및 쿼리 사용

const eduRouter = express.Router();

/**
 * [GET] /api/edu
 * 예제: Sequelize ORM 실습용 라우터
 */
eduRouter.get("/api/edu", async (request, response, next) => {
  try {
    const fireDate = request.query.date; // raw SQL 용
    let result = null;

    // ---------------------------------
    // 1. findAll(): 여러 레코드 조회 → 배열 반환
    // result = await Employee.findAll({
    //   attributes: ['empId', 'name', 'birth'],
    //   where: { empId: { [Op.between]: [50, 100] } },
    // });

    // 2. findOne(): 조건에 맞는 첫 번째 레코드 조회 → 객체 반환
    // result = await Employee.findOne({
    //   attributes: ['empId', 'name', 'birth'],
    //   where: { empId: { [Op.between]: [50, 100] } },
    // });

    // 3. findByPk(): PK 값으로 단일 레코드 조회
    // result = await Employee.findByPk(50000, { attributes: ['empId', 'name'] });

    // 4. 집계 함수(count, max, min, avg)
    // result = await Employee.count();
    // result = await Employee.max('empId');

    // 5. create(): 새 레코드 생성
    // result = await Employee.create({
    //   name: "test",
    //   birth: "2000-01-01",
    //   gender: "F",
    //   hireAt: dayjs().format("YYYY-MM-DD"),
    // });

    // 6. update(): 기존 레코드 수정
    // result = await Employee.update(
    //   { name: "TaehoTheBest" },
    //   { where: { empId: 100012 } }
    // );

    // 7. save(): 모델 인스턴스를 기반으로 레코드 생성 및 수정
    // const employee = await Employee.findByPk(100012);
    // employee.name = "둘리";
    // employee.birth = "1900-01-01";
    // result = await employee.save();

    // 8. build(): 메모리에 객체 인스턴스만 생성, save() 필요
    // const employee = Employee.build({
    //   name: "또치",
    //   birth: "1980-01-01",
    //   gender: "F",
    //   hireAt: dayjs().format("YYYY-MM-DD"),
    // });
    // result = await employee.save();

    // 9. destroy(): 조건에 맞는 레코드 삭제 (Soft/Hard Delete)
    // result = await Employee.destroy({ where: { empId: 100012 }, force: true });

    // 10. restore(): Soft Delete된 레코드 복원
    // result = await Employee.restore({ where: { empId: 100012 } });

    // ============================
    // 예제 조회들
    // ============================

    // 예제1: 이름이 '강가람'이고 성별이 여자인 사원 정보 조회
    // result = await Employee.findAll({
    //   attributes: ["empId", "name", "gender"],
    //   where: { name: "강가람", gender: "F" },
    // });

    // 예제2: 이름이 '강가람'또는 '신서연'인 사원 조회
    // result = await Employee.findAll({
    //   attributes: ["empId", "name", "gender"],
    //   where: { [Op.or]: [{ name: "강가람" }, { name: "신서연" }] },
    // });

    // 예제3: 성별이 여자이며 이름이 '강가람'또는 '신서연'인 사원 조회
    // gender 먼저 잡고 name 조건을 Op.or로 묶음
    // result = await Employee.findAll({
    //   attributes: ["empId", "name", "gender"],
    //   where: {
    //     gender: "F",
    //     [Op.or]: [{ name: "신서연" }, { name: "강가람" }],
    //   },
    // });

    // 예제4: 재직중인 사원 번호 1~100까지 조회
    // result = await Employee.findAll({
    //   where: {
    //     empId: { [Op.between]: [1, 100] },
    //     fireAt: { [Op.is]: null }, // 재직중인 사람
    //   },
    // });

    // 예제5: 사원 번호가 1, 2, 3인 사람을 조회
    // result = await Employee.findAll({
    //   where: { empId: { [Op.in]: [1, 2, 3] }, fireAt: { [Op.is]: null } },
    // });

    // 예제6: 사원 번호가 1, 2, 3인 사람 제외
    // result = await Employee.findAll({
    //   where: { empId: { [Op.notIn]: [1, 2, 3] }, fireAt: { [Op.is]: null } },
    // });

    // 예제7: 이름에 매칭되는 문자열 조회
    // result = await Employee.findAll({
    //   where: { name: { [Op.like]: "%가람" }, fireAt: { [Op.is]: null } },
    // });

    // 정렬 + 페이징
    // result = await Employee.findAll({
    //   where: { empId: { [Op.gte]: 10000 } },
    //   order: [["name", "ASC"], ["birth", "DESC"]],
    //   limit: 10,
    //   offset: 10,
    // });

    // // group by + having
    // result = await Employee.findAll({
    //   attributes: [
    //     "gender",
    //     [sequelize.fn("COUNT", sequelize.col("*")), "cnt_gender"],
    //   ],
    //   group: ["gender"],
    //   having: sequelize.literal("cnt_gender >= 40000"),
    // });

    // return response.status(200).send({
    //   msg: "신규 직원 생성",
    //   data: result,
    // });

    // join;
    result = await Employee.findOne({
      attributes: ["empId", "name"],
      where: {
        empId: 1,
      },
      include: [
        {
          model: TitleEmp, // 내가 연결할 모델
          as: "titleEmp", // 내가 사용할 관계 (associate)
          required: true, // true: inner join, flase: left outer join
          attributes: ["titleCode"],
          where: {
            // 조건문
            endAt: {
              [Op.is]: null,
            },
          },
          include: [
            {
              model: Title,
              as: "titleEmp-child-of-title",
              require: true,
              attributes: ["title"],
            },
          ],
        },
      ],
    });

    return response.status(200).send({
      msg: "정상 처리",
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

export default eduRouter;
