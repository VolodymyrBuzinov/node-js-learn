import { Request, Response } from "express";
import {
  deleteUserAvatarService,
  getUserByIdService,
  updateUserAvatarService,
  updateUserService,
} from "./userService.js";
import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { matchOwnership } from "@/utils/index.js";

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  matchOwnership(userId as string, res.locals?.auth?.userId);
  const user = await getUserByIdService(userId as string);
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: { ...user } });
};

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { name, age, weight, gender, height, activityLevel } = req.body;
  matchOwnership(userId as string, res.locals?.auth?.userId);
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

export const updateUserAvatar = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const image = res.locals.imageUpload;
  matchOwnership(userId as string, res.locals?.auth?.userId);
  const data = await updateUserAvatarService(userId as string, image);
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data });
};

export const deleteUserAvatar = async (req: Request, res: Response) => {
  const { userId } = req.params;
  matchOwnership(userId as string, res.locals?.auth?.userId);
  await deleteUserAvatarService(userId as string);
  return res.status(HTTP_STATUS_CODES.NO_CONTENT).json({});
};
