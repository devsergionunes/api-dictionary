import { QueryResult } from "pg";
import { Word } from "../entities/WordEntities";

export interface IWordRepository {
	getAll(offset: number, limit:number): Promise<QueryResult<any>>;
	getByWord(word: string): Promise<QueryResult<any>>;
	getAllFavorite(offset: number, limit:number): Promise<QueryResult<any>>;
  toogleFavoriteById(id:number, value:boolean): Promise<QueryResult<any>>;
}
