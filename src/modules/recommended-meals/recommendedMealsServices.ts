import { format } from "date-fns";
import { getMealsPlanByUserIdAndDateService } from "../meals-plan/mealsPlanServices.js";
import { getMeals } from "../meals/mealsController.js";
import { getMealsService } from "../meals/mealsService.js";
import { DATE_FORMAT } from "@/config/consts.js";

const today = format(new Date(), DATE_FORMAT);

export const getRecommendedMealsService = async (userId: number) => {
  const meals = await getMealsService();
  const dayPlan = await getMealsPlanByUserIdAndDateService(userId, today);
  const recommendedMeals = meals.filter(() => Math.random() > 0.5);
  return recommendedMeals;
};
