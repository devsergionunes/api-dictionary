import axios from "axios";
import { Request, Response } from "express";

export class GetWordController {
  static async execute(request : Request, response: Response): Promise<Response> {
		const { word } = request.query;
		const { data } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
		return response.status(201).json({ word : data });
  }
}

