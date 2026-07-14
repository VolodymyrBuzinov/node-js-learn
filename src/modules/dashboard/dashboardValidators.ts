import { DATE_FORMAT } from "@/config/consts.js";
import { isValid, parse } from "date-fns";
import z from "zod";

export const dashboardValidator = z.object({
  date: z.string().refine(
    (date) => {
      const parsed = parse(date, DATE_FORMAT, new Date());
      return isValid(parsed);
    },
    {
      message: `Invalid date format. Please use the format ${DATE_FORMAT}`,
    }
  ),
});
