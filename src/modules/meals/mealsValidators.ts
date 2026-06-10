import z from "zod";
import { MEAL_TYPE_VALUES } from "./mealsTypes.js";

export const mealValidator = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  type: z.enum(MEAL_TYPE_VALUES),
  composition: z.object({
    calories: z.number(),
    protein: z.number(),
    carbohydrates: z.number(),
    fat: z.number(),
    products: z.array(z.string()),
  }),
});
