import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { verify } from "jsonwebtoken";
import "dotenv/config";

export const validatedTokenMiddlewares = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization: string | undefined = req.headers.authorization;

  if (!authorization) {
    throw new AppError("Missing Bearer Token", 401);
  }

  const token: string = authorization.split(" ")[1];

  verify(token, String(process.env.SECRET_KEY), (error: any, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    res.locals.admin = decoded.admin;
    res.locals.id = decoded.sub;
  });

  next();
};
