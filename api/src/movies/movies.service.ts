import {HttpService, Injectable} from '@nestjs/common';
import {Observable} from "rxjs";

import { AxiosResponse } from 'axios';
import {TmdbMoviesDetails, TmdbMoviesResponseDto} from "./dto/tmdb.movies.response.dto";
import {map} from "rxjs/operators";
import {IMoviesService} from "./movies.service.interface";

@Injectable()
export class MoviesService implements IMoviesService {

    private readonly API = "https://api.themoviedb.org/3/";

    private readonly DEFAULT_PARAMS = {
        api_key: process.env.TMDB_API_KEY || "ed2cccac862e12414de59f237f53a2df",
        language: "pt-BR",
        page: 1
    }

    constructor(private httpService: HttpService) { }



    async search(query: string): Promise<TmdbMoviesResponseDto> {
        return this.httpService.get(`${this.API}search/movie?api_key=${this.DEFAULT_PARAMS.api_key}&query=${query}&page=1&language=${this.DEFAULT_PARAMS.language}`)
            .pipe(map( res => res.data ))
            .toPromise();
    }

    async details(id: number): Promise<TmdbMoviesDetails> {
        return this.httpService.get(`${this.API}/movie/${id}?api_key=${this.DEFAULT_PARAMS.api_key}&append_to_response=credits&language=${this.DEFAULT_PARAMS.language}`)
            .pipe(map( res => res.data ))
            .toPromise();
    }

}
