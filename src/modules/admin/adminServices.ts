import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { AppError } from "@/services/appError.js";
import fs from "fs/promises";
import path from "path";
import { Admin } from "./adminTypes.js";

const adminPath = path.join(
  process.cwd(),
  "src",
  "config",
  "db",
  "admins.json"
);

const getAdminsData = async () => {
  const adminData = await fs.readFile(adminPath, "utf-8");
  if (!adminData) {
    throw new AppError(HTTP_STATUS_CODES.BAD_REQUEST, "Invalid admin file");
  }
  const admins = JSON.parse(adminData);
  return (Array.isArray(admins) ? admins : []) as Admin[];
};

export const getAdminService = async (email: string, password: string) => {
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

export const getAdminByIdService = async (id: number) => {
  const admins = await getAdminsData();
  const adminById = admins.find((admin) => admin.id === id);
  if (!adminById) {
    throw new AppError(HTTP_STATUS_CODES.NOT_FOUND, "Admin not found");
  }
  return adminById;
};
