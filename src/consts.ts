export const ERROR_MESSAGES = {
  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Email is invalid",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_MIN_LENGTH: "Password must be at least 8 characters long",
  PASSWORD_MAX_LENGTH: "Password must be less than 12 characters long",
  PASSWORD_INVALID:
    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  GENDER_REQUIRED: "Gender is required",
  NAME_REQUIRED: "Name is required",
  ID_REQUIRED: "ID is required",
  GENDER_NOT_VALID: "Gender is not valid",
  ID_NOT_VALID: "ID is not valid",
};

export const SUCCESS_MESSAGES = {
  SIGNIN_SUCCESS: "You are signed in",
  SIGNUP_SUCCESS: "You are signed up",
  LOGOUT_SUCCESS: "You are logged out",
};

export enum CODE_STATUS {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  SUCCESS = 200,
  CREATED = 201,
  NO_CONTENT = 204,
}

export const GENDERS = ["male", "female", "other"] as const;
