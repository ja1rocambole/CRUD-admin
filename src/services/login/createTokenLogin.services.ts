import { sign } from "jsonwebtoken";

export const createTokenLoginServices = (id: number, admin: boolean) => {
  const token: string = sign({ admin: admin }, String(process.env.SECRET_KEY), {
    expiresIn: process.env.EXPIRES_IN,
    subject: String(id),
  });

  return token;
};
