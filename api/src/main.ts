import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('ACC Movies')
      .setDescription('CHALLENGE INC Movies App')
      .setVersion('1.0')
      .addTag('movies')
      .addBasicAuth()
      .addBearerAuth()
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.SERVER_PORT || 3000);
}
bootstrap();
