import { Test, TestingModule } from '@nestjs/testing';
import { GroupTutoringSessionService } from './group_tutoring_session.service';

describe('GroupTutoringSessionService', () => {
  let service: GroupTutoringSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupTutoringSessionService],
    }).compile();

    service = module.get<GroupTutoringSessionService>(
      GroupTutoringSessionService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
