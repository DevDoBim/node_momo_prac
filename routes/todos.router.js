const express = require("express");
const Todo = require("../models/todo.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hi");
});

router.post("/todos", async (req, res) => {
  const { value } = req.body;
  const maxOrderByUserId = await Todo.findOne().sort("-order");
  // Todo 모든 데이터 중 하나 조회, order값 역순 조회 => 변수에는 가장 마지막 값 할당

  const order = maxOrderByUserId ? maxOrderByUserId.order + 1 : 1;
  // maxOrderByUserId 값 존재여부 ?
  // 있다면 maxOrderByUserId의 order에 + 1,
  // 없다면 기본값 1 즉, 첫번째 order

  const todo = new Todo({ value: value, order: order }); // todo 생성
  // todo에는 현재의 value 값과 order값이 들어간다.
  // 즉 생성한 할일과 그 할일의 order값이 할당된다.
  await todo.save();

  res.send({ todo });
});

router.get("/todos", async (req, res) => {
  const todos = await Todo.find().sort("-order").exec(); //sort("정렬할 colum"), - : 내림차순
  // mongoDB에서 데이터를 불러와야함 => await
  // Todo 스키마에서 find( 조건이 없다면 모든 것을 찾는다.)
  res.send({ todos: todos });
});

router.patch("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const { order } = req.body;
  console.log("order0 : ", order); // 2
  // 1. todoId에 해당하는 할 일이 있는가?
  // 1-1. todoId에 해당하는 할 일이 없다면, error 출력
  const currentTodo = await Todo.findById(todoId); // 3T에서 _id를 찾는다.
  console.log("currentTodo.order" , currentTodo.order); //1
  if (!currentTodo) {
    return res.status(400).json({ errorMessage: "할 일이 존재하지 않습니다." });
  }

  if (order) {
    console.log("order2 : ", order); //2
    const targetTodo = await Todo.findOne({ order: order }).exec();
    console.log("targetTodo.order" , targetTodo.order); //2
    console.log("currentTodo.order2" , currentTodo.order); //1
    // targetTodo는 변경하려는 order
    if (targetTodo) {
      // 2 -> 1
      targetTodo.order = currentTodo.order; 
      await targetTodo.save(); // DB에 저장
    }
    // 1 -> 2
    console.log("order3 : ", order);
    currentTodo.order = order;
    await currentTodo.save();
  }

  res.send();
});

module.exports = router;
