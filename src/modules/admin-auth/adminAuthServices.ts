import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { createAuthClient, serviceClient } from "@/config/supabase.js";
import { AppError } from "@/services/appError.js";
import { getAdminService } from "../admin/adminServices.js";

export const loginAdminService = async (email: string, password: string) => {
  const authClient = createAuthClient();
  const { data, error } = await authClient.auth.signInWithPassword({
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
    if (data.session?.access_token) {
      await logoutAdminService(data.session.access_token);
    }
    throw new AppError(HTTP_STATUS_CODES.UNAUTHORIZED, "User not found");
  }

  return {
    user: {
      email: profile.email,
      name: profile.name,
      role: profile.role,
    },
    auth: {
      accessToken: data.session?.access_token,
      refreshToken: data.session?.refresh_token,
      expiresIn: data.session?.expires_at,
    },
  };
};

export const logoutAdminService = async (accessToken: string) => {
  const { error } = await serviceClient.auth.admin.signOut(accessToken);
  if (error) {
    throw new AppError(
      HTTP_STATUS_CODES.UNAUTHORIZED,
      error?.message ?? "Something went wrong",
      error?.code
    );
  }
};

export const refreshTokenAdminService = async (refreshToken: string) => {
  const authClient = createAuthClient();
  const { data, error } = await authClient.auth.refreshSession({
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
