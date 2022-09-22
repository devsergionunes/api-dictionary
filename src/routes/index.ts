import { Router } from "express";
import { WordsRoutes } from "./words.routes";

const routes = Router({ mergeParams: true });

routes.use("/api/words/", WordsRoutes);

export { routes };
