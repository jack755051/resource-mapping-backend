import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity'; // 確保路徑正確
import { LocationService } from './location.service';
import { LocationController } from './location.controller';

@Module({
  imports: [
    // 💡 關鍵就在這裡！沒有這行，NestJS 就找不到 LocationRepository
    TypeOrmModule.forFeature([Location]),
  ],
  providers: [LocationService],
  controllers: [LocationController],
  // 如果其他模組（如 ConstantModule）需要用到 LocationService，記得 export 它
  exports: [LocationService],
})
export class LocationModule {}
