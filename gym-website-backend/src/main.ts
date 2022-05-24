import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: '*',
  });
  const config = new DocumentBuilder()
    .setTitle('GymOne API')
    .setDescription('GymOne API description')
    .setVersion('0.01a')
    .addTag('gym')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const stage = process.env.STAGE;
  console.log(process.env.STAGE);
  console.log(configService.get('DB'));
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
