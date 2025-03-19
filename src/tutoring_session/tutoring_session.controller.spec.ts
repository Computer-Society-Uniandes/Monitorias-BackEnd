import { Test, TestingModule } from '@nestjs/testing';
import { TutoringSessionController } from './tutoring_session.controller';
import { TutoringSessionService } from './tutoring_session.service';

describe('TutoringSessionController', () => {
  let controller: TutoringSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TutoringSessionController],
      providers: [TutoringSessionService],
    }).compile();

    controller = module.get<TutoringSessionController>(
      TutoringSessionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
