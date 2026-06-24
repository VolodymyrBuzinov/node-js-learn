import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { adminClient } from "@/config/supabase.js";
import { AppError } from "@/services/appError.js";

export const loginAdminService = async (email: string, password: string) => {
  const { data, error } = await adminClient.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new AppError(HTTP_STATUS_CODES.UNAUTHORIZED, "Invalid credentials");
  }
  return {
    user: data.user,
    accessToken: data.session?.access_token,
    refreshToken: data.session?.refresh_token,
    expiresIn: data.session?.expires_at,
  };
};

export const logoutAdminService = async () => {
  const { error } = await adminClient.auth.signOut();
  if (error) {
    throw new AppError(HTTP_STATUS_CODES.UNAUTHORIZED, "Invalid credentials");
  }
};
