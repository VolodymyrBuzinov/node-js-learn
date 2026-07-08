import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { userClient } from "@/config/supabase.js";
import { AppError } from "@/services/appError.js";
import { getAdminService } from "../admin/adminServices.js";

export const loginAdminService = async (email: string, password: string) => {
  const { data, error } = await userClient.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new AppError(
      HTTP_STATUS_CODES.UNAUTHORIZED,
      error?.message,
      error?.code
    );
  }

  const profile = await getAdminService(data.user?.id);

  if (profile?.role !== "admin") {
    logoutAdminService();
    throw new AppError(HTTP_STATUS_CODES.UNAUTHORIZED, "User not found");
  }

  return {
    admin: {
      email: profile.email,
      name: profile.name,
      role: profile.role,
    },
    accessToken: data.session?.access_token,
    refreshToken: data.session?.refresh_token,
    expiresIn: data.session?.expires_at,
  };
};

export const logoutAdminService = async () => {
  const { error } = await userClient.auth.signOut();
  if (error) {
    throw new AppError(
      HTTP_STATUS_CODES.UNAUTHORIZED,
      error?.message ?? "Something went wrong",
      error?.code
    );
  }
};

export const refreshTokenAdminService = async (refreshToken: string) => {
  const { data, error } = await userClient.auth.refreshSession({
    refresh_token: refreshToken,
  });
  if (error) {
    throw new AppError(
      HTTP_STATUS_CODES.UNAUTHORIZED,
      error?.message,
      error?.code
    );
  }
  return {
    accessToken: data.session?.access_token,
    refreshToken: data.session?.refresh_token,
    expiresIn: data.session?.expires_at,
  };
};
