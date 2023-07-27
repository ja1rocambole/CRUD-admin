import { z } from "zod";

export const userSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1).max(20),
  email: z.string().email(),
  password: z.string().max(120),
  admin: z.boolean().optional(),
  active: z.boolean(),
});

export const requestUserSchema = userSchema.omit({ id: true, active: true });

export const requestUpdateUserSchema = userSchema
  .partial()
  .omit({ id: true, admin: true, active: true });

export const returnUserSchema = userSchema.omit({ password: true });

export const requestLoginUserSchema = userSchema.pick({
  email: true,
  password: true,
});
