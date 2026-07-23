import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { Request, Response } from "express";
import {
  loginAdminService,
  logoutAdminService,
  refreshTokenAdminService,
} from "./adminAuthServices.js";
import { clearAuthCookies, setAuthCookies } from "@/utils/index.js";

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const data = await loginAdminService(email, password);
  setAuthCookies(
    res,
    data.auth.accessToken,
    data.auth.refreshToken,
    data.auth.expiresAt,
    "admin"
  );
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: data.user });
};

export const logoutAdmin = async (req: Request, res: Response) => {
  await logoutAdminService(req.cookies.adminAccessToken);
  clearAuthCookies(res, "admin");

  return res.status(HTTP_STATUS_CODES.NO_CONTENT).end();
};

export const refreshTokenAdmin = async (req: Request, res: Response) => {
  try {
    const data = await refreshTokenAdminService(req.cookies?.adminRefreshToken);
    setAuthCookies(
      res,
      data.accessToken,
      data.refreshToken,
      data.expiresAt,
      "admin"
    );
  } catch (error) {
    clearAuthCookies(res, "admin");
    throw error;
  }

  return res.status(HTTP_STATUS_CODES.SUCCESS).end();
};
