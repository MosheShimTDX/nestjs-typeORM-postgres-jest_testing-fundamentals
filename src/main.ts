import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( // Adding middleware validation
    new ValidationPipe({
      whitelist: true, // Ignores any additional json properties
    }),
  );
  await app.listen(3000);
}
bootstrap();
