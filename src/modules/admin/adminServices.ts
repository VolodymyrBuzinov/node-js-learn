import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { AppError } from "@/services/appError.js";
import { prisma } from "@/config/db/prisma.js";

export const getAdminService = async (userId: string) => {
  const admin = await prisma.profiles.findUnique({
    where: {
      id: userId,
    },
  });

  if (!admin) {
    throw new AppError(HTTP_STATUS_CODES.BAD_REQUEST, "Profile not found");
  }
  return admin;
};
