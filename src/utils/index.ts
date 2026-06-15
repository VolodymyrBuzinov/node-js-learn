import { ActivityLevel, Gender, User } from "@/modules/user/userTypes.js";

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  малий: 1.2,
  середній: 1.55,
  високий: 1.725,
};

const GENDER_BASE: Record<string, (base: number) => number> = {
  чоловік: (base: number) => base + 5,
  жінка: (base: number) => base - 161,
};

const calculateBMR = (
  weight: number,
  height: number,
  age: number,
  gender: Gender
) => {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return GENDER_BASE[gender](base);
};

const calculateTDEE = (bmr: number, activityLevel: ActivityLevel) =>
  Math.round(bmr * ACTIVITY_MULTIPLIERS[activityLevel]);

const calculateProtein = (tdee: number) => Math.round(tdee * 0.25);
const calculateCarbohydrates = (tdee: number) => Math.round(tdee * 0.4);
const calculateFat = (tdee: number) => Math.round(tdee * 0.3);

export const calculateUserNormaValues = (user: User) => {
  const { weight, height, age, gender } = user;
  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = calculateTDEE(bmr, user.activityLevel);
  const protein = calculateProtein(tdee);
  const carbohydrates = calculateCarbohydrates(tdee);
  const fat = calculateFat(tdee);
  return { bmr, tdee, protein, carbohydrates, fat };
};
