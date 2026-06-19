export type MealType = "сніданок" | "обід" | "вечеря";

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

export const MEAL_TYPE_VALUES = ["сніданок", "обід", "вечеря"] as const;
