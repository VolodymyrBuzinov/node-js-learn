import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/todos/todosController.js";

export const todosRoutes = express.Router();

todosRoutes.get("/", getTodos);
todosRoutes.post("/", createTodo);
todosRoutes.patch("/:id", updateTodo);
todosRoutes.delete("/:id", deleteTodo);
