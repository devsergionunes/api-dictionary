/* eslint-disable class-methods-use-this */

import { QueryResult } from "pg";
import { IPoolClient } from "../../db/postgres/db";
import { IWordRepository } from "../IWordRepository";

export class WordRepository implements IWordRepository {
	public readonly connectionDB: IPoolClient;

	constructor(connectionDB: IPoolClient) {
		this.connectionDB = connectionDB;
	}

	getByWord(word: string): Promise<QueryResult<any>> {
		const response = this.connectionDB.query(`
			SELECT
				id,
				word,
				ind_favorite
			FROM
				WORD_LIST
			WHERE
				word = $1
		`, [word]);
		return response;
	}

	async getAllFavorite(offset: number, limit: number): Promise<QueryResult<any>> {
		const response = await this.connectionDB.query(
			`SELECT
				id,
				word,
				ind_favorite
			FROM
				WORD_LIST
			WHERE
				ind_favorite = TRUE
			ORDER BY
				id
			LIMIT $1 OFFSET $2`,
			[limit, offset]
		);
		return response;
	}

	public async getAll(offset: number, limit: number): Promise<QueryResult<any>> {
		const response = await this.connectionDB.query(
			`SELECT
				id,
				word,
				ind_favorite
			FROM
				WORD_LIST
			ORDER BY
				id
			LIMIT $1 OFFSET $2`,
			[limit, offset]
		);
		return response;
	}


	insert(word: string): Promise<QueryResult<any>> {
		const response = this.connectionDB.query(`
			INSERT INTO
				WORD_LIST (WORD, IND_FAVORITE, ID)
			VALUES ($1, $2, (nextval('SEQ_WORD_LIST')))`,
			[word, false]);
		return response;
	}

	toogleFavoriteById(id:number, value: boolean): Promise<QueryResult<any>> {
		const response = this.connectionDB.query(`
			UPDATE
				WORD_LIST
			SET
				IND_FAVORITE = $2
			WHERE
				ID = $1
			RETURNING *`,
			[id, value]);
		return response;
	}
}
