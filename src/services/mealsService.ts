import fs from "fs/promises";
import path from "path";
import { AppError } from "./appError.js";
import { HTTP_STATUS_CODES } from "@/consts.js";
import { Meal } from "@/types/userTypes.js";

const mealsPath = path.join(process.cwd(), "src", "db", "meals.json");

const getMealsData = async () => {
  const meals = await fs.readFile(mealsPath, "utf-8");
  if (!meals) {
    throw new AppError(HTTP_STATUS_CODES.BAD_REQUEST, "Something went wrong");
  }
  const mealsArray = JSON.parse(meals);
  return (Array.isArray(mealsArray) ? mealsArray : []) as Meal[];
};

export const getMealsService = async () => await getMealsData();

export const getMealByIdService = async (id: number) => {
  const meals = await getMealsData();
  const meal = meals.find((meal) => meal.id === id);
  if (!meal) {
    throw new AppError(HTTP_STATUS_CODES.NOT_FOUND, "Meal not found");
  }
  return meal;
};
