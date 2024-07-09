import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

const port = process.env.PORT || 3030;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.setGlobalPrefix('/api');

    const config = new DocumentBuilder()
      .setTitle('API')
      .setDescription('개발을 위한 API 문서입니다.')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    await app.listen(port);

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }

    console.log(`Listening on port ${port}`);
  } catch (error) {
    console.error('Error during bootstrap:', error);
  }
}
bootstrap();