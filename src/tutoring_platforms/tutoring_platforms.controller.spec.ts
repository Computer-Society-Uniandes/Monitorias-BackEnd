import { Test, TestingModule } from '@nestjs/testing';
import { TutoringPlatformsController } from './tutoring_platforms.controller';
import { TutoringPlatformsService } from './tutoring_platforms.service';

describe('TutoringPlatformsController', () => {
  let controller: TutoringPlatformsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TutoringPlatformsController],
      providers: [TutoringPlatformsService],
    }).compile();

    controller = module.get<TutoringPlatformsController>(
      TutoringPlatformsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
