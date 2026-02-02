import { Test, TestingModule } from '@nestjs/testing';
import { ContactFormService } from './contact-form.service';

describe('ContactFormService', () => {
  let service: ContactFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactFormService],
    }).compile();

    service = module.get<ContactFormService>(ContactFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
