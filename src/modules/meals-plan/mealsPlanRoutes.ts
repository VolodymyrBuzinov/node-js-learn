import { asyncHandler } from "@/utils/asyncHandler.js";
import express from "express";
import {
  createMealsPlan,
  deleteMealsPlan,
  getMealsPlanByUserId,
  updateMealsPlan,
} from "./mealsPlanControllers.js";
import { validateSchema } from "@/utils/validation.js";
import { mealsPlanValidator } from "./mealsPlanValidators.js";

export const mealsPlanRoutes = express.Router();

mealsPlanRoutes.get("/:id", asyncHandler(getMealsPlanByUserId));
mealsPlanRoutes.post(
  "/",
  validateSchema(mealsPlanValidator),
  asyncHandler(createMealsPlan)
);
mealsPlanRoutes.patch(
  "/:id",
  validateSchema(mealsPlanValidator),
  asyncHandler(updateMealsPlan)
);
mealsPlanRoutes.delete("/:id", asyncHandler(deleteMealsPlan));
