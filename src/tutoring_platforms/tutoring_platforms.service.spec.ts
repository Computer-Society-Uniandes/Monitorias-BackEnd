import { Test, TestingModule } from '@nestjs/testing';
import { TutoringPlatformsService } from './tutoring_platforms.service';

describe('TutoringPlatformsService', () => {
  let service: TutoringPlatformsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutoringPlatformsService],
    }).compile();

    service = module.get<TutoringPlatformsService>(TutoringPlatformsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
