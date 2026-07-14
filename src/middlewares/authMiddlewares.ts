import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { userClient } from "@/config/supabase.js";
import { AppError } from "@/services/appError.js";
import { asyncHandler } from "@/utils/asyncHandler.js";
import { NextFunction, Request, Response } from "express";

const getToken = (req: Request) => {
  const token = req.cookies?.accessToken;
  if (!token) {
    throw new AppError(
      HTTP_STATUS_CODES.UNAUTHORIZED,
      "Unauthorized",
      "access_token_not_found"
    );
  }
  return token;
};

const getUser = async (token: string) => {
  const { data, error } = await userClient.auth.getUser(token);
  if (error || !data?.user?.id) {
    throw new AppError(
      HTTP_STATUS_CODES.UNAUTHORIZED,
      "Unauthorized",
      error?.code
    );
  }
  return data.user.id;
};

export const adminAuthMiddleware = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = getToken(req);
  const userId = await getUser(token);
  res.locals.auth = { userId, role: "admin" };
  next();
});

export const userAuthMiddleware = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = getToken(req);
  const userId = await getUser(token);
  res.locals.auth = { userId, role: "user" };
  next();
});
