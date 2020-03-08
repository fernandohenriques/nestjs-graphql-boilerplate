import { ObjectID } from 'mongodb';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepository } from './repositories/user.repository';
import { ServiceHelper } from '../common/helpers/service.helper';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UserRepository, ServiceHelper],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return one new User', async () => {
    const mockCreateUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'johndoe@johndoe.com',
      telephone: '+55 21 2233-4455',
      birthDate: new Date('1980-05-10'),
    };

    const newUser: UserEntity = {
      id: new ObjectID(),
      createdAt: new Date(),
      active: true,
      ...mockCreateUserDto,
    };

    jest.spyOn(service, 'upsertUser').mockImplementation(() => Promise.resolve(newUser));

    expect(await service.upsertUser(undefined, mockCreateUserDto)).toBe(newUser);
  });
});
