/* eslint-disable class-methods-use-this */
import { getClient } from "../../db/postgres/db";
import { FilmsCatalog } from "../../entities/FilmsCatalog";
import { FilmsCatalogRepository } from "../../repositories/implementations/FilmsCatalogRepository";

export class GetAllFilmsUseCase {
   async execute({ limit, offset }:{ offset?: number; limit?: number}): Promise<{ count: number; films:Array<FilmsCatalog> }> {
		const client = await getClient();
		try {
			const filmsCatalogRepository = new FilmsCatalogRepository(client);

			const { rows: count } = (await filmsCatalogRepository.getCountRows());
			const { rows: response } = (await filmsCatalogRepository.getAll(offset || 0, limit || 50));

			return {
				count: count[0].count,
				films: response,
			};
		} finally {
			client.release();
		}
  }
}
