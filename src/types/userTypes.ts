export type User = {
  id: string;
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

export type Gender = "чоловік" | "жінка";
export type ActivityLevel = "малий" | "середній" | "високий";
