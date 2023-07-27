import { QueryResult } from "pg";
import { client } from "../../database";
import { TUserReturn } from "../../interfaces/users.interfaces";
import { AppError } from "../../error";

export const readUsersServices = async () => {
  const queryResult: QueryResult<TUserReturn> = await client.query(`

    SELECT 
        "name" ,email , "admin" , active 
    FROM
        users;
`);

  const usersDb: TUserReturn[] = queryResult.rows;

  return usersDb;
};
