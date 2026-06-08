import { Request, Response } from "express";
import { HTTP_STATUS_CODES } from "@/consts.js";
import {
  getMealByIdService,
  getMealsService,
} from "@/services/mealsService.js";

export const getMeals = async (req: Request, res: Response) => {
  const meals = await getMealsService();
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: meals });
};

export const getMealById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const meal = await getMealByIdService(Number(id));
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: meal });
};
