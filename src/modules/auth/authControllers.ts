import { Response, Request } from "express";
import {
  loginUserService,
  logoutUserService,
  refreshTokenService,
} from "./authService.js";
import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { clearAuthCookies, setAuthCookies } from "@/utils/index.js";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const data = await loginUserService(email, password);
  setAuthCookies(
    res,
    data.auth.accessToken,
    data.auth.refreshToken,
    data.auth.expiresAt,
    "user"
  );
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({
    message: "Login successful",
    data,
  });
};

export const logoutUser = async (req: Request, res: Response) => {
  await logoutUserService(req.cookies.accessToken);
  await clearAuthCookies(res, "user");
  return res
    .status(HTTP_STATUS_CODES.NO_CONTENT)
    .json({ message: "Logout successful" });
};

export const refreshToken = async (req: Request, res: Response) => {
  const data = await refreshTokenService(req.cookies?.refreshToken);
  setAuthCookies(
    res,
    data.accessToken,
    data.refreshToken,
    data.expiresAt,
    "user"
  );
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data });
};
