import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { Admin } from "./adminTypes.js";
import { pool } from "@/config/db/pool.js";
import { AppError } from "@/services/appError.js";

export const getAdminService = async (email: string, password: string) => {
  const { rows } = await pool.query(
    "SELECT * FROM admins WHERE email = $1 AND password = $2",
    [email, password]
  );
  if (!rows.length) {
    throw new AppError(
      HTTP_STATUS_CODES.UNAUTHORIZED,
      "Invalid admin email or password"
    );
  }
  return rows[0] as Admin;
};

export const getAdminByIdService = async (id: number) => {
  const { rows } = await pool.query("SELECT * FROM admins WHERE id = $1", [id]);
  if (!rows.length) {
    throw new AppError(HTTP_STATUS_CODES.BAD_REQUEST, "Admin not found");
  }
  return rows[0] as Admin;
};
