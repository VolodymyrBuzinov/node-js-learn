import { Request, Response } from "express";
import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { getMealByIdService, getMealsService } from "./mealsService.js";

export const getMeals = async (_req: Request, res: Response) => {
  const meals = await getMealsService();
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: meals });
};

export const getMealById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const meal = await getMealByIdService(id as unknown as string);
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: meal });
};
