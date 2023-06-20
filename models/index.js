const mongoose = require("mongoose");

// localhost의 27017 포트 번호로 MongoDB와 연결
// Database Name은 todo-demo
mongoose
  .connect("mongodb://127.0.0.1:27017/todo-demo", { // connect => promise로 구현 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((value) => console.log("MongoDB 연결에 성공하였습니다."))
  .catch((reason) => console.log("MongoDB 연결에 실패하였습니다."));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

module.exports = db;
