import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

// app.use("/auth", authRoutes);
// app.use("/todos", todosRoutes);
app.use(errorHandler);

export default app;
