// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes';
import * as morgan from 'morgan';
import helmet from 'helmet';
<<<<<<< HEAD

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
=======
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express'; //
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
>>>>>>> remotes/origin/ntb/checkout-when-renting
  app.useGlobalPipes(new ValidationPipe());
  app.use(morgan('dev'));
  const config = new DocumentBuilder()
    .setTitle('TinTro')
    .setDescription('The TinTro API description')
    .setVersion('0.1')
    .build();
  app.use(helmet());
  app.enableCors();
<<<<<<< HEAD
=======

  // * Add this line to serve static files
  app.use('/public', express.static(join(__dirname, '..', '..', 'public')));

>>>>>>> remotes/origin/ntb/checkout-when-renting
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const PORT = process.env.PORT || 3001;
  await app.listen(PORT, () =>
    console.log(`Server is listening at port ${PORT}`),
  );
}
bootstrap();
