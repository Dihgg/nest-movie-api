import {ApiProperty} from "@nestjs/swagger";
import {IsInt, Max, Min} from "class-validator";

export class CreateRatingDto {

    @IsInt()
    @Min(1)
    @Max(5)
    @ApiProperty( {
        minimum: 1,
        maximum: 5
    })
    stars: number;

    @IsInt()
    @Min(5)
    @Max(10)
    @ApiProperty( {
        minimum: 5,
        maximum: 10
    })
    rating: number;

    @ApiProperty({ description: 'The Movie Database Movie Id' })
    tmdb_id: number;

    @ApiProperty()
    comment: string;

    @ApiProperty()
    user: number;
}
