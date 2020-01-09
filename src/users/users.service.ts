import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { FindUsersDto } from './dto/find-users.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(public readonly userRepository: UserRepository) {}

  async findUserById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }

  async findAllUsers(params: FindUsersDto): Promise<UserEntity[]> {
    return await this.userRepository.find(params);
  }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(user);

    return this.userRepository.save(newUser);
  }
}
