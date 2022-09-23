
import { Request, Response } from "express";
import { GetWordUseCase } from "./getWord";

export class GetWordController {
  static async execute(request : Request, response: Response): Promise<Response> {

			const { word } = request.query;
			const getWord = new GetWordUseCase();
			const wordData = await getWord.execute(String(word));

			return response.status(201).json(wordData);
  }
}

