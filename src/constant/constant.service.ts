import { Injectable } from '@nestjs/common';
import { CreateConstantDto } from './dto/create-constant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from '../location/entities/location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConstantService {

  constructor(
    @InjectRepository(Location)
    private readonly locationRepo: Repository<Location>,
  ) { }

  create(createConstantDto: CreateConstantDto) {
    return 'This action adds a new constant';
  }

  /**
   * 取得聯絡表單地點
   */
  async findContactLocation(lang: string = 'zh') {
    const locations = await this.locationRepo.find({
      relations: ['officeType'],
      order: {
        sort: 'ASC',
      },
    });

    // 這裡做簡單的轉換，只回傳對應語言的名稱
    return locations.map((location) => ({
      id: location.id,
      name: location.name[lang] || location.name['en'] || 'N/A',
      officeType: location.officeType?.name[lang] || location.officeType?.name['en'] || 'N/A',
      sort: location.sort,
    }));
  }

  /**
   * 建立聯絡表單地點
   */
  createContactLocation() { }

  /**
   * 更新聯絡表單地點
   */
  updateContactLocation() { }

  /**
   * 刪除聯絡表單地點
   */
  deleteContactLocation() { }
}
