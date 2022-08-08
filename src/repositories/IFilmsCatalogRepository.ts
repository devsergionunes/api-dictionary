import { QueryResult } from "pg";
import { FilmsCatalog } from "../entities/FilmsCatalog";

export interface IFilmsCatalogRepository {
  save(films: FilmsCatalog): Promise<QueryResult<any>>;
	getAll(offset: number, limit:number): Promise<QueryResult<any>>;
}
