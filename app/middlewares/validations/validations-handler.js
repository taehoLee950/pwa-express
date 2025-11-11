import { validationResult } from "express-validator";

export default function validatorHandler(request, response, next) {
  // request에 담긴 유효성 검사 결과 중 에러를 모아 배열로 반환
  const errors = validationResult(request);

  // 에러가 났을 시 에러 메시지
  if (!errors.isEmpty()) {
    //formatWith: .map()과 동일하게 동작, 에러 결과값을 모아서 반환
    const customErrors = errors.formatWith(
      (error) => `${error.path}: ${error.msg}`
    );
    return response.status(400).send(customErrors.array());
  }
  // 에러 없을 시 미들웨어 진행
  next();
}
