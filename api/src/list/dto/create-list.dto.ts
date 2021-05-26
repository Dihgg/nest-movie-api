import {ApiProperty} from "@nestjs/swagger";
import { IList } from '../entities/list.interface';

export class CreateListDto implements IList {
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
    users?: number[];
}