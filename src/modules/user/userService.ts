import { AppError } from "@/services/appError.js";
import { DATE_FORMAT, HTTP_STATUS_CODES } from "@/config/consts.js";
import { User, UserRow } from "@/modules/user/userTypes.js";
import { pool } from "@/config/db/pool.js";
import { format } from "date-fns";

const mapUser = (row: UserRow) => ({
  activityLevel: row.activity_level,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  name: row.name,
  age: row.age,
  weight: row.weight,
  gender: row.gender,
  height: row.height,
  id: row.id,
  email: row.email,
});

export const getUsersData = async () => {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows.map((row) => mapUser(row)) as User[];
};

export const getUserByIdService = async (userId: number) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);
  if (!rows.length) {
    throw new AppError(HTTP_STATUS_CODES.NOT_FOUND, "User not found");
  }
  return mapUser(rows[0]) as User;
};

export const updateUserService = async (
  userId: number,
  { name, age, weight, gender, height, activityLevel }: Partial<User>
) => {
  const user = await getUserByIdService(userId);
  const updatedUser = {
    ...user,
    ...{ name, age, weight, gender, height, activityLevel },
    updatedAt: format(new Date(), DATE_FORMAT),
  };
  await pool.query(
    "UPDATE users SET name = $1, age = $2, weight = $3, gender = $4, height = $5, activity_level = $6, updated_at = $7 WHERE id = $8",
    [
      updatedUser.name,
      updatedUser.age,
      updatedUser.weight,
      updatedUser.gender,
      updatedUser.height,
      updatedUser.activityLevel,
      format(new Date(), DATE_FORMAT),
      userId,
    ]
  );

  return updatedUser;
};
