import { QueryResult } from "pg";
import { Word } from "../entities/WordEntities";

export interface IWordRepository {
	getAll(offset: number, limit:number): Promise<QueryResult<any>>;
	getAllFavorite(offset: number, limit:number): Promise<QueryResult<any>>;
  addFavorite(id:number): Promise<QueryResult<any>>;
  removeFavorite(id: number): Promise<QueryResult<any>>;
}
