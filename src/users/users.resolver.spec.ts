import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserRepository } from './repositories/user.repository';
import { ServiceHelper } from '../common/helpers/service.helper';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersResolver, UserRepository, ServiceHelper],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
