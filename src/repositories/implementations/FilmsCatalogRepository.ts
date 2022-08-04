/* eslint-disable class-methods-use-this */

import { QueryResult } from "pg";
import { getClient } from "../../db/postgres/db";
import { FilmsCatalog } from "../../entities/FilmsCatalog";
import { IFilmsCatalogRepository } from "../IFilmsCatalogRepository";

export class FilmsCatalogRepository implements IFilmsCatalogRepository {
  public async save(films: FilmsCatalog) : Promise<QueryResult<any>> {
    const client = await getClient();
    const response = await client.query(
      `INSERT INTO films_catalog (
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
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING id`,
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
}
