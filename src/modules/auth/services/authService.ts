import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { getUsersData } from "@/modules/user/services/userService.js";
import { AppError } from "@/services/appError.js";

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
