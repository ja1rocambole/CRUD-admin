import { Request, Response } from "express";
import { createUserServices } from "../../services/users/createUser.services";
import { TUserRequest, TUserReturn } from "../../interfaces/users.interfaces";
import { readUsersServices } from "../../services/users/readUsers.services";
import { readUserWithIdServices } from "../../services/users/readUseWithId.services";
import { updateUserWithIdServices } from "../../services/users/updateUserWithId.services";
import { deleteUserWithIdServices } from "../../services/users/deleteUser.services";
import { recoverUserWithIdServices } from "../../services/users/recoverUser.services";

export const createUserController = async (req: Request, res: Response) => {
  const userData: TUserRequest = req.body;

  const newUser: TUserReturn = await createUserServices(userData);

  return res.status(201).json(newUser);
};

export const readUsersController = async (req: Request, res: Response) => {
  const usersDb = await readUsersServices();

  return res.status(200).json(usersDb);
};

export const readUserWithIdTokenController = async (
  req: Request,
  res: Response
) => {
  const idUser = res.locals.id;

  const userReturn = await readUserWithIdServices(idUser);

  return res.status(200).json(userReturn);
};

export const updateUserWithIdControllers = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);
  const userData: TUserRequest = req.body;

  const userUpdated = await updateUserWithIdServices(id, userData);

  return res.status(200).json(userUpdated);
};
export const deleteUserWithIdControllers = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  deleteUserWithIdServices(id);

  return res.status(204).send();
};
export const recoverUserWithIdControllers = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const user: TUserReturn = await recoverUserWithIdServices(id);

  return res.status(200).json(user);
};
