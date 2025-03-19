import { Test, TestingModule } from '@nestjs/testing';
import { GroupTutoringSessionController } from './group_tutoring_session.controller';
import { GroupTutoringSessionService } from './group_tutoring_session.service';

describe('GroupTutoringSessionController', () => {
  let controller: GroupTutoringSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupTutoringSessionController],
      providers: [GroupTutoringSessionService],
    }).compile();

    controller = module.get<GroupTutoringSessionController>(
      GroupTutoringSessionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
