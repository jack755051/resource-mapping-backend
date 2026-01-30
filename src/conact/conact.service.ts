import { Injectable } from '@nestjs/common';
import { CreateConactDto } from './dto/create-conact.dto';
import { UpdateConactDto } from './dto/update-conact.dto';

@Injectable()
export class ConactService {
  create(createConactDto: CreateConactDto) {
    return 'This action adds a new conact';
  }

  findAll() {
    return `This action returns all conact`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conact`;
  }

  update(id: number, updateConactDto: UpdateConactDto) {
    return `This action updates a #${id} conact`;
  }

  remove(id: number) {
    return `This action removes a #${id} conact`;
  }
}
