import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { Request, Response } from "express";
import {
  createMealAsAdminService,
  deleteMealAsAdminService,
  updateMealAsAdminService,
} from "./adminMealsServices.js";
import { getMealByIdService, getMealsService } from "../meals/mealsService.js";
import { SortOrder } from "@/generated/prisma/internal/prismaNamespace.js";

export const getMealsAsAdmin = async (req: Request, res: Response) => {
  const { sortBy, sortOrder, search } = req.query;
  const meals = await getMealsService({
    sortBy: sortBy as string,
    sortOrder: sortOrder as SortOrder,
    search: search as string,
  });
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: { meals } });
};

export const getMealByIdAsAdmin = async (req: Request, res: Response) => {
  const { mealId } = req.params;
  const meal = await getMealByIdService(mealId as unknown as string);
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: { meal } });
};

export const createMealAsAdmin = async (req: Request, res: Response) => {
  const { name, description, imageUrl, type, composition } = req.body;
  const meal = await createMealAsAdminService({
    name,
    description,
    imageUrl,
    type,
    composition,
  });
  return res.status(HTTP_STATUS_CODES.CREATED).json({ data: { meal } });
};

export const updateMealAsAdmin = async (req: Request, res: Response) => {
  const { mealId } = req.params;
  const { name, description, imageUrl, type, composition } = req.body;
  const meal = await updateMealAsAdminService(mealId as unknown as string, {
    name,
    description,
    imageUrl,
    type,
    composition,
  });
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: { meal } });
};

export const deleteMealAsAdmin = async (req: Request, res: Response) => {
  const { mealId } = req.params;
  await deleteMealAsAdminService(mealId as unknown as string);
  return res.status(HTTP_STATUS_CODES.NO_CONTENT).json({});
};
