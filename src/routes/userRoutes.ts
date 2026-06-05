import { asyncHandler } from "../utils/asyncHandler.js";
import express from "express";
import {
  loginUser,
  logoutUser,
  updateUser,
} from "../controllers/userControllers.js";

export const userRoutes = express.Router();

userRoutes.get("/login", asyncHandler(loginUser));
userRoutes.post("/logout", asyncHandler(logoutUser));
userRoutes.patch("/:userId", asyncHandler(updateUser));
