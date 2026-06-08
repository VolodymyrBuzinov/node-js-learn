export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: number;
  updatedAt: number;
  age: number;
  weight: number;
  gender: Gender;
  height: number;
  activityLevel: ActivityLevel;
};

export type Gender = (typeof GENDER_VALUES)[number];
export type ActivityLevel = (typeof ACTIVITY_LEVEL_VALUES)[number];

export const GENDER_VALUES = ["чоловік", "жінка"] as const;
export const ACTIVITY_LEVEL_VALUES = ["малий", "середній", "високий"] as const;

export type Meal = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  composition: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    products: string[];
  };
};
