import { AppError } from "@/services/appError.js";
import { DATE_FORMAT, HTTP_STATUS_CODES } from "@/config/consts.js";
import { User } from "@/modules/user/userTypes.js";
import { pool } from "@/config/db/pool.js";
import { format } from "date-fns";

export const getUsersData = async () => {
  const { rows } = await pool.query(`
    SELECT id, name, email, password, created_at AS "createdAt", updated_at AS "updatedAt", age, weight, gender, height, activity_level AS "activityLevel"
    FROM users
  `);
  return rows as User[];
};

export const getUserByIdService = async (userId: string) => {
  const { rows } = await pool.query(
    `
    SELECT id, name, email, password, created_at AS "createdAt", updated_at AS "updatedAt", age, weight, gender, height, activity_level AS "activityLevel"
    FROM users
    WHERE id = $1
  `,
    [userId]
  );
  if (!rows.length) {
    throw new AppError(HTTP_STATUS_CODES.NOT_FOUND, "User not found");
  }
  return rows[0] as User;
};

export const updateUserService = async (
  userId: string,
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
