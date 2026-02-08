import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnalyticEvent } from './entities/analytics.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(AnalyticEvent)
    private readonly repo: Repository<AnalyticEvent>,
  ) { }

  async createEvent(data: Partial<AnalyticEvent>) {
    const event = this.repo.create(data);
    return await this.repo.save(event);
  }
}