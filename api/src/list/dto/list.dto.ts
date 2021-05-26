import {IList} from "../entities/list.interface";

export class ListDto implements IList {
    id: number;
    isPublic: boolean;
    name: string;
    users?: number[];
}