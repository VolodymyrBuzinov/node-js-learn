import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { userClient } from "@/config/supabase.js";
import { AppError } from "@/services/appError.js";
import { pool } from "@/config/db/pool.js";

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

  if (data?.user?.role !== "admin") {
    logoutAdminService();
    throw new AppError(HTTP_STATUS_CODES.UNAUTHORIZED, "User not found");
  }

  const { rows } = await pool.query(
    `SELECT id, email, name, role FROM profiles WHERE id = $1`,
    [data.user?.id]
  );
  const profile = rows[0];
  if (!profile) {
    throw new AppError(HTTP_STATUS_CODES.BAD_REQUEST, "Profile not found");
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
