import { z } from "zod";
import {
  requestLoginUserSchema,
  requestUserSchema,
  returnUserSchema,
  userSchema,
} from "../schemas/users.schemas";

export type TUser = z.infer<typeof userSchema>;

export type TUserRequest = z.infer<typeof requestUserSchema>;

export type TUserReturn = z.infer<typeof returnUserSchema>;

export type TLoginUserRequest = z.infer<typeof requestLoginUserSchema>;
