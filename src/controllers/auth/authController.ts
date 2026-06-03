import { CODE_STATUS, SUCCESS_MESSAGES } from "@/consts.js";
import {
  logoutService,
  signinService,
  signupService,
} from "@/services/authService.js";
import { Request, Response } from "express";

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await signinService(email, password);
  res.status(CODE_STATUS.SUCCESS).json({
    user,
    message: SUCCESS_MESSAGES.SIGNIN_SUCCESS,
    status: CODE_STATUS.SUCCESS,
  });
};

export const signup = async (req: Request, res: Response) => {
  const { email, password, name, gender } = req.body;
  const user = await signupService(email, password, name, gender);
  res.status(CODE_STATUS.CREATED).json({
    message: SUCCESS_MESSAGES.SIGNUP_SUCCESS,
    status: CODE_STATUS.CREATED,
    user,
  });
};

export const logout = async (req: Request, res: Response) => {
  const { id } = req.body;
  const result = await logoutService(id);
  res.status(CODE_STATUS.SUCCESS).json({
    message: SUCCESS_MESSAGES.LOGOUT_SUCCESS,
    status: CODE_STATUS.SUCCESS,
    id: result.id,
  });
};
