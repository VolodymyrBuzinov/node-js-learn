import { asyncHandler } from "@/utils/asyncHandler.js";
import express from "express";
import { loginAdmin, logoutAdmin } from "./adminAuthControllers.js";
import { validateSchema } from "@/utils/validation.js";
import { loginAuthValidator } from "../auth/authValidators.js";

export const adminAuthRoutes = express.Router();

adminAuthRoutes.post(
  "/login",
  validateSchema(loginAuthValidator),
  asyncHandler(loginAdmin)
);

adminAuthRoutes.patch("/logout", asyncHandler(logoutAdmin));
