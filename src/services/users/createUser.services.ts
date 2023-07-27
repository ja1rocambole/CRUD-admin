import format from "pg-format";
import { client } from "../../database";
import { hash } from "bcryptjs";
import { returnUserSchema } from "../../schemas/users.schemas";
import { QueryResult } from "pg";
import {
  TUser,
  TUserRequest,
  TUserReturn,
} from "../../interfaces/users.interfaces";

export const createUserServices = async (data: TUserRequest) => {
  data.password = await hash(data.password, 10);

  const queryString: string = format(
    `
    INSERT INTO users
      (%I)
    VALUES
      (%L)
    RETURNING *;
      `,
    Object.keys(data),
    Object.values(data)
  );

  const queryReuslt: QueryResult<TUser> = await client.query(queryString);

  const newUser: TUserReturn = returnUserSchema.parse(queryReuslt.rows[0]);

  return newUser;
};
