import { format } from "date-fns";
import { getMealsPlanByUserIdAndDateService } from "../meals-plan/mealsPlanServices.js";
import { getMealsService } from "../meals/mealsService.js";
import { DATE_FORMAT } from "@/config/consts.js";
import { getUserByIdService } from "../user/userService.js";
import { User } from "../user/userTypes.js";

const PROFILE_FIELDS = [
  "age",
  "weight",
  "gender",
  "height",
  "activityLevel",
] as const;

const ACTIVITY_MULTIPLIERS: Record<User["activityLevel"], number> = {
  малий: 1.2,
  середній: 1.55,
  високий: 1.725,
};

export const calculateDailyNorms = (user: User) => {
  const bmr =
    user.gender === "чоловік"
      ? 10 * user.weight + 6.25 * user.height - 5 * user.age + 5
      : 10 * user.weight + 6.25 * user.height - 5 * user.age - 161;

  const calories = Math.round(bmr * ACTIVITY_MULTIPLIERS[user.activityLevel]);
  const protein = Math.round(user.weight * 1.8);
  const fat = Math.round((calories * 0.275) / 9);
  const carbohydrates = Math.round((calories - protein * 4 - fat * 9) / 4);

  return { calories, protein, carbohydrates, fat };
};

export const getRecommendedMealsService = async (userId: number) => {
  const user = await getUserByIdService(userId);

  if (!PROFILE_FIELDS.every((field) => user[field] != null)) {
    return [];
  }

  const today = format(new Date(), DATE_FORMAT);
  const { meals: plannedMeals } = await getMealsPlanByUserIdAndDateService(
    userId,
    today
  );

  const norms = calculateDailyNorms(user);
  const consumed = plannedMeals.reduce(
    (total, meal) => ({
      calories: total.calories + meal.composition.calories,
      protein: total.protein + meal.composition.protein,
      carbohydrates: total.carbohydrates + meal.composition.carbohydrates,
      fat: total.fat + meal.composition.fat,
    }),
    { calories: 0, protein: 0, carbohydrates: 0, fat: 0 }
  );

  const remaining = {
    calories: norms.calories - consumed.calories,
    protein: norms.protein - consumed.protein,
    carbohydrates: norms.carbohydrates - consumed.carbohydrates,
    fat: norms.fat - consumed.fat,
  };

  if (remaining.calories <= 0) {
    return [];
  }

  const usedTypes = new Set(plannedMeals.map((meal) => meal.type));
  const usedIds = new Set(plannedMeals.map((meal) => meal.id));
  const meals = await getMealsService();

  return meals.filter((meal) => {
    if (usedTypes.has(meal.type) || usedIds.has(meal.id)) {
      return false;
    }

    const { calories, protein, carbohydrates, fat } = meal.composition;

    return (
      calories <= remaining.calories &&
      protein <= remaining.protein &&
      carbohydrates <= remaining.carbohydrates &&
      fat <= remaining.fat
    );
  });
};
