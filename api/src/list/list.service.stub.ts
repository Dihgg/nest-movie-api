import {IListService} from "./list.service.interface";
import {CreateListDto} from "./dto/create-list.dto";
import {ListDto} from "./dto/list.dto";
import {UpdateListDto} from "./dto/update-list.dto";
import {Stub} from "../testing";
import {DeleteListDto} from "./dto/delete-list.dto";

export class ListServiceStub implements IListService {
    create(userId: number, request: CreateListDto): Promise<ListDto> {
        return Promise.resolve(undefined);
    }

    findAll(userId: number): Promise<ListDto[]> {
        return Promise.resolve(Stub.getListDto());
    }

    findOne(userId: number, id: number): Promise<ListDto> {
        return Promise.resolve(Stub.getListDto()[0]);
    }

    remove(userId: number, id: number): Promise<DeleteListDto>  {
        return Promise.resolve(Stub.getDeletedListDto());
    }

    update(userId: number, id: number, updateListDto: UpdateListDto): Promise<ListDto> {
        return Promise.resolve(Stub.getListDto()[0]);
    }

}