import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { AppError } from "@/services/appError.js";
import { adminClient } from "@/config/supabase.js";

export const getAdminService = async (userId: string) => {
  const { data, error } = await adminClient
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) {
    throw new AppError(HTTP_STATUS_CODES.BAD_REQUEST, error?.message);
  }
  return data;
};
