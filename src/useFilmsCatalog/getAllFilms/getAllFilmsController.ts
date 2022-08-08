import { Request, Response } from "express";
import { GetAllFilmsUseCase } from "./getAllFilms";

export class GetAllFilmsController {
  static async execute(request : Request, response: Response): Promise<Response> {
		const { query } = request;
		const { offset , limit }  = query;

		const getFilmsUseCase = new GetAllFilmsUseCase();

		const res = await getFilmsUseCase.execute({ offset: Number(offset), limit: Number(limit) });
		return response.status(201).json(res);
  }
}
