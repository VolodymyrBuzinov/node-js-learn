import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { userClient } from "@/config/supabase.js";
import { AppError } from "@/services/appError.js";
import { NextFunction, Request, Response } from "express";
import { pool } from "@/config/db/pool.js";

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

const getProfile = async (userId: string) => {
  const { rows } = await pool.query(
    `SELECT id, email, name, role FROM profiles WHERE id = $1`,
    [userId]
  );
  if (!rows[0]) {
    throw new AppError(HTTP_STATUS_CODES.UNAUTHORIZED, "Unauthorized");
  }
  return rows[0];
};

export const adminAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = await getToken(req);
  const userId = await getUser(token);
  res.locals.auth = { userId, role: "admin" };
  next();
};

export const userAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = await getToken(req);
  const userId = await getUser(token);
  await getProfile(userId);
  res.locals.auth = { userId, role: "user" };
  next();
};
