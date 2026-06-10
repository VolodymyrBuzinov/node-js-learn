import { asyncHandler } from "@/utils/asyncHandler.js";
import express from "express";
import { updateUser } from "./userControllers.js";
import { validateSchema } from "@/utils/validation.js";
import { updateUserValidator } from "./userValidators.js";
import { getRecommendedMeals } from "@/modules/meals/mealsController.js";

export const userRoutes = express.Router();

userRoutes.patch(
  "/:userId",
  validateSchema(updateUserValidator),
  asyncHandler(updateUser)
);

userRoutes.get("/:userId/recommended-meals", asyncHandler(getRecommendedMeals));
