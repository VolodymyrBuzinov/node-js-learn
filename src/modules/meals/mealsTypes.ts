export type MealType = "breakfast" | "lunch" | "dinner";

export type MealProduct = {
  name: string;
  count: number;
  unit: string;
};

export type Meal = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  type: MealType;
  composition: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    products: MealProduct[];
  };
};

export const MEAL_TYPE_VALUES = ["breakfast", "lunch", "dinner"] as const;
