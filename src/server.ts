import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import { userRoutes } from "./routes/userRoutes.js";
import { mealsRoutes } from "./routes/mealsRoutes.js";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/meals", mealsRoutes);
app.use(errorHandler);

export default app;
