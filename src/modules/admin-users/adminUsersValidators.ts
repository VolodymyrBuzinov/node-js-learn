import z from "zod";
import { ACTIVITY_LEVEL_VALUES, GENDER_VALUES } from "../user/userTypes.js";

export const updateUserAsAdminValidator = z.object({
  name: z.string().optional(),
  password: z.string().optional(),
  email: z.string().optional(),
  age: z.number().optional(),
  weight: z.number().optional(),
  gender: z.enum(GENDER_VALUES).optional(),
  height: z.number().optional(),
  activityLevel: z.enum(ACTIVITY_LEVEL_VALUES).optional(),
});

export const createUserAsAdminValidator = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});
