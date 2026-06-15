import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import { userRoutes } from "@/modules/user/userRoutes.js";
import { mealsRoutes } from "@/modules/meals/mealsRoutes.js";
import { mealsPlanRoutes } from "@/modules/meals-plan/mealsPlanRoutes.js";
import { dashboardRoutes } from "@/modules/dashboard/dashboardRoutes.js";
import { adminRoutes } from "./modules/admin/adminRoutes.js";
import { adminUsersRoutes } from "./modules/admin-users/adminUsersRoutes.js";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/meals", mealsRoutes);
app.use("/meals-plan", mealsPlanRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/users", adminUsersRoutes);
app.use(errorHandler);

export default app;
