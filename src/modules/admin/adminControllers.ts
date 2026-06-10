import { Request, Response } from "express";
import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { getAdminService } from "./adminServices.js";

export const getAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const admin = await getAdminService(email, password);
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: { admin } });
};
