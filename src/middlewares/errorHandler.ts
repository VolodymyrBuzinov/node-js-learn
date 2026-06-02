import { NextFunction, Request, Response } from "express";
import { AppError } from "../services/appError.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError && err.isOperational) {
    return res.status(err.status).json({
      error: {
        message: err.message,
        code: err.code,
      },
    });
  }

  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: {
        message: "Something went wrong",
        code: err.code ?? "INTERNAL_ERROR",
      },
    });
  }

  return res.status(500).json({
    error: { message: "Internal server error", code: "INTERNAL_ERROR" },
  });
};
