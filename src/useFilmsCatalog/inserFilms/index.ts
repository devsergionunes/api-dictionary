
import { FilmsCatalogRepository } from "../../repositories/implementations/FilmsCatalogRepository";
import { InsertFilmsUseCase } from "./insertFilms";
import { InsertFilmsController } from "./insertFilmsController";

const insertFilmsUseCase = new InsertFilmsUseCase(new FilmsCatalogRepository());
const insertFilmsController = new InsertFilmsController(insertFilmsUseCase);

export { insertFilmsUseCase, insertFilmsController };
