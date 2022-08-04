/* eslint-disable arrow-body-style */
/* eslint-disable no-return-await */
import { FilmsCatalog } from "../../entities/FilmsCatalog";
import { IFilmsCatalogRepository } from "../../repositories/IFilmsCatalogRepository";

export class InsertFilmsUseCase {
	constructor(
		private filmsCatalogRepository: IFilmsCatalogRepository
	) { }

  public async execute(filmsMock:FilmsCatalog[]): Promise<FilmsCatalog | Array<FilmsCatalog>> {
    // aqui vamos receber a array de filmes como parametro para ser inserida no banco de dados

		const response = filmsMock.map(async (films) => {
			return await this.filmsCatalogRepository.save(
				new FilmsCatalog(films)
			);
		});
		console.log(response);

    return response as any;
  }
}
