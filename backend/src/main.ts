// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes';
import * as morgan from 'morgan';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import path, { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  app.useGlobalPipes(new ValidationPipe());
  app.use(morgan('dev'));
  const config = new DocumentBuilder()
    .setTitle('TinTro')
    .setDescription('The TinTro API description')
    .setVersion('0.1')
    .build();
  app.use(helmet());
  app.enableCors();

  app.use('/public', express.static(join(__dirname, '..', '..', 'public')));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const PORT = process.env.PORT || 3001;
  await app.listen(PORT, () =>
    console.log(`Server is listening at port ${PORT}`),
  );
}
bootstrap();
