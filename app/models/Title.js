import dayjs from "dayjs";
import { DataTypes } from "sequelize";

// 모델명
const modelName = "Title";

// 컬럼 정의 (field)
const attributes = {
  titleCode: {
    field: "title_code",
    type: DataTypes.CHAR(4),
    primaryKey: true,
    allowNull: false,
    comment: "직급 코드",
  },
  title: {
    field: "title",
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: "직급명",
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
  tableName: "titles", // 실제 TABLE 명
  timestamps: true, // createdAt, updatedAt 자동 관리
  paranoid: true, // deletedAt 자동 관리 (soft delete)
};

// 모델 객체 생성
const Title = {
  init: (Sequelize) => {
    const defineTitle = Sequelize.define(modelName, attributes, options);

    return defineTitle;
  },
  // 모델 관계를 정의
  associate: (db) => {
    db.Title.hasMany(db.TitleEmp, {
      sourceKey: "titleCode", // 부모 pk
      foreignKey: "titleCode", // 자식 fk
      as: "title-to-titleEmp", // 관계명
    });
  },
};

export default Title;
