import format from "pg-format";
import { client } from "../../database";

export const deleteUserWithIdServices = async (id: number) => {
  const queryString = `
    UPDATE 
      users 
    SET
      active = false
    WHERE 
      id = %s
    RETURNING *;
  `;

  const query = format(queryString, id);

  await client.query(query);
};
