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
  getMealsAsAdminValidator,
  updateMealAsAdminValidator,
} from "./adminMealsValidators.js";
import { validateQuerySchema, validateSchema } from "@/utils/validation.js";
import { adminAuthMiddleware } from "@/middlewares/authMiddlewares.js";

export const adminMealsRoutes = express.Router();

adminMealsRoutes.get(
  "/",
  adminAuthMiddleware,
  validateQuerySchema(getMealsAsAdminValidator),
  asyncHandler(getMealsAsAdmin)
);

adminMealsRoutes.get(
  "/:mealId",
  adminAuthMiddleware,
  asyncHandler(getMealByIdAsAdmin)
);
adminMealsRoutes.post(
  "/",
  adminAuthMiddleware,
  validateSchema(createMealAsAdminValidator),
  asyncHandler(createMealAsAdmin)
);

adminMealsRoutes.patch(
  "/:mealId",
  adminAuthMiddleware,
  validateSchema(updateMealAsAdminValidator),
  asyncHandler(updateMealAsAdmin)
);

adminMealsRoutes.delete("/:mealId", asyncHandler(deleteMealAsAdmin));
