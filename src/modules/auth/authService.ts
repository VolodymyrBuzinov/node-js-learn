import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { userClient } from "@/config/supabase.js";
import { getUsersData } from "@/modules/user/userService.js";
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
  return {
    user: data.user,
    accessToken: data.session?.access_token,
    refreshToken: data.session?.refresh_token,
    expiresIn: data.session?.expires_at,
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
