import "express-async-errors";

import express, { Application, json } from "express";
import { errorHandler } from "./error";
import { usersRouters } from "./routers/users/users.routers";
import { loginRouters } from "./routers/login/login.routers";

const app: Application = express();
app.use(json());

app.use("/users", usersRouters);

app.use("/login", loginRouters);

app.use(errorHandler);
export default app;
