import { format } from "date-fns";
import { getUserByIdService, getUsersData } from "../user/userService.js";
import { DATE_FORMAT, HTTP_STATUS_CODES } from "@/config/consts.js";
import { User } from "../user/userTypes.js";
import { AppError } from "@/services/appError.js";
import { pool } from "@/config/db/pool.js";

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

export const createUserAsAdminService = async (
  name: string,
  email: string,
  password: string
) => {
  const users = await getUsersData();
  const isUserExists = users.some((user) => user.email === email);
  if (isUserExists) {
    throw new AppError(HTTP_STATUS_CODES.BAD_REQUEST, "User already exists");
  }
  const newUser: User = {
    id: users.length + 1,
    name,
    email,
    password,
    createdAt: format(new Date(), DATE_FORMAT),
    updatedAt: null,
    age: 0,
    weight: 0,
    gender: "",
    height: 0,
    activityLevel: "",
  };
  await pool.query(
    "INSERT INTO users (name, email, password, created_at, updated_at, age, weight, gender, height, activity_level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
    [
      newUser.name,
      newUser.email,
      newUser.password,
      newUser.createdAt,
      newUser.updatedAt,
      newUser.age,
      newUser.weight,
      newUser.gender,
      newUser.height,
      newUser.activityLevel,
    ]
  );
  return newUser;
};

export const updateUserAsAdminService = async (
  userId: number,
  newUser: Partial<User>
) => {
  const existing = await getUserByIdService(userId);
  const { rows } = await pool.query(
    "UPDATE users SET name = $1, email = $2, password = $3, age = $4, weight = $5, gender = $6, height = $7, activity_level = $8 WHERE id = $9",
    [
      newUser.name ?? existing.name,
      newUser.email ?? existing.email,
      newUser.password ?? existing.password,
      newUser.age ?? existing.age,
      newUser.weight ?? existing.weight,
      newUser.gender ?? existing.gender,
      newUser.height ?? existing.height,
      newUser.activityLevel ?? existing.activityLevel,
      userId,
    ]
  );
  return rows[0] as User;
};

export const deleteUserAsAdminService = async (userId: number) => {
  await getUserByIdService(userId);
  await pool.query("DELETE FROM users WHERE id = $1", [userId]);
  return userId;
};
