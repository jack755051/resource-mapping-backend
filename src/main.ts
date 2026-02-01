import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nInterceptor } from './shared/I18nInterceptor';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('trust proxy', 1);
  // 設定全域 API 前綴
  app.setGlobalPrefix('api/v1');

  app.enableCors({
    origin: true, // 允許任何來源，或者指定 ['https://guangxun.net']
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // 💡 關鍵：註冊全域攔截器
  app.useGlobalInterceptors(
    new I18nInterceptor(),      // 1. 先把多語系物件轉成單一語言字串
    new TransformInterceptor()  // 2. 再把翻譯後的結果包起來
  );

  // 如果你之前有用到 validation，也記得要在這註冊
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
