import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const clientOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
};

export const createAuthClient = () =>
  createClient(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_KEY ?? "",
    clientOptions
  );

export const authVerifierClient = createAuthClient();

export const serviceClient = createClient(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  clientOptions
);
