import { Meal } from "../meals/mealsTypes.js";

export type MealsPlan = {
  id: string;
  userId: string;
  meals: Meal[];
  date: string;
};
