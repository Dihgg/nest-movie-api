import {HttpModule, Module} from '@nestjs/common';
import {MoviesService} from './movies.service';
import {MoviesController} from './movies.controller';

@Module({
    imports: [
        HttpModule
    ],
    controllers: [MoviesController],
    providers: [MoviesService],
    exports: [HttpModule, MoviesService]
})
export class MoviesModule {
}
