import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['content-type', 'Authorization'],
    origin: 'http://localhost:3000',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors) => {
        const errors = validationErrors.reduce((acc, error) => {
          acc[error.property] = Object.keys(error.constraints).map(
            (key) => error.constraints[key],
          );
          return acc;
        }, {});

        const errorKeys = Object.keys(errors);
        let message = errors[errorKeys[0]][0];
        if (errorKeys.length > 1) {
          message = `${message} (and ${errorKeys.length - 1} more error)`;
        }
        return new UnprocessableEntityException({ errors: errors, message });
      },
      transform: true,
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.setGlobalPrefix('api');
  await app.listen(8000);
}
bootstrap();
