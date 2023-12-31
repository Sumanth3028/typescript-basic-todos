import { Router } from "express";

import { Todo } from "../models/todo";

const router = Router();

let todos: Todo[] = [];

router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const body = req.body as { text: string };
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };
  todos.push(newTodo);

  res.status(201).json({
    success: true,
    message: "Added Todo",
    todo: newTodo,
    todos: todos,
  });
});

router.put("/todo/:todoId", (req, res, next) => {
  const params = req.params as { todoId: string };
  const tid = params.todoId;
  const body = req.body as { text: string };
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };

    return res
      .status(200)
      .json({ success: true, message: "Updated Todo", todos: todos });
  }
  res.status(404).json({ success: false, message: "Item not found" });
});

router.delete("/deleteTodo/:todoId", (req, res, next) => {
  const params = req.params as { todoId: string };
  todos = todos.filter((todoItem) => todoItem.id !== params.todoId);
  res
    .status(200)
    .json({ success: true, message: "Deleted Todo", todos: todos });
});

export default router;
