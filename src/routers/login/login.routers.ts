import { Router } from "express";
import { createLoginControllers } from "../../controllers/login/login.controllers";
import { ensureUserElegibleLoginMiddlewares } from "../../middlewares/ensureUserEligibleLogin.middewares";
import { validatedBodyMiddlewares } from "../../middlewares/validatedBody.middlewares";
import { requestLoginUserSchema } from "../../schemas/users.schemas";

export const loginRouters: Router = Router();

loginRouters.post(
  "",
  validatedBodyMiddlewares(requestLoginUserSchema),
  ensureUserElegibleLoginMiddlewares,
  createLoginControllers
);
