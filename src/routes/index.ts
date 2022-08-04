import { Router } from "express";
import { FilmsRoutes } from "./films.routes";

const routes = Router({ mergeParams: true });

routes.use("/api/films/", FilmsRoutes);

export { routes };
