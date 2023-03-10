import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Series calendar')
    .setDescription('Series calendar')
    .setVersion('1.0')
    .build();

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({ credentials: true, origin: process.env.FRONT_URL });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
