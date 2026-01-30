import { Test, TestingModule } from '@nestjs/testing';
import { ConactController } from './conact.controller';
import { ConactService } from './conact.service';

describe('ConactController', () => {
  let controller: ConactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConactController],
      providers: [ConactService],
    }).compile();

    controller = module.get<ConactController>(ConactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
