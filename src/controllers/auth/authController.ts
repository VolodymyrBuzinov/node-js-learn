import { Request, Response } from "express";

export const signin = (req: Request, res: Response) => {
  res.json({ message: "You are signed in" });
};

export const signup = (req: Request, res: Response) => {
  res.json({ message: "You are signed up" });
};

export const logout = (req: Request, res: Response) => {
  res.json({ message: "You are logged out" });
};
