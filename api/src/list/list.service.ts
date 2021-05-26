import {Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../users/entities/user.entity";
import {ListEntity} from "./entities/list.entity";
import {Repository} from "typeorm";
import {ListDto} from "./dto/list.dto";
import {ERRORS} from "../errors/errors.enum";
import {IListService} from "./list.service.interface";
import {DeleteListDto} from "./dto/delete-list.dto";

@Injectable()
export class ListService implements IListService {
  constructor(
      @InjectRepository(ListEntity)
      private listRepository: Repository<ListEntity>
  ) { }

  private toDto(list: ListEntity): ListDto {
    return {
      id: list.id,
      name: list.name,
      isPublic: list.isPublic,
      users: list.usersIds
    }
  }

  private getUsers(ids: number[]): UserEntity[] {
    if (!Array.isArray(ids)) {
      return [];
    }
    return ids.map<UserEntity>( id => {
        const user = new UserEntity();
        user.id = id;
        return user;
      });
  }


  async create(userId: number, request: CreateListDto): Promise<ListDto> {
    let users: UserEntity[] = null;
    if (!request.isPublic) {
      if (!Array.isArray(request.users) || !request.users.length) {
        throw new UnprocessableEntityException(ERRORS.PRIVATE_LISTS_CANNOT_BE_NULL);
      } else {
        users = this.getUsers(request.users);
      }
    }

    const repoList = this.listRepository.create({
      user: {
        id: userId
      },
      name: request.name,
      isPublic: request.isPublic,
      users: users
    });
    return this.toDto(await this.listRepository.save(repoList));
  }

  async findAll(userId: number): Promise<ListDto[]> {
    const lists = await this.listRepository.find({
      where: {
        user: {
          id: userId
        }
      }
    }).then( results => results.map<ListDto>( result => this.toDto(result) ) )
    return lists;
  }

  async findOne(userId: number, id: number): Promise<ListDto> {
    const repoList = await this.listRepository.findOne({
      where: {
        id: id,
        user: {
          id: userId
        }
      }
    });
    if (repoList) {
      return this.toDto(repoList);
    } else {
      throw new NotFoundException(ERRORS.LIST_NOT_FOUND);
    }

  }

  async update(userId: number, id: number, request: UpdateListDto): Promise<ListDto> {
    const list = await this.findOne(userId, id);
    const repoList = await this.listRepository.save({
      id: id,
      user: {
        id: id
      },
      users: this.getUsers(request.users || list.users),
      name: request.name || list.name,
      isPublic: request.isPublic || list.isPublic
    });

    return this.toDto(repoList);
  }

  async remove(userId: number, id: number): Promise<DeleteListDto> {
    const list = await this.findOne(userId, id);
    const result = await this.listRepository.delete({
      id: id
    });
    return {
      deleted: !!result.affected
    };
  }
}
