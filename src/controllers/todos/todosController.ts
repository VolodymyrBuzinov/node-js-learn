import { Request, Response } from "express";

export const getTodos = async (_req: Request, res: Response) => {
  res.json({ message: "Todos fetched successfully" });
};

export const createTodo = (_req: Request, res: Response) => {
  res.json({ message: "Todo created successfully" });
};

export const updateTodo = (_req: Request, res: Response) => {
  res.json({ message: "Todo updated successfully" });
};

export const deleteTodo = (_req: Request, res: Response) => {
  res.json({ message: "Todo deleted successfully" });
};
