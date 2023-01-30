import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppLoggerMiddleware } from './common/middlewares/logger.middleware';

class Application {
  static async bootstrap() {
    const app = await NestFactory.create(AppModule);
    this.setUpApplication(app);
    this.setUpSwagger(app);
    this.applyMiddlewares(app);
    this.applyPipes(app);
    await app.listen(8000);
  }

  static setUpApplication(app: INestApplication) {
    app.setGlobalPrefix('/api');
    app.enableVersioning({
      type: VersioningType.URI,
    });
  }

  static setUpSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Parking Service API')
      .setDescription('')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'access-token',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
  }

  static applyMiddlewares(app: INestApplication) {
    // Register middleware here
  }

  static applyPipes(app: INestApplication) {
    app.useGlobalPipes(new ValidationPipe());
  }
}

async function start() {
  await Application.bootstrap();
}

start();
