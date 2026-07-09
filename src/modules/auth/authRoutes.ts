import { asyncHandler } from "@/utils/asyncHandler.js";
import { validateSchema } from "@/utils/validation.js";
import express from "express";
import { loginAuthValidator } from "./authValidators.js";
import { loginUser, logoutUser, refreshToken } from "./authControllers.js";
import { userAuthMiddleware } from "@/middlewares/authMiddlewares.js";

export const userAuthRoutes = express.Router();

userAuthRoutes.post(
  "/login",
  validateSchema(loginAuthValidator),
  asyncHandler(loginUser)
);
userAuthRoutes.post("/logout", userAuthMiddleware, asyncHandler(logoutUser));

userAuthRoutes.post("/refresh-token", asyncHandler(refreshToken));
