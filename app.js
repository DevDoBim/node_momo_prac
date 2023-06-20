const express = require("express");

const db = require("./models/index.js")
const todosRouter = require("./routes/todos.router.js");

const app = express(); // app 객체 생성

app.use("/api", express.json(), todosRouter);
app.use(express.static("./assets")); // static : 정적인 파일을 연결해주는 미들웨어
// app.js 파일 기준으로 ./assets 경로에 있는 파일을 가공 없이 그대로 전달해주는 미들웨어

app.listen(8080, () => {
  console.log("서버가 켜졌어요!");
});