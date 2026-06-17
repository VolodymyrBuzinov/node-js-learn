import { parse, isValid } from "date-fns";
import z from "zod";
import { DATE_FORMAT } from "@/config/consts.js";

export const mealsPlanValidator = z.object({
  userId: z.number(),
  date: z.string().refine(
    (date) => {
      const parsed = parse(date, DATE_FORMAT, new Date());
      return isValid(parsed);
    },
    {
      message: `Invalid date format. Please use the format ${DATE_FORMAT}`,
    }
  ),
  meals: z
    .array(z.number())
    .min(1, { message: "Meals plan must contain at least one meal" }),
});
