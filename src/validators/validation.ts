import { HTTP_STATUS_CODES } from "@/consts.js";
import { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";

const formatZodError = (error: ZodError) => {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = issue.path.join(".") || "body";
    fields[field] = issue.message;
  }

  return {
    message: error.issues[0]?.message ?? "Validation failed",
    code: "VALIDATION_ERROR",
    fields,
  };
};

export const validateSchema = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.safeParse(req.body);
    if (error) {
      return res
        .status(HTTP_STATUS_CODES.BAD_REQUEST)
        .json({ error: formatZodError(error) });
    }
    next();
  };
};
