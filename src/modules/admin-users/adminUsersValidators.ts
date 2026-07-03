import z from "zod";

export const getUsersAsAdminValidator = z.object({
  sortBy: z.enum(["name"]).optional(),
  sortOrder: z.enum(["ASC", "DESC"]).optional(),
  email: z.string().optional(),
});

export const createUserAsAdminValidator = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});
