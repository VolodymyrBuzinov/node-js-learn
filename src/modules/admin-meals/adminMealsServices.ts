import path from "path";
import { getMealByIdService, getMealsService } from "../meals/mealsService.js";
import { Meal } from "../meals/mealsTypes.js";
import fs from "fs/promises";

const mealsPath = path.join(process.cwd(), "src", "config", "db", "meals.json");

export const createMealAsAdminService = async (
  meal: Omit<Meal, "id">
): Promise<Meal> => {
  const meals = await getMealsService();
  const newMeal: Meal = {
    id: meals.length + 1,
    ...meal,
  };
  meals.push(newMeal);
  await fs.writeFile(mealsPath, JSON.stringify(meals, null, 2));
  return newMeal;
};

export const updateMealAsAdminService = async (
  mealId: number,
  updatedFields: Partial<Omit<Meal, "id">>
): Promise<Meal> => {
  const meals = await getMealsService();
  const meal = await getMealByIdService(mealId);

  const updatedMeal: Meal = {
    ...meal,
    ...updatedFields,
    composition: updatedFields.composition
      ? { ...meal.composition, ...updatedFields.composition }
      : meal.composition,
  };

  const updatedMeals = meals.map((meal) =>
    meal.id === mealId ? updatedMeal : meal
  );
  await fs.writeFile(mealsPath, JSON.stringify(updatedMeals, null, 2));
  return updatedMeal;
};

export const deleteMealAsAdminService = async (mealId: number) => {
  const meals = await getMealsService();
  await getMealByIdService(mealId);
  const filteredMeals = meals.filter((meal) => meal.id !== mealId);
  await fs.writeFile(mealsPath, JSON.stringify(filteredMeals, null, 2));
  return filteredMeals;
};
