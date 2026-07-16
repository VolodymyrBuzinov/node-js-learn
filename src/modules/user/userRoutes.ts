import { asyncHandler } from "@/utils/asyncHandler.js";
import express from "express";
import {
  deleteUserAvatar,
  getUserById,
  updateUser,
  updateUserAvatar,
} from "./userControllers.js";
import { validateSchema } from "@/utils/validation.js";
import { updateUserValidator } from "./userValidators.js";
import { userAuthMiddleware } from "@/middlewares/authMiddlewares.js";
import {
  parseImageUpload,
  validateImageUpload,
} from "@/middlewares/imageUploadMiddleware.js";

export const userRoutes = express.Router();

userRoutes.get("/:userId", userAuthMiddleware, asyncHandler(getUserById));

userRoutes.patch(
  "/:userId",
  userAuthMiddleware,
  validateSchema(updateUserValidator),
  asyncHandler(updateUser)
);

userRoutes.patch(
  "/:userId/image",
  userAuthMiddleware,
  parseImageUpload,
  validateImageUpload,
  asyncHandler(updateUserAvatar)
);

userRoutes.delete(
  "/:userId/image",
  userAuthMiddleware,
  asyncHandler(deleteUserAvatar)
);
