import { AppError } from "@/services/appError.js";
import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { MealsPlan } from "@/modules/meals-plan/mealsPlanTypes.js";
import { pool } from "@/config/db/pool.js";

export const getMealsPlanByUserIdAndDateService = async (
  userId: number,
  date: string
) => {
  const { rows: plans } = await pool.query(
    `
    SELECT id, user_id AS "userId", date
    FROM meals_plans
    WHERE user_id = $1 AND date = $2
  `,
    [userId, date]
  );

  if (!plans.length) {
    throw new AppError(HTTP_STATUS_CODES.NOT_FOUND, "Meals plan not found");
  }
  const plan = plans[0] as MealsPlan;

  const { rows: meals } = await pool.query(
    `
    SELECT
      m.id,
      m.name,
      m.description,
      m.image_url AS "imageUrl",
      m.type,
      m.composition
    FROM meals_plan_items mpi
    JOIN meals m ON m.id = mpi.meal_id
    WHERE mpi.meals_plan_id = $1
    `,
    [plan.id]
  );

  return {
    id: plan.id,
    userId: plan.userId,
    date: plan.date,
    meals,
  };
};

export const createMealsPlanService = async (mealsPlan: MealsPlan) => {
  const { rows: existingPlans } = await pool.query(
    `
    SELECT id FROM meals_plans
    WHERE user_id = $1 AND date = $2
    `,
    [mealsPlan.userId, mealsPlan.date]
  );

  let planId: number;

  if (existingPlans.length) {
    planId = existingPlans[0].id;
  } else {
    const { rows: newPlans } = await pool.query(
      `
      INSERT INTO meals_plans (user_id, date)
      VALUES ($1, $2)
      RETURNING id
      `,
      [mealsPlan.userId, mealsPlan.date]
    );
    planId = newPlans[0].id;
  }

  for (const meal of mealsPlan.meals) {
    await pool.query(
      `
      INSERT INTO meals_plan_items (meals_plan_id, meal_id)
      VALUES ($1, $2)
      `,
      [planId, meal.id]
    );
  }

  return getMealsPlanByUserIdAndDateService(mealsPlan.userId, mealsPlan.date);
};

export const updateMealsPlanService = async (mealsPlan: MealsPlan) => {
  const {
    id: existingPlanId,
    userId: existingPlanUserId,
    date: existingPlanDate,
  } = await getMealsPlanByUserIdAndDateService(
    mealsPlan.userId,
    mealsPlan.date
  );

  if (existingPlanId !== mealsPlan.id) {
    throw new AppError(HTTP_STATUS_CODES.BAD_REQUEST, "Invalid plan id");
  }

  await pool.query(`DELETE FROM meals_plan_items WHERE meals_plan_id = $1`, [
    existingPlanId,
  ]);

  for (const meal of mealsPlan.meals) {
    await pool.query(
      `INSERT INTO meals_plan_items (meals_plan_id, meal_id) VALUES ($1, $2)`,
      [existingPlanId, meal.id]
    );
  }

  return {
    id: existingPlanId,
    userId: existingPlanUserId,
    date: existingPlanDate,
    meals: mealsPlan.meals,
  };
};

export const resetMealsPlanService = async (id: number) => {
  const { rows } = await pool.query(
    `
    SELECT id, user_id AS "userId", date
    FROM meals_plans
    WHERE id = $1
    `,
    [id]
  );

  if (!rows.length) {
    throw new AppError(HTTP_STATUS_CODES.NOT_FOUND, "Meals plan not found");
  }

  await pool.query(`DELETE FROM meals_plan_items WHERE meals_plan_id = $1`, [
    id,
  ]);

  const plan = rows[0];

  return {
    id: plan.id,
    userId: plan.userId,
    date: plan.date,
    meals: [],
  };
};
