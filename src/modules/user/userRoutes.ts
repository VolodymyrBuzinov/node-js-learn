import { asyncHandler } from "@/utils/asyncHandler.js";
import express from "express";
import { getUserById, updateUser } from "./userControllers.js";
import { validateSchema } from "@/utils/validation.js";
import { updateUserValidator } from "./userValidators.js";
import { userAuthMiddleware } from "@/middlewares/authMiddlewares.js";

export const userRoutes = express.Router();

userRoutes.get("/:userId", userAuthMiddleware, asyncHandler(getUserById));

userRoutes.patch(
  "/:userId",
  userAuthMiddleware,
  validateSchema(updateUserValidator),
  asyncHandler(updateUser)
);
