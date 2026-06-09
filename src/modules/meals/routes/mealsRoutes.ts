import {
  getMealById,
  getMeals,
} from "@/modules/meals/controllers/mealsController.js";
import { asyncHandler } from "@/utils/asyncHandler.js";
import express from "express";

export const mealsRoutes = express.Router();

mealsRoutes.get("/", asyncHandler(getMeals));
mealsRoutes.get("/:id", asyncHandler(getMealById));
