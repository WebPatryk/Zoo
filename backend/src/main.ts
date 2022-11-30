import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app
    .listen(3001)
    .then(() => {
      console.log('successfully stared on port 3001');
    })
    .catch((error) => {
      console.log(error);
    });
}
bootstrap();
