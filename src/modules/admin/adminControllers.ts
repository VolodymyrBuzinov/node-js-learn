import { Request, Response } from "express";
import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { getAdminService } from "./adminServices.js";

export const getAdmin = async (_req: Request, res: Response) => {
  const { userId } = res.locals.auth;
  const admin = await getAdminService(userId);
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: admin });
};
