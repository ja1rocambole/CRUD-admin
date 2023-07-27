import { Request, Response } from "express";
import { createTokenLoginServices } from "../../services/login/createTokenLogin.services";
import { TUser } from "../../interfaces/users.interfaces";

export const createLoginControllers = (req: Request, res: Response) => {
  const dbUser: TUser = res.locals.user;

  const token = createTokenLoginServices(dbUser.id, dbUser.admin!);

  return res.status(200).json({ token: token });
};
