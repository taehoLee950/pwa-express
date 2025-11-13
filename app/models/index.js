import "dotenv/config";
import { Sequelize } from "sequelize";
import Employee from "./Employee.js";

const db = {}; // 생성할 db 인스턴스 저장용

// 시퀄라이즈 객체 인스턴스 생성
const sequelize = new Sequelize(
  // DB 접속에 필요한 기본 정보 입력
  process.env.DB_MYSQL_DB_NAME, // 접속할 DB 명
  process.env.DB_MYSQL_USER, // DB 접속 유저
  process.env.DB_MYSQL_PASSWORD, // DB 접속 비번
  {
    // 필요한 값 입력
    host: process.env.DB_MYSQL_HOST, // DB host (localhost)
    port: parseInt(process.env.DB_MYSQL_PORT), // DB port (3306)
    dialect: process.env.DB_MYSQL_DIALECT, // DB 드라이버 (mysql)
    timezone: process.env.DB_MYSQL_TIMEZONE, // 타임 존 (UTC: +09:00)
    logging: process.env.DB_MYSQL_LOG_FLG === "true" && console.log, // DB Logging
    dialectOptions: {
      dateStrings: true, // 문자열로 날짜 받기 (DB에선 문자열로 관리하고 안 해줄시 DATE로 자동변경 됨)
    },
    pool: {
      max: parseInt(process.env.DB_MYSQL_CONNECTION_COUNT_MAX), // 최대 커넥션 수
      min: parseInt(process.env.DB_MYSQL_CONNECTION_COUNT_MIN),
      acquire: parseInt(process.env.DB_MYSQL_ACQUIRE_LIMIT), // 최대 연결 대기 시간(ms)
      idel: parseInt(process.env.DB_MYSQL_IDLE_LIMIT), // 유휴 커넉션 유지 시간(ms)
    },
  }
);

db.sequelize = sequelize; // 생성한 sequelize 인스턴스를 db에 저장

// Employee.js 모델 초기화
db.Employee = Employee.init(sequelize);

// 모델 관계 설정

// db 내보내기
export default db;
