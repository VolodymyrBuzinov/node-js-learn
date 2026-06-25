import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { adminClient, userClient } from "@/config/supabase.js";
import { AppError } from "@/services/appError.js";
import { NextFunction, Request, Response } from "express";

const getToken = (req: Request) => {
  const token = req.cookies?.accessToken;
  if (!token) {
    throw new AppError(HTTP_STATUS_CODES.UNAUTHORIZED, "Unauthorized");
  }
  return token;
};

const getUser = async (token: string) => {
  const { data, error } = await userClient.auth.getUser(token);
  if (error || !data?.user?.id) {
    throw new AppError(HTTP_STATUS_CODES.UNAUTHORIZED, "Unauthorized");
  }
  return data.user.id;
};

const getProfile = async (userId: string, isAdmin: boolean) => {
  const { data: profile, error: profileError } = await (isAdmin
    ? adminClient
    : userClient
  )
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (profileError) {
    throw new AppError(HTTP_STATUS_CODES.BAD_REQUEST, profileError?.message);
  }
  return profile;
};

const getUserData = async (userId: string) => {
  const { data, error } = await userClient
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) {
    throw new AppError(HTTP_STATUS_CODES.BAD_REQUEST, error?.message);
  }
  return data;
};

export const adminAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = await getToken(req);
  const userId = await getUser(token);
  const profile = await getProfile(userId, true);
  res.locals.admin = profile;
  next();
};

export const userAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = await getToken(req);
  const userId = await getUser(token);
  await getProfile(userId, false);
  const userData = await getUserData(userId);
  res.locals.user = userData;
  next();
};
