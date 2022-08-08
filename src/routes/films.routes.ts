import { Router } from "express";
import { InsertFilmsController } from "../useFilmsCatalog/inserFilms/insertFilmsController";
import { GetAllFilmsController } from "../useFilmsCatalog/getAllFilms/getAllFilmsController";

const FilmsRoutes = Router({ mergeParams: true });

FilmsRoutes.post("/", InsertFilmsController.execute);
FilmsRoutes.get("/", GetAllFilmsController.execute);

export { FilmsRoutes };

