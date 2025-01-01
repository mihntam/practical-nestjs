import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { HttpExceptionFilter } from '@/building-blocks/common/filters';
import { LoggerService } from '@/building-blocks/infrastructure';

import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3000;

  app.useLogger(app.get(LoggerService));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  setupSwagger(app);

  await app.listen(port, '0.0.0.0');
  console.info(`server running on ${await app.getUrl()}`);
}
bootstrap();
