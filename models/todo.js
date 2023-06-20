const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  value: String, // 할일
  doneAt: Date, // 완료 여부
  order: Number, // 몇 번째 할일
});
TodoSchema.virtual("todoId").get(function () {
  // .virtual 데이터 조회시 자동으로 생성되는 가상의 칼럼
  // "todoId"를 가지고 올때 반환되는 식
  return this._id.toHexString();
});

TodoSchema.set("toJSON", {
  // toJSON json타입으로 스키마를 변경할 때 해당하는 가상 타입을 보여준다.
  virtuals: true,
});

module.exports = mongoose.model("Todo", TodoSchema); // "모델이름", TodoSchema를 내보냄
