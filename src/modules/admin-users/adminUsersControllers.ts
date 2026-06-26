import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { Request, Response } from "express";
import {
  AdminUsersFilters,
  createUserAsAdminService,
  deleteUserAsAdminService,
  getAdminUsersWithFiltersService,
  updateUserAsAdminService,
} from "./adminUsersServices.js";
import { getUserByIdService } from "../user/userService.js";

export const getUsersAsAdmin = async (req: Request, res: Response) => {
  const { sortBy, sortOrder, email } = req.query;

  const users = await getAdminUsersWithFiltersService({
    sortBy,
    sortOrder,
    email,
  } as AdminUsersFilters);

  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: users });
};

export const getUserByIdAsAdmin = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await getUserByIdService(Number(userId));
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: user });
};

export const createUserAsAdmin = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await createUserAsAdminService(name, email, password);
  return res.status(HTTP_STATUS_CODES.CREATED).json({ data: user });
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
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ data: user });
};

export const deleteUserAsAdmin = async (req: Request, res: Response) => {
  const { userId } = req.params;
  await deleteUserAsAdminService(Number(userId));
  return res.status(HTTP_STATUS_CODES.NO_CONTENT).json({});
};
