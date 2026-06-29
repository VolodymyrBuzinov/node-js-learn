import { asyncHandler } from "@/utils/asyncHandler.js";
import { validateSchema } from "@/utils/validation.js";
import express from "express";
import { loginAuthValidator, validateAuthId } from "./authValidators.js";
import { loginUser, logoutUser, refreshToken } from "./authControllers.js";

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

userRoutes.post("/refresh-token", asyncHandler(refreshToken));
