import fs from "fs/promises";
import path from "path";
import { AppError } from "@/services/appError.js";
import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { User } from "@/modules/user/userTypes.js";

const usersPath = path.join(process.cwd(), "src", "config", "db", "users.json");

const getUsersData = async () => {
  const users = await fs.readFile(usersPath, "utf-8");

  if (!users) {
    throw new AppError(HTTP_STATUS_CODES.BAD_REQUEST, "Invalid users file");
  }
  const usersArray = JSON.parse(users);

  return (Array.isArray(usersArray) ? usersArray : []) as User[];
};

export const loginUserService = async (email: string, password: string) => {
  const users = await getUsersData();

  const user = users.find((user) => user.email === email);

  if (!user) {
    throw new AppError(HTTP_STATUS_CODES.UNAUTHORIZED, "Invalid credentials");
  }
  if (user.password !== password) {
    throw new AppError(HTTP_STATUS_CODES.UNAUTHORIZED, "Invalid password");
  }

  return user;
};

export const logoutUserService = async (userId: number) => {
  const users = await getUsersData();
  const user = users.find((user) => user.id === userId);
  if (!user) {
    throw new AppError(HTTP_STATUS_CODES.NOT_FOUND, "User not found");
  }
  return user;
};

export const updateUserService = async (
  userId: number,
  { name, age, weight, gender, height, activityLevel }: Partial<User>
) => {
  const users = await getUsersData();
  const user = users.find((user) => user.id === userId);
  if (!user) {
    throw new AppError(HTTP_STATUS_CODES.NOT_FOUND, "User not found");
  }

  return {
    ...user,
    ...{ name, age, weight, gender, height, activityLevel },
  };
};
