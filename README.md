# 유효성 체크를 위한 준비

```
npm i express-validator
```

# 기본 response 양식

### 정상

```
{
    code: '00',
    message: '정상 처리',
    date: [] | {}
}
```

### 에러

```
{
    code: 'E01',
    message: '아이디나 비밀번호가 틀렸습니다.',
    data: null | []
}
```

# DB연동

## 설치

```
npm i mysql2 sequelize sequelize-cli
```
