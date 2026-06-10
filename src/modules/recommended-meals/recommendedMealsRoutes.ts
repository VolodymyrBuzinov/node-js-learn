import { asyncHandler } from "@/utils/asyncHandler.js";
import express from "express";
import { getRecommendedMeals } from "./recommendedMealsControllers.js";

export const recommendedMealsRoutes = express.Router();

recommendedMealsRoutes.get("/:userId", asyncHandler(getRecommendedMeals));
