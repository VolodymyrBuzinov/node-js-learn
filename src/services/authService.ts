import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { AppError } from "./appError.js";
import { CODE_STATUS, ERROR_MESSAGES } from "@/consts.js";
import { User } from "@/types/auth.js";

const USERS_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../db/users.json"
);

const getUsers = async (): Promise<User[] | undefined> => {
  const users = await fs.readFile(USERS_PATH, "utf-8");
  const usersArray = JSON.parse(users);
  return Array.isArray(usersArray) ? usersArray : undefined;
};

const saveUsers = async (users: User[]) => {
  await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2), "utf-8");
};

export const signinService = async (email: string, password: string) => {
  const users = await getUsers();

  if (!users) {
    throw new AppError(
      CODE_STATUS.BAD_REQUEST,
      ERROR_MESSAGES.SOMETHING_WENT_WRONG
    );
  }

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    throw new AppError(
      CODE_STATUS.BAD_REQUEST,
      ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD
    );
  }

  return user;
};

export const signupService = async (
  email: string,
  password: string,
  name: string,
  gender: string
) => {
  const users = (await getUsers()) ?? [];

  if (users.some((user) => user.email === email)) {
    throw new AppError(
      CODE_STATUS.BAD_REQUEST,
      ERROR_MESSAGES.EMAIL_ALREADY_EXISTS
    );
  }

  const newUser: User = {
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    email,
    password,
    name,
    gender,
  };

  users.push(newUser);
  await saveUsers(users);

  return newUser;
};

export const logoutService = async (id: number) => {
  const users = await getUsers();

  if (!users) {
    throw new AppError(
      CODE_STATUS.BAD_REQUEST,
      ERROR_MESSAGES.SOMETHING_WENT_WRONG
    );
  }

  const user = users.find((user) => user.id === id);

  if (!user) {
    throw new AppError(CODE_STATUS.BAD_REQUEST, ERROR_MESSAGES.USER_NOT_FOUND);
  }

  return { id: user.id };
};
