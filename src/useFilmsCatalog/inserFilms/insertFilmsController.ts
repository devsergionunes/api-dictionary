import axios from "axios";
import { Request, Response } from "express";
import { FilmsApiExternal } from "../../../@types/useFilmsCatalog";
import { InsertFilmsUseCase } from "./insertFilms";

export class InsertFilmsController {
  static async execute(request : Request, response: Response): Promise<Response> {
		const insertFilmsUseCase = new InsertFilmsUseCase();

		const filmsExternal: FilmsApiExternal[] = await axios("https://ghibliapi.herokuapp.com/films").then(res => res.data);

		await insertFilmsUseCase.execute(filmsExternal);
		return response.status(201).json({ message : "Filmes atualizados com sucesso!" });
  }
}
