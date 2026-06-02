import { Request, Response } from "express";

export const getTodos = (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
};

export const createTodo = (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
};

export const updateTodo = (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
};

export const deleteTodo = (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
};
