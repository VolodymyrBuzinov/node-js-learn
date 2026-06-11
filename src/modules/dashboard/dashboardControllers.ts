import { Request, Response } from "express";
import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { getDashboardService } from "./dashboardServices.js";

export const getDashboard = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { date } = req.query;
  const dashboard = await getDashboardService(Number(userId), date as string);
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: dashboard });
};
