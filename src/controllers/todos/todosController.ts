import { CODE_STATUS, SUCCESS_MESSAGES } from "@/consts.js";
import {
  createTodoService,
  deleteTodoService,
  getTodoByIdService,
  getTodosService,
  updateTodoService,
} from "@/services/todosService.js";
import { Request, Response } from "express";

export const getTodos = async (_req: Request, res: Response) => {
  const todos = await getTodosService();
  return res.json({ status: CODE_STATUS.OK, data: { todos } });
};

export const createTodo = async (req: Request, res: Response) => {
  const { title, description, completed } = req.body;
  const todo = await createTodoService({ title, description, completed });
  return res.json({
    message: SUCCESS_MESSAGES.TODO_CREATED,
    todo,
    status: CODE_STATUS.CREATED,
  });
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const todo = await updateTodoService(Number(id), {
    title,
    description,
    completed,
  });
  return res.json({
    message: SUCCESS_MESSAGES.TODO_UPDATED,
    todo,
    status: CODE_STATUS.OK,
  });
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = await deleteTodoService(Number(id));
  return res.json({
    message: SUCCESS_MESSAGES.TODO_DELETED,
    todo,
    status: CODE_STATUS.OK,
  });
};

export const getTodoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = await getTodoByIdService(Number(id));
  return res.json({ status: CODE_STATUS.OK, data: { ...todo } });
};
