import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { Request, Response } from "express";
import {
  loginAdminService,
  logoutAdminService,
  refreshTokenAdminService,
} from "./adminAuthServices.js";

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const data = await loginAdminService(email, password);
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data });
};

export const logoutAdmin = async (_req: Request, res: Response) => {
  await logoutAdminService();
  return res
    .status(HTTP_STATUS_CODES.NO_CONTENT)
    .json({ message: "Logout successful" });
};

export const refreshTokenAdmin = async (req: Request, res: Response) => {
  const data = await refreshTokenAdminService(req.cookies?.refreshToken);
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data });
};
