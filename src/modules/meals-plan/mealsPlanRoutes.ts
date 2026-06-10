import { asyncHandler } from "@/utils/asyncHandler.js";
import express from "express";
import {
  createMealsPlan,
  deleteMealsPlan,
  getMealsPlanByUserId,
  updateMealsPlan,
} from "./mealsPlanControllers.js";

export const mealsPlanRoutes = express.Router();

mealsPlanRoutes.get("/:id", asyncHandler(getMealsPlanByUserId));
mealsPlanRoutes.post("/", asyncHandler(createMealsPlan));
mealsPlanRoutes.patch("/:id", asyncHandler(updateMealsPlan));
mealsPlanRoutes.delete("/:id", asyncHandler(deleteMealsPlan));
