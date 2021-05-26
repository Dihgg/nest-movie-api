import {ApiProperty} from "@nestjs/swagger";


export class TmdbMovie {

    @ApiProperty()
    "adult": boolean;

    @ApiProperty()
    "backdrop_path": string;

    @ApiProperty({ type: 'number', isArray: true })
    "genre_ids": number[];

    @ApiProperty()
    "id": number;

    @ApiProperty()
    "original_language": string;

    @ApiProperty()
    "original_title": string

    @ApiProperty()
    "overview": string;

    @ApiProperty()
    "popularity": number;

    @ApiProperty()
    "poster_path": string;

    @ApiProperty()
    "release_date": Date;

    @ApiProperty()
    "title": string;

    @ApiProperty()
    "video": boolean;

    @ApiProperty()
    "vote_average": number;

    @ApiProperty()
    "vote_count": number;
}

export class TmdbCollection {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}

export class TmdbGenre {
    id: number;
    name: string;
}


export class TmdbCredits {
    cast: any;
    crew: any;
}

export class TmdbMoviesDetails extends TmdbMovie {
    "belongs_to_collection": TmdbCollection[];
    "budget": number;
    "genres": TmdbGenre[];
    "homepage": string;
    "imdb_id": string;
    "release_date": Date;
    "runtime": number;
    "credits": TmdbCredits

}

export class TmdbMoviesResponseDto {

    @ApiProperty()
    pages: number;

    @ApiProperty({ type: TmdbMovie, isArray: true})
    results: TmdbMovie[];

    @ApiProperty()
    total_pages: number;

    @ApiProperty()
    total_results: number;
}