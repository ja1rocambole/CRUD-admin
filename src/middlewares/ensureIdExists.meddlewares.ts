import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { readUserWithIdServices } from "../services/users/readUseWithId.services";

export const ensureIdExistsMiddleares = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idParams = Number(req.params.id);

  const userReturn = await readUserWithIdServices(idParams);

  if (!userReturn) {
    throw new AppError("User not found", 404);
  }

  next();
};
