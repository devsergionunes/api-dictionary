export class FilmsCatalog {
	public id: string;

	public title: string;

	public original_title: string;

	public original_title_romanised: string;

	public image: string;

	public movie_banner: string;

	public description: string;

	public director: string;

	public producer: string;

	public release_date: string;

	public running_time: string;

	public rt_score: string;

	public people: string[];

	public species: string[];

	public locations: string[];

	public vehicles: string[];

  public url: string;


  constructor({
    id,
    title,
    original_title,
    original_title_romanised,
    image,
    movie_banner,
    description,
    director,
    producer,
    release_date,
    running_time,
    rt_score,
    people,
    species,
    locations,
    vehicles,
    url,
	}: FilmsCatalog) {
    this.id = id;
    this.title = title;
    this.original_title = original_title;
    this.original_title_romanised = original_title_romanised;
    this.image = image;
    this.movie_banner = movie_banner;
    this.description = description;
    this.director = director;
    this.producer = producer;
    this.release_date = release_date;
    this.running_time = running_time;
    this.rt_score = rt_score;
    this.people = people;
    this.species = species;
    this.locations = locations;
    this.vehicles = vehicles;
    this.url = url;
  }
}
