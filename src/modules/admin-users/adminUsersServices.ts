import { format } from "date-fns";
import {
  getUserByIdService,
  getUsersData,
  usersPath,
} from "../user/userService.js";
import { DATE_FORMAT, HTTP_STATUS_CODES } from "@/config/consts.js";
import { User } from "../user/userTypes.js";
import fs from "fs/promises";
import { AppError } from "@/services/appError.js";

export const createUserAsAdminService = async (
  name: string,
  email: string,
  password: string
) => {
  const users = await getUsersData();
  const isUserExists = users.some((user) => user.email === email);
  if (isUserExists) {
    throw new AppError(HTTP_STATUS_CODES.BAD_REQUEST, "User already exists");
  }
  const newUser: User = {
    id: users.length + 1,
    name,
    email,
    password,
    createdAt: format(new Date(), DATE_FORMAT),
    updatedAt: null,
    age: 0,
    weight: 0,
    gender: "",
    height: 0,
    activityLevel: "",
  };
  users.push(newUser);
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
  return newUser;
};

export const updateUserAsAdminService = async (
  userId: number,
  newUser: Partial<User>
) => {
  const users = await getUsersData();
  const user = await getUserByIdService(userId);

  const updatedUser = {
    ...user,
    ...newUser,
  };
  const updatedUsers = users.map((user) =>
    user.id === userId ? updatedUser : user
  );
  await fs.writeFile(usersPath, JSON.stringify(updatedUsers, null, 2));
  return updatedUser;
};

export const deleteUserAsAdminService = async (userId: number) => {
  const users = await getUsersData();
  await getUserByIdService(userId);
  const filteredUsers = users.filter((user) => user.id !== userId);
  await fs.writeFile(usersPath, JSON.stringify(filteredUsers, null, 2));
  return filteredUsers;
};
