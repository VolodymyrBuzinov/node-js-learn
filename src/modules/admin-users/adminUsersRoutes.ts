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
  updateUserAsAdminValidator,
} from "./adminUsersValidators.js";
import { validateSchema } from "@/utils/validation.js";

export const adminUsersRoutes = express.Router();

adminUsersRoutes.get("/", asyncHandler(getUsersAsAdmin));

adminUsersRoutes.get("/:userId", asyncHandler(getUserByIdAsAdmin));

adminUsersRoutes.post(
  "/",
  validateSchema(createUserAsAdminValidator),
  asyncHandler(createUserAsAdmin)
);

adminUsersRoutes.patch(
  "/:userId",
  validateSchema(updateUserAsAdminValidator),
  asyncHandler(updateUserAsAdmin)
);

adminUsersRoutes.delete("/:userId", asyncHandler(deleteUserAsAdmin));
