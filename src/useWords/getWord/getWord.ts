/* eslint-disable class-methods-use-this */
import axios from "axios";
import { getClient } from "../../db/postgres/db";
import { AppException } from "../../errors/AppException";
import { WordRepository } from "../../repositories/implementations/WordRepository";

export class GetWordUseCase {
   async execute(word: string): Promise<any> {
		const client = await getClient();
		try {
			const wordRepository = new WordRepository(client);
			const { data } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
			const [{ word: wordName, phonetic , phonetics, meanings }] = data;

			const { rows } = await wordRepository.getByWord(wordName);
			const [{ id, ind_favorite }] = rows;

			const wordData = {
				id,
				ind_favorite,
				word: wordName,
				phonetic,
				phonetics,
				meanings,
			};
			return wordData;
		}  catch (error : any) {
			const errorMessage = error.response.data.message || "Sorry pal, we couldn't find definitions for the word you were looking for.";
			throw new AppException(errorMessage);
		} finally {
			client.release();
		}
  }
}
