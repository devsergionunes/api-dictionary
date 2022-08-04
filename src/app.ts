import express from "express";
import "express-async-errors";
import { routes } from "./routes";
import { AppExceptionHandler } from "./middleware/AppException";

const app = express();

app.use(express.json());
app.use(routes);
app.use(AppExceptionHandler.handle);

export { app };

