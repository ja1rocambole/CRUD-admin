import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

export const ensureUserHasPermissionForActionMiddleares = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adminToken: boolean = res.locals.admin;
  const idToken: number = Number(res.locals.id);
  const idParams = Number(req.params.id);

  if (!adminToken) {
    if (idToken !== idParams) {
      throw new AppError("Insufficient Permission", 403);
    }
  }

  next();
};
