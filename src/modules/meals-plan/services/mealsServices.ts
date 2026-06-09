import fs from "fs/promises";
import path from "path";
import { AppError } from "@/services/appError.js";
import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { MealsPlan } from "@/modules/meals-plan/mealsPlanTypes.js";

const mealsPlanPath = path.join(
  process.cwd(),
  "src",
  "config",
  "db",
  "meals-plan.json"
);

const getMealsPlanData = async () => {
  const mealsPlan = await fs.readFile(mealsPlanPath, "utf-8");
  if (!mealsPlan) {
    throw new AppError(HTTP_STATUS_CODES.BAD_REQUEST, "Something went wrong");
  }
  const mealsPlanArray = JSON.parse(mealsPlan);
  return (Array.isArray(mealsPlanArray) ? mealsPlanArray : []) as MealsPlan[];
};

export const getMealsPlanByUserIdAndDateService = async (
  userId: number,
  date: string
) => {
  const mealsPlans = await getMealsPlanData();
  const mealsPlan = mealsPlans.find(
    (mealPlan) => mealPlan.userId === userId && mealPlan.date === date
  );
  if (!mealsPlan) {
    throw new AppError(HTTP_STATUS_CODES.NOT_FOUND, "Meals plan not found");
  }
  return mealsPlan;
};

export const createMealsPlanService = async (mealsPlan: MealsPlan) => {
  const mealsPlans = await getMealsPlanData();
  mealsPlans.push(mealsPlan);
  await fs.writeFile(mealsPlanPath, JSON.stringify(mealsPlans, null, 2));
  return mealsPlan;
};

export const updateMealsPlanService = async (mealsPlan: MealsPlan) => {
  const mealsPlans = await getMealsPlanData();
  const mealPlan = await getMealsPlanByUserIdAndDateService(
    mealsPlan.userId,
    mealsPlan.date
  );
  const newData = mealsPlans.map((item) =>
    mealPlan.id === item.id ? mealPlan : item
  );
  await fs.writeFile(mealsPlanPath, JSON.stringify(newData, null, 2));
  return newData;
};

export const deleteMealsPlanService = async (id: number) => {
  const mealsPlans = await getMealsPlanData();
  const mealPlan = mealsPlans.find((item) => item.id === id);
  if (!mealPlan) {
    throw new AppError(HTTP_STATUS_CODES.NOT_FOUND, "Meals plan not found");
  }
  const newData = mealsPlans.filter((item) => item.id !== id);
  await fs.writeFile(mealsPlanPath, JSON.stringify(newData, null, 2));
  return newData;
};
