import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = "Employee"; // 모델명 (JS 내부에서 사용하는 이름)

// 컬럼 정의

const attributes = {
  empId: {
    field: "emp_id", // DB의 컬럼 물리명, empId (key)와 연결될 실제 이름
    type: DataTypes.BIGINT.UNSIGNED, // 컬럼의 데이터 타입 지정
    primaryKey: true, // PK 지정
    allowNull: false, // NULL 비허용
    autoIncrement: true, // PK (emp_id) AUTO_INCREMENT 지정
    comment: "사원 ID", // 코멘트 설정
  },
  name: {
    field: "name",
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: "사원명",
  },
  birth: {
    field: "birth",
    type: DataTypes.DATE,
    allowNull: false,
    comment: "사원 생년월일",
    get() {
      const val = this.getDataValue("birth");
      if (!val) {
        return null;
      }
      // dayjs 라이브러리를 사용
      // 지정한 형태로 DATA를 가져온다.
      return dayjs(val).format("YYYY-MM-DD");
    },
  },
  gender: {
    field: "gender",
    type: DataTypes.CHAR(1),
    allowNull: false,
    comment: "사원 성별",
  },
  hireAt: {
    field: "hire_at",
    type: DataTypes.DATE,
    allowNull: false,
    comment: "입사일",
    get() {
      {
        const val = this.getDataValue("hireAt");
        if (!val) {
          return null;
        }
        // dayjs 라이브러리를 사용
        // 지정한 형태로 DATA를 가져온다.
        return dayjs(val).format("YYYY-MM-DD");
      }
    },
  },
  fireAt: {
    field: "fire_at",
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    comment: "퇴직일",
    get() {
      {
        const val = this.getDataValue("fireAt");
        if (!val) {
          return null;
        }
        // dayjs 라이브러리를 사용
        // 지정한 형태로 DATA를 가져온다.
        return dayjs(val).format("YYYY-MM-DD");
      }
    },
  },
  supId: {
    field: "sup_id",
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    defaultValue: null,
    comment: "사수 번호",
  },
  createdAt: {
    field: "created_at",
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(), // 생성시 현재 시간 자동 입력
    comment: "작성일",
    get() {
      {
        const val = this.getDataValue("createdAt");
        if (!val) {
          return null;
        }
        // dayjs 라이브러리를 사용
        // 지정한 형태로 DATA를 가져온다.
        return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
      }
    },
  },
  updatedAt: {
    field: "updated_at",
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(), // 생성시 현재 시간 자동 입력
    comment: "수정일",
    get() {
      {
        const val = this.getDataValue("updatedAt");
        if (!val) {
          return null;
        }
        // dayjs 라이브러리를 사용
        // 지정한 형태로 DATA를 가져온다.
        return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
      }
    },
  },
  deletedAt: {
    field: "deleted_at",
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null, // 생성시 현재 시간 자동 입력
    comment: "삭제일",
    get() {
      {
        const val = this.getDataValue("deletedAt");
        if (!val) {
          return null;
        }
        // dayjs 라이브러리를 사용
        // 지정한 형태로 DATA를 가져온다.
        return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
      }
    },
  },
};

// Options 설정 (테이블 관련 설정)
// timpstamps: true,란?
// MySQL에서 정해진 두 이름: createdAt, updatedAt 자동 관리 (default value 필요 X)
// createAt: 'customizedName' 이름 다를시 자동 관리 속성 지정 가능
// updatedAt: false, 를 줄 시 자동관리에서 뺀다.
const options = {
  tableName: "employees", // 실제 TABLE 명
  timestamps: true, // createdAt, updatedAt 자동 관리
  paranoid: true, // deletedAt 자동 관리 (soft delete)
};

// 모델 객체 작성
// 함수 기반, 클래스 기반 작성법 2가지가 존재
// 함수 기반 객체 작성--
const Employee = {
  init: (sequelize) => {
    const defineEmployee = sequelize.define(modelName, attributes, options);

    return defineEmployee;
  },
  // 모델 관계를 정의
  associate: (db) => {
    // 1:n 관계 (1명의 사원은 복수의 직급 정보를 가질수있다.)
    db.Employee.hasMany(db.TitleEmp, {
      sourceKey: "empId",
      foreignKey: "empId",
      as: "titleEmp",
    });
  },
};

export default Employee;
