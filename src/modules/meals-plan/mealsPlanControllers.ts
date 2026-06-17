import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { Request, Response } from "express";
import {
  createMealsPlanService,
  resetMealsPlanService,
  getMealsPlanByUserIdAndDateService,
  updateMealsPlanService,
} from "./mealsPlanServices.js";

export const getMealsPlanByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { date } = req.query;
  const mealsPlan = await getMealsPlanByUserIdAndDateService(
    Number(userId),
    String(date)
  );
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: mealsPlan });
};

export const createMealsPlan = async (req: Request, res: Response) => {
  const { userId, meals, date } = req.body;
  const mealsPlan = await createMealsPlanService(Number(userId), meals, date);
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: mealsPlan });
};

export const updateMealsPlan = async (req: Request, res: Response) => {
  const { userId, meals, date } = req.body;
  const { planId } = req.params;
  const mealsPlan = await updateMealsPlanService(
    Number(planId),
    Number(userId),
    meals,
    date
  );
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: mealsPlan });
};

export const resetMealsPlan = async (req: Request, res: Response) => {
  const { planId } = req.params;
  const mealsPlan = await resetMealsPlanService(Number(planId));
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({
    message: "Meals plan reset successfully",
    data: mealsPlan,
  });
};
