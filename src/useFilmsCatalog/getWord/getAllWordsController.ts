import axios from "axios";
import { Request, Response } from "express";
import { WordsApieExternalEntities } from "../../../@types/useWords";

export class GetWordController {
  static async execute(request : Request, response: Response): Promise<Response> {

		const wordExternal: WordsApieExternalEntities = await axios("https://ghibliapi.herokuapp.com/films").then(res => res.data);
		return response.status(201).json({ word : wordExternal });
  }
}

