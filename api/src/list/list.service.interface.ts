import {CreateListDto} from "./dto/create-list.dto";
import {ListDto} from "./dto/list.dto";
import {UpdateListDto} from "./dto/update-list.dto";
import {DeleteListDto} from "./dto/delete-list.dto";

export interface IListService {
    create(userId: number, request: CreateListDto): Promise<ListDto>;
    findAll(userId: number): Promise<ListDto[]>;
    findOne(userId: number, id: number): Promise<ListDto>;
    update(userId: number, id: number, updateListDto: UpdateListDto): Promise<ListDto>;
    remove(userId: number, id: number): Promise<DeleteListDto>;
}