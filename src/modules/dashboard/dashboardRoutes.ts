import { asyncHandler } from "@/utils/asyncHandler.js";
import express from "express";
import { getDashboard } from "./dashboardControllers.js";

export const dashboardRoutes = express.Router();

dashboardRoutes.get("/:userId", asyncHandler(getDashboard));
