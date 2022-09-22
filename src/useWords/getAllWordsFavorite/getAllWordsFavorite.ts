/* eslint-disable class-methods-use-this */
import { getClient } from "../../db/postgres/db";
import { Word } from "../../entities/WordEntities";
import { WordRepository } from "../../repositories/implementations/WordRepository";

export class GetAllWordsFavoriteUseCase {
   async execute({ limit, offset }:{ offset?: number; limit?: number}): Promise<Array<Word>> {
		const client = await getClient();
		try {
			const filmsCatalogRepository = new WordRepository(client);

			const { rows: response } = (await filmsCatalogRepository.getAllFavorite(offset || 0, limit || 50));
			return response;
		} finally {
			client.release();
		}
  }
}
