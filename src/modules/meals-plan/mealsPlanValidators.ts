import { parse, isValid } from "date-fns";
import z from "zod";
import { mealValidator } from "../meals/mealsValidators.js";

export const mealsPlanValidator = z.object({
  userId: z.number(),
  date: z.string().refine(
    (date) => {
      const parsed = parse(date, "yyyy-MM-dd", new Date());
      return isValid(parsed);
    },
    {
      message: "Invalid date format. Please use the format YYYY-MM-DD",
    }
  ),
  meals: z.array(mealValidator).refine((meals) => meals.length > 0, {
    message: "Meals plan must contain at least one meal",
  }),
});
