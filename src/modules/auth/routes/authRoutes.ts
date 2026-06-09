import { asyncHandler } from "@/utils/asyncHandler.js";
import { validateSchema } from "@/utils/validation.js";
import express from "express";
import {
  loginAuthValidator,
  validateAuthId,
} from "../validators/authValidators.js";
import { loginUser, logoutUser } from "../controllers/authControllers.js";

export const userRoutes = express.Router();

userRoutes.post(
  "/login",
  validateSchema(loginAuthValidator),
  asyncHandler(loginUser)
);
userRoutes.post(
  "/logout",
  validateSchema(validateAuthId),
  asyncHandler(logoutUser)
);
