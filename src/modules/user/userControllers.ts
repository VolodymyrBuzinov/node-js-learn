import { Request, Response } from "express";
import { getUserByIdService, updateUserService } from "./userService.js";
import { HTTP_STATUS_CODES } from "@/config/consts.js";

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await getUserByIdService(userId as string);
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: { ...user } });
};

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { name, age, weight, gender, height, activityLevel } = req.body;
  const user = await updateUserService(userId as string, {
    name,
    age,
    weight,
    gender,
    height,
    activityLevel,
  });
  return res
    .status(HTTP_STATUS_CODES.SUCCESS)
    .json({ message: "User updated successfully", data: { ...user } });
};
