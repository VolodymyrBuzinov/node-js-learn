import { getMealByIdService } from "../meals/mealsService.js";
import { Meal } from "../meals/mealsTypes.js";
import { pool } from "@/config/db/pool.js";

export const createMealAsAdminService = async (
  meal: Omit<Meal, "id">
): Promise<Meal> => {
  const { rows: meals } = await pool.query(
    `
    INSERT INTO meals (name, description, image_url, type, composition)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, description, image_url AS "imageUrl", type, composition
    `,
    [meal.name, meal.description, meal.imageUrl, meal.type, meal.composition]
  );
  return meals[0] as Meal;
};

export const updateMealAsAdminService = async (
  mealId: string,
  updatedFields: Partial<Omit<Meal, "id">>
): Promise<Meal> => {
  const existing = await getMealByIdService(mealId);
  const composition = {
    ...JSON.parse(JSON.stringify(existing.composition ?? {})),
    ...(updatedFields.composition ?? {}),
  };
  const { rows: meals } = await pool.query(
    `
    UPDATE meals
    SET name = $1, description = $2, image_url = $3, type = $4, composition = $5
    WHERE id = $6
    RETURNING id, name, description, image_url AS "imageUrl", type, composition
    `,
    [
      updatedFields.name ?? existing.name,
      updatedFields.description ?? existing.description,
      updatedFields.imageUrl ?? existing.imageUrl,
      updatedFields.type ?? existing.type,
      composition,
      mealId,
    ]
  );
  return meals[0] as Meal;
};

export const deleteMealAsAdminService = async (mealId: string) => {
  await getMealByIdService(mealId);
  await pool.query(
    `
    DELETE FROM meals
    WHERE id = $1
    `,
    [mealId]
  );
  return mealId;
};
