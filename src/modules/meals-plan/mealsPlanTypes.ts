import { Meal } from "../meals/mealsTypes.js";

export type MealsPlan = {
  id: number;
  userId: number;
  meals: Meal[];
  date: string;
};
