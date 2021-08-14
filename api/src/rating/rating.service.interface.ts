import {CreateRatingDto} from "./dto/create-rating.dto";
import {UpdateRatingDto} from "./dto/update-rating.dto";

export interface IRatingService {
    create(userId: number, request: CreateRatingDto);
    findAll();
    findOne(id: number);
    update(id: number, updateRatingDto: UpdateRatingDto);
    remove(id: number);
}