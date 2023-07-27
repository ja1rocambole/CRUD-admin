import format from "pg-format";
import { client } from "../../database";
import { returnUserSchema } from "../../schemas/users.schemas";
import { QueryResult } from "pg";
import {
  TUser,
  TUserRequest,
  TUserReturn,
} from "../../interfaces/users.interfaces";

export const updateUserWithIdServices = async (
  id: number,
  data: TUserRequest
) => {
  let queryString = `
    UPDATE 
      users 
    SET
      (%I) = (%L)
    WHERE 
      id = %s
    RETURNING *;
`;

  if (Object.keys(data).length <= 1) {
    queryString = `
      UPDATE 
        users 
      SET
        %I = %L
      WHERE 
        id = %s
      RETURNING *;
`;
  }

  const query = format(queryString, Object.keys(data), Object.values(data), id);

  const queryResult: QueryResult<TUser> = await client.query(query);

  const newUser: TUserReturn = returnUserSchema.parse(queryResult.rows[0]);

  return newUser;
};
