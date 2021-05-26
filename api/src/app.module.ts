import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {getConnectionOptions} from "typeorm";
import {AuthModule} from "./auth/auth.module";
import { MoviesModule } from './movies/movies.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async () =>
              Object.assign(await getConnectionOptions(), {
                autoLoadEntities: true,
              }),
        }),
        AuthModule
        AuthModule,
        MoviesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
