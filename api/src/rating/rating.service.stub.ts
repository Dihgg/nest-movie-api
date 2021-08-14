import {IRatingService} from "./rating.service.interface";
import {CreateRatingDto} from "./dto/create-rating.dto";
import {UpdateRatingDto} from "./dto/update-rating.dto";

export class RatingServiceStub implements IRatingService {
    create(userId: number, request: CreateRatingDto) {
    }

    findAll() {
    }

    findOne(id: number) {
    }

    remove(id: number) {
    }

    update(id: number, updateRatingDto: UpdateRatingDto) {
    }

}