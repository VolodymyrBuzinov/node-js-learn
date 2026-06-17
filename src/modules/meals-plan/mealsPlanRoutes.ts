import { asyncHandler } from "@/utils/asyncHandler.js";
import express from "express";
import {
  createMealsPlan,
  resetMealsPlan,
  getMealsPlanByUserId,
  updateMealsPlan,
} from "./mealsPlanControllers.js";
import { validateSchema } from "@/utils/validation.js";
import { mealsPlanValidator } from "./mealsPlanValidators.js";

export const mealsPlanRoutes = express.Router();

mealsPlanRoutes.get("/:userId", asyncHandler(getMealsPlanByUserId));
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
mealsPlanRoutes.patch("/:id", asyncHandler(resetMealsPlan));
