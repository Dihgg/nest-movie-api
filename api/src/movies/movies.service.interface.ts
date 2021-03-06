import {TmdbMoviesDetails, TmdbMoviesResponseDto} from "./dto/tmdb.movies.response.dto";

export interface IMoviesService {
    search(query: string): Promise<TmdbMoviesResponseDto>;
    details(id: number): Promise<TmdbMoviesDetails>;
}