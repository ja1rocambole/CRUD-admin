import { NextFunction, Request, Response } from "express";
import format from "pg-format";
import { client } from "../database";
import { TUser } from "../interfaces/users.interfaces";
import { QueryResult } from "pg";
import { AppError } from "../error";

export const ensureUserActiveFalseMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);

  if (id) {
    const queryString = format(
      `
      SELECT 
          * 
      FROM 
          users
      WHERE
          id = '%s';
        `,
      id
    );

    const queryResult: QueryResult<TUser> = await client.query(queryString);
    const userActive = queryResult.rows[0].active;

    if (userActive === true) {
      throw new AppError("User already active", 400);
    }
  }

  next();
};
