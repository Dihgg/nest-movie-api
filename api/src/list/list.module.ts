import {Module} from '@nestjs/common';
import {ListService} from './list.service';
import {ListController} from './list.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../users/entities/user.entity";
import {ListEntity} from "./entities/list.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ListEntity
        ])
    ],
    controllers: [ListController],
    providers: [ListService],
    exports: [
        TypeOrmModule,
        ListService
    ]
})
export class ListModule {
}
