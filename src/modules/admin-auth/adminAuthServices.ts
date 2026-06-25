import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { adminClient, userClient } from "@/config/supabase.js";
import { AppError } from "@/services/appError.js";

export const loginAdminService = async (email: string, password: string) => {
  const { data, error } = await userClient.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new AppError(HTTP_STATUS_CODES.UNAUTHORIZED, error?.message);
  }
  const { data: profile, error: profileError } = await adminClient
    .from("profiles")
    .select("*")
    .eq("id", data.user?.id)
    .single();
  if (profileError) {
    throw new AppError(HTTP_STATUS_CODES.BAD_REQUEST, profileError?.message);
  }

  return {
    admin: {
      email: profile?.email,
      name: profile?.name,
      role: profile?.role,
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
      error?.message ?? "Something went wrong"
    );
  }
};
