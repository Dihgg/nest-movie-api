import {ApiProperty} from "@nestjs/swagger";

export class MoviesListDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    isPublic: boolean;

    @ApiProperty({
        required: false,
        type: 'number',
        isArray: true,
        description: "Ids of users (when creating a private list)"
    })
    usersList?: number[];
}