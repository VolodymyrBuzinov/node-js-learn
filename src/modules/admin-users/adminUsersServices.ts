import { format } from "date-fns";
import { DATE_FORMAT, HTTP_STATUS_CODES } from "@/config/consts.js";
import { User } from "../user/userTypes.js";
import { AppError } from "@/services/appError.js";
import { pool } from "@/config/db/pool.js";
import { adminClient } from "@/config/supabase.js";

export interface AdminUsersFilters {
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  email?: string;
}

export const getAdminUsersWithFiltersService = async ({
  sortBy,
  sortOrder = "ASC",
  email,
}: AdminUsersFilters) => {
  const conditions: string[] = [];
  const values: string[] = [];

  if (email) {
    values.push(`%${email}%`);
    conditions.push(`email ILIKE $${values.length}`);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  const orderClause =
    sortBy === "name" ? `ORDER BY name ${sortOrder}, id ${sortOrder}` : "";

  const { rows } = await pool.query(
    `SELECT id, name, email, created_at AS "createdAt", updated_at AS "updatedAt",
     age, weight, gender, height, activity_level AS "activityLevel" FROM users
    ${whereClause}
    ${orderClause}
    `,
    values
  );

  return rows as User[];
};

export const getUserByIdService = async (userId: string) => {
  const { rows } = await pool.query(
    `SELECT id, name, email, created_at AS "createdAt", updated_at AS "updatedAt",
     age, weight, gender, height, activity_level AS "activityLevel" FROM users WHERE id = $1`,
    [userId]
  );
  return rows[0] as User;
};

export const createUserAsAdminService = async (
  name: string,
  email: string,
  password: string
) => {
  const { rows: existing } = await pool.query(
    "SELECT 1 FROM users WHERE email = $1",
    [email]
  );
  if (existing.length) {
    throw new AppError(HTTP_STATUS_CODES.BAD_REQUEST, "User already exists");
  }

  const { data: authData, error: authError } =
    await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name },
    });

  if (authError || !authData.user) {
    throw new AppError(
      HTTP_STATUS_CODES.BAD_REQUEST,
      authError?.message ?? "Failed to create user",
      authError?.code
    );
  }

  const userId = authData.user.id;
  const createdAt = format(new Date(), DATE_FORMAT);

  try {
    await pool.query(
      `INSERT INTO profiles (id, email, name, role, created_at)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, email, name, "user", createdAt]
    );

    await pool.query(
      `INSERT INTO users (id, name, email, created_at, age, weight, gender, height, activity_level)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [userId, name, email, createdAt, 0, 0, "", 0, ""]
    );
  } catch (error) {
    await adminClient.auth.admin.deleteUser(userId);
    throw error;
  }

  const { rows } = await pool.query(
    `SELECT id, name, email, created_at AS "createdAt", updated_at AS "updatedAt",
     age, weight, gender, height, activity_level AS "activityLevel"
     FROM users WHERE id = $1`,
    [userId]
  );

  return { ...rows[0] } as User;
};

export const deleteUserAsAdminService = async (userId: string) => {
  await getUserByIdService(userId);
  await adminClient.auth.admin.deleteUser(userId);
  await pool.query("DELETE FROM users WHERE id = $1", [userId]);
  return userId;
};
