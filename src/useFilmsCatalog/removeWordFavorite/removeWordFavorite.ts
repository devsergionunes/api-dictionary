/* eslint-disable class-methods-use-this */
import { getClient } from "../../db/postgres/db";
import { AppException } from "../../errors/AppException";
import { WordRepository } from "../../repositories/implementations/WordRepository";

export class RemoveWordFavoriteUseCase {
   async execute(id:number): Promise<{ message : string}> {
		const client = await getClient();
		try {
			const wordRepository = new WordRepository(client);
			await wordRepository.removeFavorite(id);
			return { message : "Palavra removida dos favoritos" };
		} catch (error:any) {
			const errorMessage = error instanceof AppException ? error.message : "Erro ao remove palavra dos favoritos";
			throw new AppException(errorMessage);
		} finally {
			client.release();
		}
  }
}
