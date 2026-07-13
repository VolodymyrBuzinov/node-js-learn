import { Request, Response } from "express";
import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { getMealByIdService, getMealsService } from "./mealsService.js";
import { SortOrder } from "@/generated/prisma/internal/prismaNamespace.js";

export const getMeals = async (req: Request, res: Response) => {
  const { sortBy, sortOrder, search } = req.query;
  const meals = await getMealsService({
    sortBy: sortBy as string,
    sortOrder: sortOrder as SortOrder,
    search: search as string,
  });
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: meals });
};

export const getMealById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const meal = await getMealByIdService(id as unknown as string);
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: meal });
};
