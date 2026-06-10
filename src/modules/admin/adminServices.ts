import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { AppError } from "@/services/appError.js";
import fs from "fs/promises";
import path from "path";

const adminPath = path.join(process.cwd(), "src", "config", "db", "admin.json");

export const getAdminService = async (email: number, password: string) => {
  const adminData = await fs.readFile(adminPath, "utf-8");
  if (!adminData) {
    throw new AppError(HTTP_STATUS_CODES.BAD_REQUEST, "Invalid admin file");
  }
  const admin = JSON.parse(adminData);
  if (admin.email !== email) {
    throw new AppError(HTTP_STATUS_CODES.UNAUTHORIZED, "Invalid admin email");
  }
  if (admin.password !== password) {
    throw new AppError(
      HTTP_STATUS_CODES.UNAUTHORIZED,
      "Invalid admin password"
    );
  }
  return admin;
};
