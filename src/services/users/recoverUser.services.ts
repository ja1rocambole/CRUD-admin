import format from "pg-format";
import { client } from "../../database";
import { TUserReturn } from "../../interfaces/users.interfaces";
import { QueryResult } from "pg";
import { returnUserSchema } from "../../schemas/users.schemas";

export const recoverUserWithIdServices = async (id: number) => {
  const queryString = `
    UPDATE 
      users 
    SET
      active = true
    WHERE 
      id = %s
    RETURNING *;
`;

  const query = format(queryString, id);

  const queryResult: QueryResult<TUserReturn> = await client.query(query);

  const newUser: TUserReturn = returnUserSchema.parse(queryResult.rows[0]);

  return newUser;
};
