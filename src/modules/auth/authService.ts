import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { userClient } from "@/config/supabase.js";
import { AppError } from "@/services/appError.js";

export const loginUserService = async (email: string, password: string) => {
  const { data, error } = await userClient.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new AppError(
      error.status ?? HTTP_STATUS_CODES.UNAUTHORIZED,
      error.message ?? "Something went wrong"
    );
  }

  if (data?.user?.role === "admin" && data?.session?.access_token) {
    await userClient.auth.admin.signOut(data.session.access_token);
    throw new AppError(HTTP_STATUS_CODES.UNAUTHORIZED, "User not found");
  }

  return {
    user: {
      id: data.user.id,
      email: data.user.email,
    },
    auth: {
      accessToken: data.session?.access_token,
      refreshToken: data.session?.refresh_token,
      expiresIn: data.session?.expires_at,
    },
  };
};

export const logoutUserService = async () => {
  const { error } = await userClient.auth.signOut();
  if (error) {
    throw new AppError(
      error.status ?? HTTP_STATUS_CODES.UNAUTHORIZED,
      error.message ?? "Something went wrong"
    );
  }
};

export const refreshTokenService = async (refreshToken: string) => {
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
