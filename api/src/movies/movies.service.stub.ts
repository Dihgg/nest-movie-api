import {IMoviesService} from "./movies.service.interface";
import {TmdbMoviesDetails, TmdbMoviesResponseDto} from "./dto/tmdb.movies.response.dto";

export class MoviesServiceStub implements IMoviesService {
    details(id: number): Promise<TmdbMoviesDetails> {
        return Promise.resolve(undefined);
    }

    search(query: string): Promise<TmdbMoviesResponseDto> {
        return Promise.resolve(undefined);
    }

}