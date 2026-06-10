import { Request, Response } from "express";
import { DATE_FORMAT, HTTP_STATUS_CODES } from "@/config/consts.js";
import { getRecommendedMealsService } from "./recommendedMealsServices.js";
import { format } from "date-fns";

export const getRecommendedMeals = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const today = format(new Date(), DATE_FORMAT);
  const recommendedMeals = await getRecommendedMealsService(Number(userId));
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: recommendedMeals });
};
