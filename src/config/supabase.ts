import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

export const userClient = createClient(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_KEY ?? "",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export const adminClient = createClient(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_KEY ?? "",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
