import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { Request, Response } from "express";
import {
  createUserAsAdminService,
  deleteUserAsAdminService,
  getUsersAsAdminService,
  updateUserAsAdminService,
} from "./adminUsersServices.js";

export const getUsersAsAdmin = async (_req: Request, res: Response) => {
  const users = await getUsersAsAdminService();
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: { users } });
};

export const createUserAsAdmin = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await createUserAsAdminService(name, email, password);
  return res.status(HTTP_STATUS_CODES.CREATED).json({ data: { user } });
};

export const updateUserAsAdmin = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { name, email, password, age, weight, gender, height, activityLevel } =
    req.body;
  const user = await updateUserAsAdminService(Number(userId), {
    name,
    email,
    password,
    age,
    weight,
    gender,
    height,
    activityLevel,
  });
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: { user } });
};

export const deleteUserAsAdmin = async (req: Request, res: Response) => {
  const { userId } = req.params;
  await deleteUserAsAdminService(Number(userId));
  return res.status(HTTP_STATUS_CODES.NO_CONTENT).json({});
};
