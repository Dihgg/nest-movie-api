import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {getConnectionOptions} from "typeorm";
import {AuthModule} from "./auth/auth.module";
import { MoviesModule } from './movies/movies.module';
import { ListModule } from './list/list.module';
import { RatingModule } from './rating/rating.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () =>
                Object.assign(await getConnectionOptions(), {
                    autoLoadEntities: true,
                    host: process.env.DB_HOST || "localhost"
                }),
        }),
        AuthModule,
        MoviesModule,
        ListModule,
        RatingModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
