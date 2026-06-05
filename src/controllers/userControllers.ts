import { Request, Response } from "express";
import {
  loginUserService,
  logoutUserService,
  updateUserService,
} from "@/services/userService.js";
import { HTTP_STATUS_CODES } from "@/consts.js";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginUserService(email, password);
  return res
    .status(HTTP_STATUS_CODES.SUCCESS)
    .json({ message: "Login successful", data: { user } });
};

export const logoutUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  await logoutUserService(userId);
  return res
    .status(HTTP_STATUS_CODES.NO_CONTENT)
    .json({ message: "Logout successful" });
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
    .json({ message: "User updated successfully", data: { user } });
};
