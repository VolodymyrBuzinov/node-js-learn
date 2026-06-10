import { asyncHandler } from "@/utils/asyncHandler.js";
import express from "express";
import { getAdmin } from "./adminControllers.js";

export const adminRoutes = express.Router();

adminRoutes.get("/", asyncHandler(getAdmin));
