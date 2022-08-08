/* eslint-disable class-methods-use-this */

import { QueryResult } from "pg";
import { IPoolClient } from "../../db/postgres/db";
import { FilmsCatalog } from "../../entities/FilmsCatalog";
import { IFilmsCatalogRepository } from "../IFilmsCatalogRepository";

export class FilmsCatalogRepository implements IFilmsCatalogRepository {
	public readonly connectionDB: IPoolClient;

	constructor(connectionDB: IPoolClient) {
		this.connectionDB = connectionDB;
	}

  public async save(films: FilmsCatalog) : Promise<QueryResult<any>> {
    const response = await this.connectionDB.query(
			`INSERT INTO
				CATALOGO_FILMES (
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
					url,
					ID_INTERNO_FILME
				)
			SELECT
				CAST($1 AS TEXT),
				CAST($2 AS VARCHAR(500)),
				CAST($3 AS VARCHAR(500)),
				CAST($4 AS VARCHAR(500)),
				CAST($5 AS TEXT),
				CAST($6 AS TEXT),
				CAST($7 AS TEXT),
				CAST($8 AS VARCHAR(500)),
				CAST($9 AS VARCHAR(500)),
				CAST($10 AS VARCHAR(20)),
				CAST($11 AS VARCHAR(20)),
				CAST($12 AS VARCHAR(20)),
				CAST($13 AS TEXT),
				CAST($14 AS TEXT),
				CAST($15 AS TEXT),
				CAST($16 AS TEXT),
				CAST($17 AS VARCHAR(500)),
				(nextval('SEQ_CATALOGO_FILMES'))
			WHERE
				NOT EXISTS(
					SELECT
						1
					FROM
						CATALOGO_FILMES
					WHERE
						id = $1
				)`,
      [
        films.id,
        films.title,
        films.original_title,
        films.original_title_romanised,
        films.image,
        films.movie_banner,
        films.description,
        films.director,
        films.producer,
        films.release_date,
        films.running_time,
        films.rt_score,
        films.people,
        films.species,
        films.locations,
        films.vehicles,
        films.url,
      ]
    );
    return response;
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
}
