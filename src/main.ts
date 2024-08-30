import { NestFactory } from '@nestjs/core';
import { InitializationModule } from './initialization.module';
import { SwaggerModule } from '@nestjs/swagger';
import { KeyVaultProvider } from '@libs/config/key-vault.provider';
import { CustomLoggerService } from '@libs/tracer/custom-logger.service';
import { InitializationError } from '@libs/errors/initialization';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';

const swaggerApiContract = '1-api/contrato-de-api.yml';
const swagger = yaml.load(fs.readFileSync(path.join(__dirname, swaggerApiContract), 'utf8'));

async function bootstrap() {
 // await KeyVaultProvider.getSecrets().catch(err => new CustomLoggerService().error(InitializationError.name, err.message, err.stack, null));

  const app = await NestFactory.create(InitializationModule);
  app.enableVersioning({type: VersioningType.URI});

  SwaggerModule.setup('api-doc', app, swagger);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(['error', 'verbose', 'log']);
  await app.listen(3000);
}
bootstrap();
