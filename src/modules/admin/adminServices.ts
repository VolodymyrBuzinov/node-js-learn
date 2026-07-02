import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { AppError } from "@/services/appError.js";
import { pool } from "@/config/db/pool.js";

export const getAdminService = async (userId: string) => {
  const { rows } = await pool.query(
    `SELECT id, email, name, role FROM profiles WHERE id = $1`,
    [userId]
  );
  if (!rows[0]) {
    throw new AppError(HTTP_STATUS_CODES.BAD_REQUEST, "Profile not found");
  }
  return rows[0];
};
