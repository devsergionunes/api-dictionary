import { Router } from "express";
import { insertFilmsController } from "../useFilmsCatalog/inserFilms";

const FilmsRoutes = Router({ mergeParams: true });

FilmsRoutes.post("/", insertFilmsController.execute);
FilmsRoutes.get("/", insertFilmsController.execute);

export { FilmsRoutes };

