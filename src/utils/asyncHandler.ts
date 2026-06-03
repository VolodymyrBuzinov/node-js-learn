import type { NextFunction, Request, RequestHandler, Response } from "express";

export type RequestHandlerFn = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<unknown>;

export const asyncHandler = (fn: RequestHandlerFn): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
