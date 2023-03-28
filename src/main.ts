import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/v1');
  app.enableCors();

  await app.listen(process.env.APP_PORT_INT, process.env.APP_HOST);
  Logger.log(
    `Server listening on port ${process.env.APP_PORT_EXT}`,
    'Bootstrap',
  );
}
bootstrap();
