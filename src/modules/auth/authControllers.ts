import { Response, Request } from "express";
import {
  loginUserService,
  logoutUserService,
  refreshTokenService,
} from "./authService.js";
import { HTTP_STATUS_CODES } from "@/config/consts.js";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const data = await loginUserService(email, password);
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({
    message: "Login successful",
    data,
  });
};

export const logoutUser = async (req: Request, res: Response) => {
  await logoutUserService(req.cookies.accessToken);
  return res
    .status(HTTP_STATUS_CODES.NO_CONTENT)
    .json({ message: "Logout successful" });
};

export const refreshToken = async (req: Request, res: Response) => {
  const data = await refreshTokenService(req.cookies?.refreshToken);
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data });
};
