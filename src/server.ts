import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import { userRoutes } from "@/modules/user/userRoutes.js";
import { mealsRoutes } from "@/modules/meals/mealsRoutes.js";
import { mealsPlanRoutes } from "@/modules/meals-plan/mealsPlanRoutes.js";
import { dashboardRoutes } from "@/modules/dashboard/dashboardRoutes.js";
import { adminRoutes } from "./modules/admin/adminRoutes.js";
import { adminUsersRoutes } from "./modules/admin-users/adminUsersRoutes.js";
import { adminMealsRoutes } from "./modules/admin-meals/adminMealsRoutes.js";
import cookieParser from "cookie-parser";
import { adminAuthRoutes } from "./modules/admin-auth/adminAuthRoutes.js";
import { userAuthRoutes } from "./modules/auth/authRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/users/auth", userAuthRoutes);
app.use("/meals", mealsRoutes);
app.use("/meals-plan", mealsPlanRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/admin/auth", adminAuthRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/users", adminUsersRoutes);
app.use("/admin/meals", adminMealsRoutes);
app.use(errorHandler);

export default app;
