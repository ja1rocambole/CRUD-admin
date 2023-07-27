import { NextFunction, Request, Response } from "express";
import format from "pg-format";
import { client } from "../database";
import { QueryResult } from "pg";
import { AppError } from "../error";
import { compare } from "bcryptjs";
import { TLoginUserRequest, TUser } from "../interfaces/users.interfaces";

export const ensureUserElegibleLoginMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqUser: TLoginUserRequest = req.body;

  const queryString = format(
    `
    SELECT 
        * 
    FROM 
        users
    WHERE
        email = '%s';
    `,
    reqUser.email
  );

  const queryResult: QueryResult<TUser> = await client.query(queryString);

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }

  const dbUser = queryResult.rows[0];

  const passwordMatch = await compare(reqUser.password, dbUser.password);

  if (!dbUser.active || !passwordMatch) {
    throw new AppError("Wrong email/password", 401);
  }

  res.locals.user = dbUser;

  next();
};
