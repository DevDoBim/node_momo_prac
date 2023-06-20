const express = require("express");

const app = express();  // app 객체 생성
const router = express.Router(); 

router.get("/", (req, res) => { // app api 생성
  res.send("Hi!");
});

app.use("/api", express.json(), router); // 미들웨어 등록 .use("경로", 미들웨어, 해당 라우터)

app.listen(8080, () => {
  console.log("서버가 켜졌어요!");
});
