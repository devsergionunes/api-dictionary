import { Request, Response } from "express";
import { RemoveWordFavoriteUseCase } from "./removeWordFavorite";

export class RemoveWordFavoriteController {
  static async execute(request : Request, response: Response): Promise<Response> {
		const addWordFavoriteUseCase = new RemoveWordFavoriteUseCase();

		const { id } = request.params;

		await addWordFavoriteUseCase.execute(Number(id));
		return response.status(201).json({ message : "Palavra removida dos favoritos com sucesso!" });
  }
}
