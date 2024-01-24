import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import * as swaggerStats from 'swagger-stats';
import { json } from 'express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });

  const appConfig = app.get<ConfigService>(ConfigService)['internalConfig']['config'];
  const { server, swagger, project } = appConfig;
  const port = parseInt(server.port, 10) || 8080;

  app.setGlobalPrefix(`${server.context}`);

  app.use([cookieParser(), helmet(), compression(), json()]);

  app.useGlobalPipes(
    new ValidationPipe({
      validatorPackage: require('@nestjs/class-validator'),
      transformerPackage: require('class-transformer'),
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (swagger.enabled) {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle(`${project.name}`)
      .setVersion(`${project.version}`)
      .setDescription(`Swagger - ${project.description}`)
      .setExternalDoc('Documentation', project.homepage)
      .setContact(project.author.name, project.author.url, project.author.email)
      .addServer(`/${server.context}`)
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      ignoreGlobalPrefix: true,
    });
    app.use(
      swaggerStats.getMiddleware({
        name: project.name,
        version: project.version,
        swaggerSpec: document,
      }),
    );
    SwaggerModule.setup(`${server.context}/${swagger.path}`, app, document, {});
  }
  //pasarlo a true ??
  if (true) {
    //  if (server.corsEnabled) {
    app.enableCors({
      origin: server.origins,
      allowedHeaders: `${server.allowedHeaders}`,
      methods: `${server.allowedMethods}`,
      credentials: server.corsCredentials,
    });
  }

  await app.listen(port, async () => {
    const appServer = `http://localhost:${port}/${server.context}`;
    Logger.log(`📚 Swagger is running on: ${appServer}/${swagger.path}`, `${project.name}`);
    Logger.log(
      `📚 Swagger Stats is running on: http://localhost:${port}/swagger-stats`,
      `${project.name}`,
    );
    Logger.log(`🚀 Application is running on: ${appServer}`, `${project.name}`);
  });
}

(async () => await bootstrap())();
