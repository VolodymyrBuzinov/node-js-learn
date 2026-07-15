import z from "zod";
import { MEAL_TYPE_VALUES } from "../meals/mealsTypes.js";
import { mealProductValidator } from "../meals/mealsValidators.js";
import { SORT_ORDER } from "@/config/consts.js";

export const mealImageValidator = z
  .instanceof(File)
  .refine(
    (file) => {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      return allowedTypes.includes(file.type);
    },
    {
      message: "File must be a valid image (JPEG, PNG, GIF, or WebP)",
    }
  )
  .refine(
    (file) => {
      const maxSize = 5 * 1024 * 1024;
      return file.size <= maxSize;
    },
    {
      message: "File size must be less than 5MB",
    }
  );

export const getMealsAsAdminValidator = z.object({
  sortBy: z.enum(["name", "type"]).optional(),
  sortOrder: z.enum(SORT_ORDER).optional(),
  search: z.string().optional(),
});

const mealCompositionValidator = z.object({
  calories: z.number(),
  protein: z.number(),
  carbohydrates: z.number(),
  fat: z.number(),
  products: z.array(mealProductValidator),
});

export const createMealAsAdminValidator = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  image: mealImageValidator,
  slug: z.string().min(1),
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
