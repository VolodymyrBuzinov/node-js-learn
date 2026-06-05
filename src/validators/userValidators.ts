import z from "zod";
import { ACTIVITY_LEVEL_VALUES, GENDER_VALUES } from "@/types/userTypes.js";

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 20;

export const emailValidation = () =>
  z.email({ error: "Please enter a valid email address." });

export const passwordValidation = () => {
  return z
    .string()
    .min(MIN_PASSWORD_LENGTH, {
      error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
    })
    .max(MAX_PASSWORD_LENGTH, {
      error: `Password must be less than ${MAX_PASSWORD_LENGTH} characters.`,
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()[\]{}<>\\|;:'",.?/~`_+=-]).{8,}$/,
      {
        error: `Incorrect password format.`,
      }
    );
};

export const updateUserValidator = z.object({
  name: z.string().optional(),
  age: z.number().optional(),
  weight: z.number().optional(),
  gender: z.enum(GENDER_VALUES).optional(),
  height: z.number().optional(),
  activityLevel: z.enum(ACTIVITY_LEVEL_VALUES).optional(),
});

export const loginUserValidator = z.object({
  email: emailValidation(),
  password: passwordValidation(),
});

export const validateUserId = z.object({
  userId: z
    .number({ error: "User ID must be a positive number" })
    .positive({ error: "User ID must be a positive number" }),
});
