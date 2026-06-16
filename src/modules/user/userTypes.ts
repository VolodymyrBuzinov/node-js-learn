export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string | null;
  age: number;
  weight: number;
  gender: Gender;
  height: number;
  activityLevel: ActivityLevel;
};

export type Gender = (typeof GENDER_VALUES)[number];
export type ActivityLevel = (typeof ACTIVITY_LEVEL_VALUES)[number];

export const GENDER_VALUES = ["чоловік", "жінка", ""] as const;
export const ACTIVITY_LEVEL_VALUES = [
  "малий",
  "середній",
  "високий",
  "",
] as const;

export type UserRow = {
  activity_level: ActivityLevel;
  created_at: string;
  updated_at: string;
  name: string;
  age: number;
  weight: number;
  gender: Gender;
  height: number;
  id: number;
  email: string;
};
