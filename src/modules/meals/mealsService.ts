import fs from "fs/promises";
import path from "path";
import { AppError } from "@/services/appError.js";
import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { Meal } from "@/modules/meals/mealsTypes.js";

const mealsPath = path.join(process.cwd(), "src", "config", "db", "meals.json");

export const getMealsService = async () => {
  const meals = await fs.readFile(mealsPath, "utf-8");
  if (!meals) {
    throw new AppError(HTTP_STATUS_CODES.BAD_REQUEST, "Something went wrong");
  }
  const mealsArray = JSON.parse(meals);
  return (Array.isArray(mealsArray) ? mealsArray : []) as Meal[];
};

export const getMealByIdService = async (id: number) => {
  const meals = await getMealsService();
  const meal = meals.find((meal) => meal.id === id);
  if (!meal) {
    throw new AppError(HTTP_STATUS_CODES.NOT_FOUND, "Meal not found");
  }
  return meal;
};
