import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { AppError } from "../services/appError.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestError = err as Error & { status?: number; type?: string };

  if (
    requestError.status === HTTP_STATUS_CODES.PAYLOAD_TOO_LARGE ||
    requestError.type === "entity.too.large"
  ) {
    return res.status(HTTP_STATUS_CODES.PAYLOAD_TOO_LARGE).json({
      error: {
        message: "Request body is too large",
        code: "PAYLOAD_TOO_LARGE",
      },
    });
  }

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
