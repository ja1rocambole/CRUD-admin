import { NextFunction, Request, Response } from "express";
import format from "pg-format";
import { client } from "../database";
import { TUser } from "../interfaces/users.interfaces";
import { QueryResult } from "pg";
import { AppError } from "../error";

export const ensureEmailNotExistsMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email: string = req.body.email;

  if (email) {
    const queryString = format(
      `
      SELECT 
          * 
      FROM 
          users
      WHERE
          email = '%s';
        `,
      email
    );

    const queryResult: QueryResult<TUser> = await client.query(queryString);

    if (queryResult.rowCount > 0) {
      throw new AppError("E-mail already registered", 409);
    }
  }

  next();
};
