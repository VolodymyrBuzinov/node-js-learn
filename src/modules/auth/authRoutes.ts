import { asyncHandler } from "@/utils/asyncHandler.js";
import { validateSchema } from "@/utils/validation.js";
import express from "express";
import { loginAuthValidator, validateAuthId } from "./authValidators.js";
import { loginUser, logoutUser, refreshToken } from "./authControllers.js";

export const userAuthRoutes = express.Router();

userAuthRoutes.post(
  "/login",
  validateSchema(loginAuthValidator),
  asyncHandler(loginUser)
);
userAuthRoutes.post(
  "/logout",
  validateSchema(validateAuthId),
  asyncHandler(logoutUser)
);

userAuthRoutes.post("/refresh-token", asyncHandler(refreshToken));
