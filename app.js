import express from "express"; // express 모듈 가져오기

const app = express(); // express {} 반환

// 클라이언트가 지정된 경로에 HTTP METHOD 요청을
// 보낼 때 실행되는 Router 이다.
app.get("/api/hi", (request, response, next) => {
  response.status(200).send("Hi express!"); // 서버 200번대에 보낼 메시지
});

// post
app.post("/api/hi", (request, response, next) => {
  response.status(200).send("POST 익스프레스!");
});

// put
app.put("/api/hi", (request, response, next) => {
  response.status(200).send("PUT 익스프레스!");
});

// delete
app.delete("/api/hi", (request, response, next) => {
  response.status(200).send("DELETE 익스프레스!");
});

// ----------------
// Query Parameter 제어
// 모든 값을 string으로 받기 때문에 주의 필요
// app.get("/api/posts", (request, response, next) => {
//   const params = request.query;
//   const name = request.query.name;
//   const age = request.query.age;
//   console.log(name, age);
//   response.status(200).send(params);
// });

// Segment Parameter *RESTful
// Request.params를 통해서 접근 가능
app.get("api/posts/:id", (request, response, next) => {
  const postId = request.params.id; //request 객체에 params에 담김
  console.log(typeof postId);
  response.status(200).send(postId);
});

// 대체 라우트 (모든 router중 가장 마지막에 작성)
// app.use((request, response, next) => {
//   response.status(404).send("404 (에러) 익스프레스!");
// });

// 대체 라우트 객체 버전
app.use((request, response, next) => {
  response.status(404).send({
    code: "error01",
    msg: "찾을 수 없는 정보입니다.",
  });
});

// 서버를 주어진 포트에서 시작
app.listen(3000, () => {
  console.log("listening at port: 3000!");
});
