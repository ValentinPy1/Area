import { Test, TestingModule } from '@nestjs/testing';
import { CreatAcTrigService } from './creat-ac-trig.service';

describe('CreatAcTrigService', () => {
  let service: CreatAcTrigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatAcTrigService],
    }).compile();

    service = module.get<CreatAcTrigService>(CreatAcTrigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
