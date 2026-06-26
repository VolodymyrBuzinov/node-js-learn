import { asyncHandler } from "@/utils/asyncHandler.js";
import express from "express";
import {
  createUserAsAdmin,
  deleteUserAsAdmin,
  getUserByIdAsAdmin,
  getUsersAsAdmin,
  updateUserAsAdmin,
} from "./adminUsersControllers.js";
import {
  createUserAsAdminValidator,
  getUsersAsAdminValidator,
  updateUserAsAdminValidator,
} from "./adminUsersValidators.js";
import { validateSchema } from "@/utils/validation.js";
import { adminAuthMiddleware } from "@/middlewares/authMiddlewares.js";

export const adminUsersRoutes = express.Router();

adminUsersRoutes.get(
  "/",
  adminAuthMiddleware,
  validateSchema(getUsersAsAdminValidator),
  asyncHandler(getUsersAsAdmin)
);

adminUsersRoutes.get(
  "/:userId",
  adminAuthMiddleware,
  asyncHandler(getUserByIdAsAdmin)
);

adminUsersRoutes.post(
  "/",
  adminAuthMiddleware,
  validateSchema(createUserAsAdminValidator),
  asyncHandler(createUserAsAdmin)
);

adminUsersRoutes.patch(
  "/:userId",
  adminAuthMiddleware,
  validateSchema(updateUserAsAdminValidator),
  asyncHandler(updateUserAsAdmin)
);

adminUsersRoutes.delete(
  "/:userId",
  adminAuthMiddleware,
  asyncHandler(deleteUserAsAdmin)
);
