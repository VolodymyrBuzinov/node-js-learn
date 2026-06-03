import { NextFunction, Request, Response } from "express";
import { CODE_STATUS, ERROR_MESSAGES, GENDERS } from "../consts.js";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
interface ValidationResult {
  status: CODE_STATUS;
  message: (typeof ERROR_MESSAGES)[keyof typeof ERROR_MESSAGES];
}

const validateEmail = (email: string): ValidationResult | undefined => {
  if (!email) {
    return {
      status: CODE_STATUS.BAD_REQUEST,
      message: ERROR_MESSAGES.EMAIL_REQUIRED,
    };
  }
  if (!emailRegex.test(email)) {
    return {
      status: CODE_STATUS.BAD_REQUEST,
      message: ERROR_MESSAGES.EMAIL_INVALID,
    };
  }
};

const validatePassword = (password: string): ValidationResult | undefined => {
  if (!password) {
    return {
      status: CODE_STATUS.BAD_REQUEST,
      message: ERROR_MESSAGES.PASSWORD_REQUIRED,
    };
  }
  if (password.length < 8) {
    return {
      status: CODE_STATUS.BAD_REQUEST,
      message: ERROR_MESSAGES.PASSWORD_MIN_LENGTH,
    };
  }
  if (password.length > 12) {
    return {
      status: CODE_STATUS.BAD_REQUEST,
      message: ERROR_MESSAGES.PASSWORD_MAX_LENGTH,
    };
  }
  if (!passwordRegex.test(password)) {
    return {
      status: CODE_STATUS.BAD_REQUEST,
      message: ERROR_MESSAGES.PASSWORD_INVALID,
    };
  }
};

export const signinValidator = (
  { body: { email, password } }: Request,
  res: Response,
  next: NextFunction
) => {
  const emailValidation = validateEmail(email);
  if (emailValidation) {
    return res
      .status(emailValidation.status)
      .json({ message: emailValidation.message });
  }

  const passwordValidation = validatePassword(password);
  if (passwordValidation) {
    return res
      .status(passwordValidation.status)
      .json({ message: passwordValidation.message });
  }

  next();
};

export const signupValidator = (
  { body: { email, password, name, gender } }: Request,
  res: Response,
  next: NextFunction
) => {
  const emailValidation = validateEmail(email);
  if (emailValidation) {
    return res
      .status(emailValidation.status)
      .json({ message: emailValidation.message });
  }

  const passwordValidation = validatePassword(password);
  if (passwordValidation) {
    return res
      .status(passwordValidation.status)
      .json({ message: passwordValidation.message });
  }

  if (!gender) {
    return res
      .status(CODE_STATUS.BAD_REQUEST)
      .json({ message: ERROR_MESSAGES.GENDER_REQUIRED });
  }

  if (!GENDERS.includes(gender)) {
    return res
      .status(CODE_STATUS.BAD_REQUEST)
      .json({ message: ERROR_MESSAGES.GENDER_NOT_VALID });
  }

  if (!name) {
    return res
      .status(CODE_STATUS.BAD_REQUEST)
      .json({ message: ERROR_MESSAGES.NAME_REQUIRED });
  }

  next();
};

export const logoutValidator = (
  { body: { id } }: Request,
  res: Response,
  next: NextFunction
) => {
  if (id === undefined || id === null) {
    return res
      .status(CODE_STATUS.BAD_REQUEST)
      .json({ message: ERROR_MESSAGES.ID_REQUIRED });
  }
  if (typeof id !== "number" || isNaN(id) || id <= 0) {
    return res
      .status(CODE_STATUS.BAD_REQUEST)
      .json({ message: ERROR_MESSAGES.ID_NOT_VALID });
  }
  next();
};
