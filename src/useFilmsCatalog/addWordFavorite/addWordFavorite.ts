/* eslint-disable class-methods-use-this */
import { getClient } from "../../db/postgres/db";
import { AppException } from "../../errors/AppException";
import { WordRepository } from "../../repositories/implementations/WordRepository";

export class AddWordFavoriteUseCase {
   async execute(id:number): Promise<{ message : string}> {
		const client = await getClient();
		try {
			const wordRepository = new WordRepository(client);
			await wordRepository.addFavorite(id);
			return { message : "Palavra adiciciona ao favoritos" };
		} catch (error:any) {
			const errorMessage = error instanceof AppException ? error.message : "Erro ao adiciona palavra aos favoritos";
			throw new AppException(errorMessage);
		} finally {
			client.release();
		}
  }
}
