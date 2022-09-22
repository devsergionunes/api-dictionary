export class Word {
	public id: string;

	public word: string;

	public ind_favorite: string;


  constructor({
    id,
		word,
		ind_favorite,
	}: Word) {
    this.id = id;
		this.word = word;
		this.ind_favorite = ind_favorite;
  }
}
