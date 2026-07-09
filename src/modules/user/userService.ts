import { AppError } from "@/services/appError.js";
import { DATE_FORMAT, HTTP_STATUS_CODES } from "@/config/consts.js";
import { User } from "@/modules/user/userTypes.js";
import { prisma } from "@/config/db/prisma.js";
import { format } from "date-fns";

export const getUsersData = async () => {
  const users = await prisma.public_users.findMany();
  return users;
};

export const getUserByIdService = async (userId: string) => {
  const user = await prisma.public_users.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new AppError(HTTP_STATUS_CODES.NOT_FOUND, "User not found");
  }
  return user;
};

export const updateUserService = async (
  userId: string,
  data: Partial<User>
) => {
  await getUserByIdService(userId);
  const updatedUser = await prisma.public_users.update({
    where: {
      id: userId,
    },
    data: {
      ...data,
      updatedAt: format(new Date(), DATE_FORMAT),
    },
  });

  if (data.name) {
    await prisma.profiles.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name,
      },
    });
  }

  return updatedUser;
};
