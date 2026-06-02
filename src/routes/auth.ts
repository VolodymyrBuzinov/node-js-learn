import express from "express";
import { signin, logout, signup } from "../controllers/auth/authController.js";

export const authRoutes = express.Router();

authRoutes.post("/login", signin);

authRoutes.post("/signup", signup);

authRoutes.post("/logout", logout);
