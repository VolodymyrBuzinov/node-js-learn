import { asyncHandler } from "@/utils/asyncHandler.js";
import express from "express";
import {
  createUserAsAdmin,
  deleteUserAsAdmin,
  getUserByIdAsAdmin,
  getUsersAsAdmin,
} from "./adminUsersControllers.js";
import {
  createUserAsAdminValidator,
  getUsersAsAdminValidator,
} from "./adminUsersValidators.js";
import { validateQuerySchema, validateSchema } from "@/utils/validation.js";
import { adminAuthMiddleware } from "@/middlewares/authMiddlewares.js";

export const adminUsersRoutes = express.Router();

adminUsersRoutes.get(
  "/",
  adminAuthMiddleware,
  validateQuerySchema(getUsersAsAdminValidator),
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

adminUsersRoutes.delete(
  "/:userId",
  adminAuthMiddleware,
  asyncHandler(deleteUserAsAdmin)
);
