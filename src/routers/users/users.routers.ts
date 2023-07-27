import { Router } from "express";
import {
  createUserController,
  deleteUserWithIdControllers,
  readUserWithIdTokenController,
  readUsersController,
  recoverUserWithIdControllers,
  updateUserWithIdControllers,
} from "../../controllers/users/users.controllers";
import { validatedBodyMiddlewares } from "../../middlewares/validatedBody.middlewares";
import { ensureEmailNotExistsMiddlewares } from "../../middlewares/ensureEmailNotExists.middewares";
import {
  requestUpdateUserSchema,
  requestUserSchema,
} from "../../schemas/users.schemas";
import { validatedTokenMiddlewares } from "../../middlewares/validatedToken.middlewares";
import { ensureUserAdminMiddleares } from "../../middlewares/ensureUserAdmin.middlewares";
import { ensureUserHasPermissionForActionMiddleares } from "../../middlewares/ensureUserHasPermissionForAction.middlewares";
import { ensureIdExistsMiddleares } from "../../middlewares/ensureIdExists.meddlewares";
import { ensureUserActiveFalseMiddlewares } from "../../middlewares/ensureUserActiveFalse.middewares";

export const usersRouters: Router = Router();

usersRouters.post(
  "",
  validatedBodyMiddlewares(requestUserSchema),
  ensureEmailNotExistsMiddlewares,
  createUserController
);

usersRouters.get(
  "",
  validatedTokenMiddlewares,
  ensureUserAdminMiddleares,
  readUsersController
);

usersRouters.get(
  "/profile",
  validatedTokenMiddlewares,
  readUserWithIdTokenController
);

usersRouters.patch(
  "/:id",
  ensureIdExistsMiddleares,
  validatedBodyMiddlewares(requestUpdateUserSchema),
  validatedTokenMiddlewares,
  ensureUserHasPermissionForActionMiddleares,
  ensureEmailNotExistsMiddlewares,
  updateUserWithIdControllers
);
usersRouters.delete(
  "/:id",
  ensureIdExistsMiddleares,
  validatedTokenMiddlewares,
  ensureUserHasPermissionForActionMiddleares,
  deleteUserWithIdControllers
);
usersRouters.put(
  "/:id/recover",
  ensureIdExistsMiddleares,
  validatedTokenMiddlewares,
  ensureUserAdminMiddleares,
  ensureUserActiveFalseMiddlewares,
  recoverUserWithIdControllers
);
