import dayjs from "dayjs";
import { DataTypes } from "sequelize";

// 모델명
const modelName = "TitleEmp";

// 컬럼 정의 (field)
const attributes = {
  titleEmpId: {
    field: "title_emp_id",
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: "사원 직급 ID",
  },
  empId: {
    field: "emp_id",
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: "사원 ID",
  },
  titleCode: {
    field: "title_code",
    type: DataTypes.CHAR(4),
    allowNull: false,
    comment: "직급 코드",
  },
  startAt: {
    field: "start_at",
    type: DataTypes.DATEONLY,
    allowNull: false,
    comment: "시작일",
    get() {
      const val = this.getDataValue("startAt");
      if (!val) {
        return null;
      } else {
        return dayjs(val).format("YYYY-MM-DD");
      }
    },
  },
  endAt: {
    field: "end_at",
    type: DataTypes.DATEONLY,
    allowNull: true,
    comment: "종료일",
    get() {
      const val = this.getDataValue("endAt");
      if (!val) {
        return null;
      } else {
        return dayjs(val).format("YYYY-MM-DD");
      }
    },
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

// 관리 설정
const options = {
  tableName: "title_emps", // 실제 TABLE 명
  timestamps: true, // createdAt, updatedAt 자동 관리
  paranoid: true, // deletedAt 자동 관리 (soft delete)
};

// 모델 객체 생성
const TitleEmp = {
  init: (Sequelize) => {
    const defineTitleEmp = Sequelize.define(modelName, attributes, options);

    return defineTitleEmp;
  },
  associate: (db) => {
    // 1:n 관계에서 자식 모델에 설정하는 방법
    db.TitleEmp.belongsTo(db.Employee, {
      targetKey: "empId",
      foreignKey: "empId",
      as: "employee",
    });

    db.TitleEmp.belongsTo(db.Title, {
      targetKey: "titleCode",
      foreignKey: "titleCode",
      as: "titleEmp-child-of-title",
    });
  },
};

export default TitleEmp;
