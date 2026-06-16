import { AppError } from "@/services/appError.js";
import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { Meal } from "@/modules/meals/mealsTypes.js";
import { pool } from "@/config/db/pool.js";

export const getMealsService = async () => {
  const { rows } = await pool.query(`
    SELECT id, name, description, image_url AS "imageUrl", type, composition
    FROM meals
  `);
  return rows as Meal[];
};

export const getMealByIdService = async (id: number) => {
  const { rows } = await pool.query(
    `
    SELECT id, name, description, image_url AS "imageUrl", type, composition
    FROM meals
    WHERE id = $1
  `,
    [id]
  );
  if (!rows.length) {
    throw new AppError(HTTP_STATUS_CODES.NOT_FOUND, "Meal not found");
  }
  return rows[0] as Meal;
};
