import { Request, Response } from "express";
import { HTTP_STATUS_CODES } from "@/config/consts.js";
import {
  getMealByIdService,
  getMealsService,
  getRecommendedMealsService,
} from "@/modules/meals/services/mealsService.js";

export const getMeals = async (req: Request, res: Response) => {
  const meals = await getMealsService();
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: meals });
};

export const getMealById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const meal = await getMealByIdService(Number(id));
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: meal });
};

export const getRecommendedMeals = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const recommendedMeals = await getRecommendedMealsService(Number(userId));
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: recommendedMeals });
};
