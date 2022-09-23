import { Router } from "express";
import { AddWordFavoriteController } from "../useWords/addWordFavorite/addWordFavoriteController";
import { GetAllWordsController  } from "../useWords/getAllWords/getAllWordsController";
import { GetAllWordsFavoriteController } from "../useWords/getAllWordsFavorite/getAllWordsFavoriteController";
import { GetWordController } from "../useWords/getWord/getWordController";
import { RemoveWordFavoriteController } from "../useWords/removeWordFavorite/removeWordFavoriteController";

const WordsRoutes = Router({ mergeParams: true });

WordsRoutes.get("/", GetWordController.execute);
WordsRoutes.get("/all", GetAllWordsController.execute);
WordsRoutes.get("/favorite", GetAllWordsFavoriteController.execute);
WordsRoutes.post("/favorite/:id", AddWordFavoriteController.execute);
WordsRoutes.delete("/favorite/:id", RemoveWordFavoriteController.execute);

export { WordsRoutes };

