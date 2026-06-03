import express from "express";
import { signin, logout, signup } from "@/controllers/auth/authController.js";
import { asyncHandler } from "@/utils/asyncHandler.js";
import {
  signinValidator,
  signupValidator,
  logoutValidator,
} from "@/validators/authValidator.js";

export const authRoutes = express.Router();

authRoutes.post("/login", signinValidator, asyncHandler(signin));

authRoutes.post("/signup", signupValidator, asyncHandler(signup));

authRoutes.post("/logout", logoutValidator, asyncHandler(logout));
