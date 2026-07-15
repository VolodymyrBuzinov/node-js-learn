import { prisma } from "@/config/db/prisma.js";
import { getMealByIdService } from "../meals/mealsService.js";
import { Meal } from "../meals/mealsTypes.js";
import { AppError } from "@/services/appError.js";
import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { adminClient } from "@/config/supabase.js";

export const createMealAsAdminService = async (
  meal: Omit<Meal, "id" | "imageUrl">,
  image: File
) => {
  try {
    const { data: storageData, error } = await adminClient.storage
      .from("meals")
      .upload(`${meal.slug}/image`, image);

    if (error) {
      throw new AppError(
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        error.message ?? "Failed to upload image"
      );
    }

    const newMeal = await prisma.meals.create({
      data: {
        ...meal,
        imageUrl: storageData.fullPath,
      },
    });
    return newMeal;
  } catch (error) {
    throw new AppError(
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      (error as Error).message ?? "Failed to create meal"
    );
  }
};

export const updateMealAsAdminService = async (
  mealId: string,
  updatedFields: Partial<Omit<Meal, "id">>
) => {
  const existingMeal = await getMealByIdService(mealId);
  const newMeal = await prisma.meals.update({
    where: {
      id: mealId,
    },
    data: {
      ...updatedFields,
      composition: {
        ...((existingMeal?.composition ?? {}) as Meal["composition"]),
        ...(updatedFields.composition ?? {}),
      },
    },
  });

  return newMeal;
};

export const deleteMealAsAdminService = async (mealId: string) => {
  await getMealByIdService(mealId);
  await prisma.meals.delete({
    where: {
      id: mealId,
    },
  });
};
