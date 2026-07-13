import { calculateUserNormaValues } from "@/utils/index.js";
import { getMealsPlanByUserIdAndDateService } from "../meals-plan/mealsPlanServices.js";
import { getMealsService } from "../meals/mealsService.js";
import { getUserByIdService } from "../user/userService.js";
import { User } from "../user/userTypes.js";
import { Dashboard, DashboardProgress } from "./dashboardTypes.js";
import { MealsPlan } from "../meals-plan/mealsPlanTypes.js";
import { Meal } from "../meals/mealsTypes.js";

const PROFILE_FIELDS = [
  "age",
  "weight",
  "gender",
  "height",
  "activityLevel",
] as const;

const isProfileComplete = (user: User) =>
  PROFILE_FIELDS.every((field) => user[field] != null);

const calculateProgress = (
  mealsPlan: MealsPlan,
  user: User
): DashboardProgress => {
  const norms = calculateUserNormaValues(user);

  let consumedCalories = 0;
  let consumedProtein = 0;
  let consumedCarbohydrates = 0;
  let consumedFat = 0;

  for (const meal of mealsPlan.meals) {
    consumedCalories += meal.composition.calories;
    consumedProtein += meal.composition.protein;
    consumedCarbohydrates += meal.composition.carbohydrates;
    consumedFat += meal.composition.fat;
  }

  return {
    calories: {
      consumed: consumedCalories,
      remaining: norms.tdee - consumedCalories,
    },
    protein: {
      consumed: consumedProtein,
      remaining: norms.protein - consumedProtein,
    },
    carbohydrates: {
      consumed: consumedCarbohydrates,
      remaining: norms.carbohydrates - consumedCarbohydrates,
    },
    fat: {
      consumed: consumedFat,
      remaining: norms.fat - consumedFat,
    },
  };
};

const findRecommendedMeals = async (
  mealsPlan: MealsPlan,
  progress: DashboardProgress
): Promise<Meal[]> => {
  if (progress.calories.remaining <= 0) {
    return [];
  }

  const allMeals = await getMealsService({});
  const recommendedMeals: Meal[] = [];

  for (const meal of allMeals) {
    const isAlreadyUsed = mealsPlan.meals.some(
      (plannedMeal) =>
        plannedMeal.type === meal.type || plannedMeal.id === meal.id
    );

    if (isAlreadyUsed) {
      continue;
    }

    const isWithinDailyNorm =
      meal.composition.calories <= progress.calories.remaining &&
      meal.composition.protein <= progress.protein.remaining &&
      meal.composition.carbohydrates <= progress.carbohydrates.remaining &&
      meal.composition.fat <= progress.fat.remaining;

    if (!isWithinDailyNorm) {
      continue;
    }

    recommendedMeals.push(meal);
  }

  return recommendedMeals;
};

export const getDashboardService = async (
  userId: string,
  date: string
): Promise<Dashboard> => {
  const user = await getUserByIdService(userId);

  if (!isProfileComplete(user)) {
    return { progress: null, recommendedMeals: [] };
  }

  const mealsPlan = await getMealsPlanByUserIdAndDateService(userId, date);
  const progress = calculateProgress(mealsPlan, user);
  const recommendedMeals = await findRecommendedMeals(mealsPlan, progress);

  return { progress, recommendedMeals };
};
