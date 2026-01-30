import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nInterceptor } from './shared/I18nInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 設定全域 API 前綴
  app.setGlobalPrefix('api/v1');

  // 註冊全域攔截器
  app.useGlobalInterceptors(new I18nInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
