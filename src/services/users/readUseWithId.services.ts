import format from "pg-format";
import { client } from "../../database";
import { TUserReturn } from "../../interfaces/users.interfaces";
import { QueryResult } from "pg";

export const readUserWithIdServices = async (id: number) => {
  const queryString = format(
    `

    SELECT 
        id,"name" ,email , "admin" , active 
    FROM
        users
    WHERE id = %s;
`,
    id
  );

  const queryResult: QueryResult<TUserReturn> = await client.query(queryString);

  const usersDb: TUserReturn = queryResult.rows[0];

  return usersDb;
};
