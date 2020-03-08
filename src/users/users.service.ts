import { ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { FindUsersDto } from './dto/find-users.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUsersEntity } from './entities/list-users.entity';
import { UserRepository } from './repositories/user.repository';
import { ServiceHelper } from '../common/helpers/service.helper';
import { ObjectID } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private readonly serviceHelper: ServiceHelper, private readonly userRepository: UserRepository) {}

  async findUserById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        _id: ObjectId(id),
        active: true,
      },
    });
  }

  async findUsers(params: FindUsersDto): Promise<ListUsersEntity> {
    return await this.serviceHelper.findAllByNameOrIds(params, this.userRepository);
  }

  async upsertUser(id: string | undefined, user: CreateUserDto): Promise<UserEntity> {
    const { email }: { email: string } = user;
    const userExists: UserEntity = await this.userRepository.findOne({
      where: {
        email,
        active: true,
      },
    });

    if (userExists) {
      throw new Error(`E-mail ${email} is already in use.`);
    }

    const newUser: UserEntity = await this.serviceHelper.getUpsertData(id, user, this.userRepository);

    return this.userRepository.save({ ...newUser, active: true });
  }

  async deleteUser(id: string): Promise<boolean> {
    const user: UserEntity = await this.userRepository.findOne(id);
    return Boolean(this.userRepository.save({ ...user, active: false }));
  }
}
