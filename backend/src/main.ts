// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes';
import * as morgan from 'morgan';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.useGlobalPipes(new ValidationPipe());
  app.use(morgan('dev'));
  const config = new DocumentBuilder()
    .setTitle('TinTro')
    .setDescription('The TinTro API description')
    .setVersion('0.1')
    .build();
  app.use(helmet());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () =>
    console.log(`Server is listening at port ${PORT}`),
  );
}
bootstrap();
