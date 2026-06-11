import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { Request, Response } from "express";
import {
  getAdminByIdService,
  getAdminService,
} from "../admin/adminServices.js";

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const admin = await getAdminService(email, password);
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: { admin } });
};

export const logoutAdmin = async (req: Request, res: Response) => {
  const { adminId } = req.body;
  await getAdminByIdService(adminId);
  return res.status(HTTP_STATUS_CODES.NO_CONTENT).json({});
};
