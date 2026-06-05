import { asyncHandler } from "../utils/asyncHandler.js";
import express from "express";
import {
  loginUser,
  logoutUser,
  updateUser,
} from "../controllers/userControllers.js";
import { validateSchema } from "../validators/validation.js";
import {
  loginUserValidator,
  updateUserValidator,
  validateUserId,
} from "../validators/userValidators.js";

export const userRoutes = express.Router();

userRoutes.post(
  "/login",
  validateSchema(loginUserValidator),
  asyncHandler(loginUser)
);
userRoutes.post(
  "/logout",
  validateSchema(validateUserId),
  asyncHandler(logoutUser)
);
userRoutes.patch(
  "/:userId",
  validateSchema(updateUserValidator),
  asyncHandler(updateUser)
);
