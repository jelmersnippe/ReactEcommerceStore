import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AppModule} from './app/AppModule';
import {NestExpressApplication} from '@nestjs/platform-express';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
    const nestExpressApplication: NestExpressApplication = await NestFactory.create(AppModule, {cors: true});

    nestExpressApplication.useGlobalPipes(new ValidationPipe({
        transform: true
    }));

    nestExpressApplication.setGlobalPrefix('api');

    const config = new DocumentBuilder()
        .setTitle('TestJS')
        .setDescription('')
        .setVersion('0.0.1')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(nestExpressApplication, config);

    SwaggerModule.setup('swagger', nestExpressApplication, document);

    await nestExpressApplication.listen(4040);
}

bootstrap();
