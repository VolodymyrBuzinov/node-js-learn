import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  getTodoById,
} from "../controllers/todos/todosController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const todosRoutes = express.Router();

todosRoutes.get("/", asyncHandler(getTodos));
todosRoutes.get("/:id", asyncHandler(getTodoById));
todosRoutes.post("/", asyncHandler(createTodo));
todosRoutes.patch("/:id", asyncHandler(updateTodo));
todosRoutes.delete("/:id", asyncHandler(deleteTodo));
