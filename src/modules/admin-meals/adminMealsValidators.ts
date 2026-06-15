import z from "zod";
import { MEAL_TYPE_VALUES } from "../meals/mealsTypes.js";
import { mealProductValidator } from "../meals/mealsValidators.js";

const mealCompositionValidator = z.object({
  calories: z.number(),
  protein: z.number(),
  carbohydrates: z.number(),
  fat: z.number(),
  products: z.array(mealProductValidator),
});

export const createMealAsAdminValidator = z.object({
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  type: z.enum(MEAL_TYPE_VALUES),
  composition: mealCompositionValidator,
});

export const updateMealAsAdminValidator = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  type: z.enum(MEAL_TYPE_VALUES).optional(),
  composition: mealCompositionValidator.partial().optional(),
});
