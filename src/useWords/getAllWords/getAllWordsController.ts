import { Request, Response } from "express";
import { GetAllWordsUseCase } from "./getAllWords";

export class GetAllWordsController {
  static async execute(request : Request, response: Response): Promise<Response> {
		const { query } = request;
		const { offset , limit }  = query;

		const getFilmsUseCase = new GetAllWordsUseCase();

		const res = await getFilmsUseCase.execute({ offset: Number(offset), limit: Number(limit) });
		return response.status(201).json(res);
  }
}
