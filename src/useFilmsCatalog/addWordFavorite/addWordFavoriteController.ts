import { Request, Response } from "express";
import { AddWordFavoriteUseCase } from "./addWordFavorite";

export class AddWordFavoriteController {
  static async execute(request : Request, response: Response): Promise<Response> {
		const addWordFavoriteUseCase = new AddWordFavoriteUseCase();

		const { id } = request.params;

		await addWordFavoriteUseCase.execute(Number(id));
		return response.status(201).json({ message : "Palavra adiciciona ao favoritos" });
  }
}
