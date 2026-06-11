import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { Request, Response } from "express";
import {
  createMealsPlanService,
  deleteMealsPlanService,
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
  const mealsPlan = await createMealsPlanService(req.body);
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: mealsPlan });
};

export const updateMealsPlan = async (req: Request, res: Response) => {
  const mealsPlan = await updateMealsPlanService(req.body);
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: mealsPlan });
};

export const deleteMealsPlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteMealsPlanService(Number(id));
  return res
    .status(HTTP_STATUS_CODES.SUCCESS)
    .json({ message: "Meals plan deleted successfully" });
};
