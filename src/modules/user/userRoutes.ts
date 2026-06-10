import { asyncHandler } from "@/utils/asyncHandler.js";
import express from "express";
import { getUserById, updateUser } from "./userControllers.js";
import { validateSchema } from "@/utils/validation.js";
import { updateUserValidator } from "./userValidators.js";

export const userRoutes = express.Router();

userRoutes.get("/:userId", asyncHandler(getUserById));

userRoutes.patch(
  "/:userId",
  validateSchema(updateUserValidator),
  asyncHandler(updateUser)
);
