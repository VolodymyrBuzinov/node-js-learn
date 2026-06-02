import { Request, Response } from "express";

export const signin = (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
};

export const signup = (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
};

export const logout = (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
};
