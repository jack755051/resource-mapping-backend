import { Test, TestingModule } from '@nestjs/testing';
import { ConactService } from './conact.service';

describe('ConactService', () => {
  let service: ConactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConactService],
    }).compile();

    service = module.get<ConactService>(ConactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
