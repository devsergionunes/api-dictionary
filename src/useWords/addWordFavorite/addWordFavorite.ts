/* eslint-disable class-methods-use-this */
import { getClient } from "../../db/postgres/db";
import { Word } from "../../entities/WordEntities";
import { AppException } from "../../errors/AppException";
import { WordRepository } from "../../repositories/implementations/WordRepository";

export class AddWordFavoriteUseCase {
   async execute(id:number): Promise<Word> {
		const client = await getClient();
		try {
			const wordRepository = new WordRepository(client);
			const { rows: response} = await wordRepository.toogleFavoriteById(id, true);
			return response[0];
		} catch (error:any) {
			const errorMessage = error instanceof AppException ? error.message : "Erro ao adiciona palavra aos favoritos";
			throw new AppException(errorMessage);
		} finally {
			client.release();
		}
  }
}
