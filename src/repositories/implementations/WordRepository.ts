/* eslint-disable class-methods-use-this */

import { QueryResult } from "pg";
import { IPoolClient } from "../../db/postgres/db";
import { Word } from "../../entities/WordEntities";
import { IWordRepository } from "../IWordRepository";

export class WordRepository implements IWordRepository {
	public readonly connectionDB: IPoolClient;

	constructor(connectionDB: IPoolClient) {
		this.connectionDB = connectionDB;
	}

	getAllFavorite(offset: number, limit: number): Promise<QueryResult<any>> {
		throw new Error("Method not implemented.");
	}

	public async getAll(offset: number, limit: number): Promise<QueryResult<any>> {
		const response = await this.connectionDB.query(
			`SELECT
				id,
				title,
				original_title,
				original_title_romanised,
				image,
				movie_banner,
				description,
				director,
				producer,
				release_date,
				running_time,
				rt_score,
				people,
				species,
				locations,
				vehicles,
				url
			FROM
				CATALOGO_FILMES
			ORDER BY
				id
			LIMIT $1 OFFSET $2`,
			[limit, offset]
		);
		return response;
	}

	addFavorite(id:number): Promise<QueryResult<any>> {
		throw new Error("Method not implemented.");
	}

	removeFavorite(id: number): Promise<QueryResult<any>> {
		throw new Error("Method not implemented.");
	}
}
