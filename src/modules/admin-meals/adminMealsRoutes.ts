import { asyncHandler } from "@/utils/asyncHandler.js";
import express from "express";
import {
  createMealAsAdmin,
  deleteMealAsAdmin,
  getMealByIdAsAdmin,
  getMealsAsAdmin,
  updateMealAsAdmin,
} from "./adminMealsControllers.js";
import {
  createMealAsAdminValidator,
  updateMealAsAdminValidator,
} from "./adminMealsValidators.js";
import { validateSchema } from "@/utils/validation.js";

export const adminMealsRoutes = express.Router();

adminMealsRoutes.get("/", asyncHandler(getMealsAsAdmin));

adminMealsRoutes.get("/:mealId", asyncHandler(getMealByIdAsAdmin));
adminMealsRoutes.post(
  "/",
  validateSchema(createMealAsAdminValidator),
  asyncHandler(createMealAsAdmin)
);

adminMealsRoutes.patch(
  "/:mealId",
  validateSchema(updateMealAsAdminValidator),
  asyncHandler(updateMealAsAdmin)
);

adminMealsRoutes.delete("/:mealId", asyncHandler(deleteMealAsAdmin));
