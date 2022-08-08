/* eslint-disable class-methods-use-this */
import { getClient } from "../../db/postgres/db";
import { FilmsCatalog } from "../../entities/FilmsCatalog";
import { AppException } from "../../errors/AppException";
import { FilmsCatalogRepository } from "../../repositories/implementations/FilmsCatalogRepository";

export class InsertFilmsUseCase {
   async execute(films:FilmsCatalog[]): Promise<{ message : string}> {
		const client = await getClient();
		try {
			client.query("BEGIN");
			const filmsCatalogRepository = new FilmsCatalogRepository(client);
			for await (const film of films) {
				await filmsCatalogRepository.save(new FilmsCatalog(film));
			}
			client.query("COMMIT");
			return { message : "Erro ao atualizar filmes" };
		} catch (error:any) {
			client.query("ROLLBACK");
			const errorMessage = error instanceof AppException ? error.message : "Erro ao atualizar filmes";
			throw new AppException(errorMessage);
		} finally {
			client.release();
		}
  }
}
