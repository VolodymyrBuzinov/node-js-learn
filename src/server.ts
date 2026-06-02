import express from "express";
import type { Request, Response } from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import { authRoutes } from "./routes/auth.js";
import { todosRoutes } from "./routes/todos.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/todos", todosRoutes);
app.use(errorHandler);

export default app;
