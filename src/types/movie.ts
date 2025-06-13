export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  name?: string;
  original_name?: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
  genres?: Genre[];
}

export interface MovieResponse {
  results: Movie[];
}
