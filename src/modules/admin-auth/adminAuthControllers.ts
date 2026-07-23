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
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data });
};

export const logoutAdmin = async (req: Request, res: Response) => {
  await logoutAdminService(req.cookies.accessToken);
  await clearAuthCookies(res, "admin");
  return res
    .status(HTTP_STATUS_CODES.NO_CONTENT)
    .json({ message: "Logout successful" });
};

export const refreshTokenAdmin = async (req: Request, res: Response) => {
  const data = await refreshTokenAdminService(req.cookies?.refreshToken);

  setAuthCookies(
    res,
    data.accessToken,
    data.refreshToken,
    data.expiresAt,
    "admin"
  );

  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data });
};
