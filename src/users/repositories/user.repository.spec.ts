import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let repo: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    repo = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });
});
