import { Router } from "express";
import { AddWordFavoriteController } from "../useFilmsCatalog/addWordFavorite/addWordFavoriteController";
import { GetAllWordsController  } from "../useFilmsCatalog/getAllWords/getAllWordsController";
import { GetWordController } from "../useFilmsCatalog/getWord/getAllWordsController";
import { RemoveWordFavoriteController } from "../useFilmsCatalog/removeWordFavorite/removeWordFavoriteController";

const WordsRoutes = Router({ mergeParams: true });

WordsRoutes.get("/", GetWordController.execute);
WordsRoutes.get("/all", GetAllWordsController.execute);
WordsRoutes.post("/favorite/:id", AddWordFavoriteController.execute);
WordsRoutes.delete("/favorite/:id", RemoveWordFavoriteController.execute);

export { WordsRoutes };

